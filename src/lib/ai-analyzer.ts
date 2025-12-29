/* =========================
   TYPES
   ========================= */

export interface AnalysisResult {
  category: string
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  suggestion: string
  codeBefore?: string
  codeAfter?: string
  reasoning: string
  line?: number
}

export interface AnalysisResponse {
  results: AnalysisResult[]
  score: number
  scoreBreakdown: {
    readability: number
    security: number
    performance: number
    maintainability: number
  }
}

/* =========================
   SMART MOCK ANALYZER
   (JS / TS / PYTHON)
   ========================= */

function smartMockAnalyze(
  code: string,
  language: string
): AnalysisResponse {
  const results: AnalysisResult[] = []
  const lang = language.toLowerCase()

  /* =========================
     COMMON (ALL LANGUAGES)
     ========================= */

  if (/password/i.test(code) && /==/.test(code)) {
    results.push({
      category: 'security',
      severity: 'high',
      title: 'Password dibandingkan secara tidak aman',
      description: 'Password dibandingkan langsung tanpa hashing.',
      suggestion: 'Gunakan hashing (bcrypt / argon2).',
      codeBefore: 'password == input_password',
      codeAfter: 'bcrypt.compare(input_password, password_hash)',
      reasoning:
        'Perbandingan password plaintext sangat berisiko kebocoran data.',
    })
  }

  /* =========================
     JAVASCRIPT / TYPESCRIPT
     ========================= */

  if (lang === 'javascript' || lang === 'typescript') {
    if (/\bvar\b/.test(code)) {
      results.push({
        category: 'code_smell',
        severity: 'medium',
        title: 'Penggunaan var tidak direkomendasikan',
        description: 'var memiliki function scope dan rawan bug.',
        suggestion: 'Gunakan let atau const.',
        codeBefore: 'var users = []',
        codeAfter: 'const users = []',
        reasoning: 'let/const lebih aman dan modern.',
      })
    }

    if (/for\s*\(.*length/.test(code)) {
      results.push({
        category: 'performance',
        severity: 'medium',
        title: 'Loop manual kurang efisien',
        description: 'Pencarian data menggunakan loop manual.',
        suggestion: 'Gunakan Array.find().',
        codeBefore: 'for(let i=0;i<users.length;i++){}',
        codeAfter: 'users.find(u => u.name === name)',
        reasoning: 'Lebih deklaratif dan readable.',
      })
    }

    if (/==[^=]/.test(code)) {
      results.push({
        category: 'best_practice',
        severity: 'low',
        title: 'Loose comparison digunakan',
        description: 'Operator == dapat menyebabkan type coercion.',
        suggestion: 'Gunakan ===.',
        codeBefore: 'a == b',
        codeAfter: 'a === b',
        reasoning: 'Menghindari bug perbedaan tipe data.',
      })
    }
  }

  /* =========================
     PYTHON
     ========================= */

  if (lang === 'python') {
    if (/^\s*\w+\s*=\s*\[\]/m.test(code)) {
      results.push({
        category: 'best_practice',
        severity: 'low',
        title: 'Variabel global mutable',
        description: 'List global rawan bug.',
        suggestion: 'Gunakan class atau dependency injection.',
        codeBefore: 'users = []',
        codeAfter: 'class UserService:',
        reasoning: 'State global sulit dirawat.',
      })
    }

    if (/for\s+\w+\s+in\s+range\s*\(\s*len/.test(code)) {
      results.push({
        category: 'code_smell',
        severity: 'medium',
        title: 'Loop Python kurang idiomatis',
        description: 'Penggunaan range(len()) kurang readable.',
        suggestion: 'Gunakan for item in iterable.',
        codeBefore: 'for i in range(len(users)):',
        codeAfter: 'for user in users:',
        reasoning: 'Pythonic & lebih bersih.',
      })
    }

    if (
      /total\s*=\s*0/.test(code) &&
      /total\s*=\s*total\s*\+/.test(code)
    ) {
      results.push({
        category: 'performance',
        severity: 'medium',
        title: 'Perhitungan manual dapat dioptimalkan',
        description: 'Loop manual untuk penjumlahan.',
        suggestion: 'Gunakan sum().',
        codeBefore: 'total = total + user["age"]',
        codeAfter: 'sum(u["age"] for u in users)',
        reasoning: 'Lebih cepat dan ringkas.',
      })
    }
  }

  /* =========================
     SCORE LOGIC (GLOBAL)
     ========================= */

  let score = 90

  const highCount = results.filter(r => r.severity === 'high').length
  const mediumCount = results.filter(r => r.severity === 'medium').length
  const lowCount = results.filter(r => r.severity === 'low').length

  score -= highCount * 18
  score -= mediumCount * 8
  score -= lowCount * 3

  switch (lang) {
    case 'typescript':
      score -= 6
      break
    case 'javascript':
      score -= 5
      break
    case 'python':
      score -= 4
      break
  }

  score = Math.max(45, Math.min(95, score))

  const securityScore = Math.max(30, 90 - highCount * 25)
  const performanceScore = Math.max(40, 85 - mediumCount * 15)
  const readabilityScore = Math.max(45, 80 - lowCount * 10)
  const maintainabilityScore = Math.round(
    (readabilityScore + performanceScore) / 2
  )

  return {
    results,
    score,
    scoreBreakdown: {
      readability: readabilityScore,
      security: securityScore,
      performance: performanceScore,
      maintainability: maintainabilityScore,
    },
  }
}

/* =========================
   MAIN ANALYZER
   HF → SMART MOCK
   ========================= */

export async function analyzeCode(
  code: string,
  language: string,
  mode: 'beginner' | 'professional' = 'beginner'
): Promise<AnalysisResponse> {
  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/bigcode/starcoder',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Analisis kode ${language} dan berikan output JSON.`,
          parameters: { max_new_tokens: 256 },
        }),
      }
    )

    if (hfRes.ok) {
      const data = await hfRes.json()
      const text =
        Array.isArray(data) && data[0]?.generated_text
          ? data[0].generated_text
          : ''

      const start = text.indexOf('{')
      const end = text.lastIndexOf('}')
      if (start !== -1 && end !== -1) {
        return JSON.parse(text.substring(start, end + 1))
      }
    }
  } catch {
    // fallback
  }

  return smartMockAnalyze(code, language)
}

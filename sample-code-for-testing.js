// Sample code dengan berbagai masalah untuk testing ReyhanCODE
// Upload file ini atau copy-paste ke dashboard untuk melihat AI analysis

const API_KEY = "sk-1234567890abcdef"; // Hardcoded API key - SECURITY ISSUE!

function processUserData(userData) {
    // Function terlalu panjang - CODE SMELL
    let result = [];

    // Variabel tidak digunakan - CODE SMELL
    let unusedVariable = "test";

    // Magic number - CODE SMELL
    for (let i = 0; i < 100; i++) {
        // Loop tidak efisien - PERFORMANCE ISSUE
        for (let j = 0; j < 100; j++) {
            result.push(i * j);
        }
    }

    // Lack of input validation - SECURITY ISSUE
    let userInput = userData.name;
    document.innerHTML = userInput; // XSS vulnerability - SECURITY ISSUE!

    // SQL Injection risk - SECURITY ISSUE
    let query = "SELECT * FROM users WHERE name = '" + userInput + "'";

    return result;
}

// Duplikasi kode - CODE SMELL
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i];
    }
    return total;
}

function calculateSum(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

// Penamaan tidak konsisten - CODE SMELL
function get_user_data() { } // snake_case
function getUserProfile() { } // camelCase
function FetchUserInfo() { } // PascalCase

// Async/await yang salah - PERFORMANCE ISSUE
async function fetchData() {
    const data1 = await fetch('/api/endpoint1');
    const data2 = await fetch('/api/endpoint2'); // Should be parallel
    const data3 = await fetch('/api/endpoint3'); // Should be parallel

    return [data1, data2, data3];
}

// Best practice violation - tidak ada error handling
function dangerousFunction() {
    JSON.parse('invalid json');
}

// Export
module.exports = { processUserData, calculateTotal };

#!/usr/bin/env node

/**
 * Demo script to test the AI Task Prioritization API
 * Run this script to test the API without the frontend
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

// Sample tasks for testing
const sampleTasks = [
    "Finish the monthly report for the boss",
    "Buy groceries for the week", 
    "Call the plumber about the leaky faucet",
    "Book flight tickets for vacation",
    "Plan the presentation for the Q4 meeting",
    "Schedule dentist appointment",
    "Review and approve team budget",
    "Organize the garage",
    "Research new laptop for work",
    "Call mom for her birthday"
];

async function testHealthEndpoint() {
    try {
        console.log('🏥 Testing health endpoint...');
        const response = await axios.get(`${API_BASE_URL}/api/health`);
        console.log('✅ Health check passed:', response.data);
        return true;
    } catch (error) {
        console.error('❌ Health check failed:', error.message);
        return false;
    }
}

async function testPrioritizationAPI() {
    try {
        console.log('\n🤖 Testing task prioritization API...');
        console.log('📝 Sample tasks:', sampleTasks);
        
        const response = await axios.post(`${API_BASE_URL}/api/prioritize`, {
            tasks: sampleTasks
        });
        
        console.log('\n✅ Prioritization successful!');
        console.log('📊 Results:');
        
        // Group results by priority
        const results = response.data.tasks;
        const grouped = {
            'High': [],
            'Medium': [],
            'Low': []
        };
        
        results.forEach(task => {
            if (grouped[task.priority]) {
                grouped[task.priority].push(task);
            }
        });
        
        // Display results by priority
        Object.keys(grouped).forEach(priority => {
            if (grouped[priority].length > 0) {
                console.log(`\n🔴 ${priority} Priority (${grouped[priority].length} tasks):`);
                grouped[priority].forEach(task => {
                    console.log(`   • ${task.task} [${task.category}]`);
                });
            }
        });
        
        return true;
    } catch (error) {
        console.error('❌ Prioritization failed:', error.response?.data || error.message);
        return false;
    }
}

async function runDemo() {
    console.log('🚀 AI-Powered Task Prioritization Demo');
    console.log('=====================================\n');
    
    // Test health endpoint
    const healthOk = await testHealthEndpoint();
    if (!healthOk) {
        console.log('\n❌ Server is not running. Please start the server first:');
        console.log('   npm start');
        process.exit(1);
    }
    
    // Test prioritization
    const prioritizationOk = await testPrioritizationAPI();
    
    if (prioritizationOk) {
        console.log('\n🎉 Demo completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Open http://localhost:3000 in your browser');
        console.log('2. Add your own tasks');
        console.log('3. Click "Prioritize Tasks" to see AI in action');
    } else {
        console.log('\n❌ Demo failed. Please check:');
        console.log('1. Server is running (npm start)');
        console.log('2. API key is configured in .env file');
        console.log('3. Internet connection is working');
    }
}

// Run the demo
if (require.main === module) {
    runDemo().catch(console.error);
}

module.exports = { testHealthEndpoint, testPrioritizationAPI };


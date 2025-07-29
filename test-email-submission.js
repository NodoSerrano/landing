// Test email submission
// Run this while the dev server is running: node test-email-submission.js

async function testEmailSubmission() {
  const testEmail = `test-${Date.now()}@example.com`;
  
  console.log('🧪 Testing email submission...');
  console.log(`📧 Test email: ${testEmail}`);
  
  try {
    const response = await fetch('http://localhost:3000/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Email submitted successfully!');
      console.log('Response:', data);
    } else {
      console.log('❌ Email submission failed');
      console.log('Error:', data);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    console.log('\n⚠️  Make sure the development server is running: pnpm dev');
  }
}

testEmailSubmission();
// Test script to verify database connection
// Run with: node database/test-connection.js

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing Neon database connection...\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    console.log('\nPlease create a .env.local file with:');
    console.log('DATABASE_URL=postgresql://username:password@host/database?sslmode=require');
    process.exit(1);
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic connection
    console.log('📡 Testing connection...');
    const result = await sql`SELECT version()`;
    console.log('✅ Connected successfully!');
    console.log('📊 PostgreSQL version:', result[0].version);
    
    // Check if subscribers table exists
    console.log('\n🔍 Checking for subscribers table...');
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'subscribers'
      );
    `;
    
    if (tableCheck[0].exists) {
      console.log('✅ Subscribers table exists');
      
      // Get subscriber count
      const countResult = await sql`SELECT COUNT(*) as count FROM subscribers`;
      console.log(`📊 Current subscriber count: ${countResult[0].count}`);
      
      // Get recent subscribers
      const recentSubs = await sql`
        SELECT email, created_at 
        FROM subscribers 
        ORDER BY created_at DESC 
        LIMIT 5
      `;
      
      if (recentSubs.length > 0) {
        console.log('\n📧 Recent subscribers:');
        recentSubs.forEach(sub => {
          console.log(`  - ${sub.email} (${new Date(sub.created_at).toLocaleString()})`);
        });
      }
    } else {
      console.log('⚠️  Subscribers table does not exist');
      console.log('📝 Run the schema.sql file in your Neon console to create it');
    }
    
    console.log('\n✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Check your DATABASE_URL format');
    console.log('2. Ensure your Neon database is active');
    console.log('3. Verify your connection string includes ?sslmode=require');
    console.log('4. Check if your IP is allowed in Neon settings');
    process.exit(1);
  }
}

// Run the test
testConnection();
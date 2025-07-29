#!/bin/bash

# Database setup script for Nodo Serrano
# This script helps set up the Neon database with the required schema

echo "🚀 Nodo Serrano Database Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local file not found!"
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "📝 Please edit .env.local and add your DATABASE_URL"
    echo "   Your Neon connection string should look like:"
    echo "   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
    echo ""
    exit 1
fi

# Source the environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set in .env.local"
    echo "Please add your Neon connection string to .env.local"
    exit 1
fi

echo "✅ Found DATABASE_URL in .env.local"
echo ""

# Ask user to confirm
echo "This script will:"
echo "1. Create the subscribers table"
echo "2. Add indexes for performance"
echo "3. Set up automatic timestamp triggers"
echo "4. Create a view for recent subscribers"
echo ""
read -p "Do you want to continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled"
    exit 0
fi

echo ""
echo "🔧 Running database schema..."

# Use psql to run the schema
if command -v psql &> /dev/null; then
    psql "$DATABASE_URL" -f database/schema.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Database schema created successfully!"
        echo ""
        echo "🧪 Testing connection..."
        node database/test-connection.js
    else
        echo ""
        echo "❌ Failed to create database schema"
        echo "Please check your connection string and try again"
        exit 1
    fi
else
    echo "⚠️  psql command not found"
    echo ""
    echo "Please install PostgreSQL client:"
    echo "  macOS:  brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql-client"
    echo ""
    echo "Or manually run the SQL in database/schema.sql using Neon's SQL Editor"
    exit 1
fi
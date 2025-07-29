# Database Setup Guide for Nodo Serrano

## Setting up Neon Database

### Step 1: Get Your Database Connection String

1. Log in to your Neon account at [console.neon.tech](https://console.neon.tech)
2. Navigate to your project (or create a new one)
3. Go to the "Connection Details" section
4. Copy your connection string (it should look like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Set Up Local Environment

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your connection string:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 3: Create the Database Schema

#### Option A: Using Neon SQL Editor (Recommended)

1. In your Neon console, go to the "SQL Editor" tab
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL in the Neon SQL Editor
4. You should see success messages for each command

#### Option B: Using psql Command Line

```bash
# Install psql if you haven't already
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql-client

# Run the schema file
psql "postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require" -f database/schema.sql
```

### Step 4: Test the Connection

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the connection test:
   ```bash
   node database/test-connection.js
   ```

3. You should see:
   ```
   ✅ Connected successfully!
   ✅ Subscribers table exists
   ```

### Step 5: Set Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the `DATABASE_URL` variable with your Neon connection string
4. Make sure it's available for all environments (Production, Preview, Development)

## Database Schema Details

The `subscribers` table includes:
- `id`: Auto-incrementing primary key
- `email`: Unique email address (required)
- `created_at`: Timestamp when the subscriber was added
- `updated_at`: Timestamp of last update (auto-updated)

Additional features:
- Indexes for performance on email lookups and date sorting
- Automatic timestamp updates via trigger
- A view for recent subscribers (last 30 days)

## Troubleshooting

### Connection Issues

1. **SSL Error**: Make sure your connection string includes `?sslmode=require`
2. **Authentication Failed**: Double-check your password in the connection string
3. **Connection Timeout**: Ensure your Neon database is active (it may suspend after inactivity)

### Common Commands

```sql
-- View all subscribers
SELECT * FROM subscribers ORDER BY created_at DESC;

-- Count total subscribers
SELECT COUNT(*) FROM subscribers;

-- Find a specific subscriber
SELECT * FROM subscribers WHERE email = 'user@example.com';

-- Delete a subscriber (if needed)
DELETE FROM subscribers WHERE email = 'user@example.com';

-- View recent subscribers (using the view)
SELECT * FROM recent_subscribers;
```

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables in production (Vercel, etc.)
- The connection string contains sensitive credentials
- Consider using Neon's connection pooling for production

## Admin API Endpoints

The project includes admin endpoints to manage subscribers:

### View Subscribers
```bash
# Get all subscribers (requires ADMIN_API_KEY if set)
curl -H "x-api-key: your-admin-key" https://your-domain.com/api/admin/subscribers

# With pagination
curl -H "x-api-key: your-admin-key" https://your-domain.com/api/admin/subscribers?limit=10&offset=0

# Search by email
curl -H "x-api-key: your-admin-key" https://your-domain.com/api/admin/subscribers?search=example
```

### Export Subscribers as CSV
```bash
curl -X POST -H "x-api-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"format": "csv"}' \
  https://your-domain.com/api/admin/subscribers > subscribers.csv
```

To enable API protection, set `ADMIN_API_KEY` in your environment variables.

## Next Steps

After setting up the database:
1. Test the email collection form locally with `pnpm dev`
2. Deploy to Vercel with the DATABASE_URL environment variable
3. Monitor subscribers through:
   - Neon's SQL dashboard
   - Admin API endpoints
   - Direct SQL queries
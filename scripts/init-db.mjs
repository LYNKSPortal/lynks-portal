import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Execute each table creation directly
    console.log('Creating newsletter_subscribers table...');
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `;
    
    console.log('Creating contact_submissions table...');
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        message TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'new'
      )
    `;
    
    console.log('Creating quote_requests table...');
    await sql`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service_type VARCHAR(100),
        budget_range VARCHAR(100),
        project_description TEXT,
        timeline VARCHAR(100),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'new'
      )
    `;
    
    console.log('Creating portfolio_projects table...');
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        image_url TEXT,
        tags TEXT[],
        client VARCHAR(255),
        project_date VARCHAR(50),
        duration VARCHAR(100),
        overview TEXT,
        challenge TEXT,
        solution TEXT,
        results TEXT,
        features TEXT[],
        gallery_urls TEXT[],
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quote_email ON quote_requests(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_published ON portfolio_projects(is_published)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category)`;
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Created tables:');
    console.log('   - newsletter_subscribers');
    console.log('   - contact_submissions');
    console.log('   - quote_requests');
    console.log('   - portfolio_projects');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function createMeetingRequestsTable() {
  try {
    console.log('Creating meeting_requests table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS meeting_requests (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        platform VARCHAR(50),
        timezone VARCHAR(50),
        preferred_date DATE NOT NULL,
        preferred_time TIME NOT NULL,
        message TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating indexes...');
    
    await sql`CREATE INDEX IF NOT EXISTS idx_meeting_requests_status ON meeting_requests(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_meeting_requests_created_at ON meeting_requests(created_at)`;
    
    console.log('✅ Table and indexes created successfully!');
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }
}

createMeetingRequestsTable();

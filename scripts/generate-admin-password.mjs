import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generatePassword() {
  console.log('🔐 Admin Password Generator\n');
  
  const username = await question('Enter admin username: ');
  const password = await question('Enter admin password: ');
  
  console.log('\n⏳ Generating password hash...\n');
  
  const hash = await bcrypt.hash(password, 10);
  
  console.log('✅ Password hash generated!\n');
  console.log('Add these to your .env.local file:\n');
  console.log(`ADMIN_USERNAME=${username}`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`NEXTAUTH_SECRET=${generateRandomString(32)}`);
  console.log(`NEXTAUTH_URL=http://localhost:3000`);
  console.log('\n');
  
  rl.close();
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

generatePassword();

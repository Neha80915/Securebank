const User = require('../models/User');

async function main() {
  try {
    const user = await User.create('Test User', '1234567890123456', '1234', 1000);
    console.log('Created user:', user);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}

main();
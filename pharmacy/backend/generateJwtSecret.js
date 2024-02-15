const crypto = require('crypto');

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Print the generated JWT secret
console.log(generateJwtSecret());

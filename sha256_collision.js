const crypto = require('crypto');

const originalStr = 'Hello';

function sha256(inputStr) {
  return crypto.createHash('sha256').update(inputStr).digest('hex');
}

const originalHash = sha256(originalStr);
console.log(originalHash);

function findSHA256Collision(hash, selectionStr) {
  let attempts = 0;
  let collisionFound = false;

  while (!collisionFound) {
    let newStr = selectionStr + attempts;
    let newHash = sha256(newStr);

    if (hash === newHash) {
      console.log(`Original SHA-256 hash: ${hash}`);
      console.log(`Suitable SHA-256 hash: ${newHash}`);
      break;
    }

    if (attempts % 1000000 === 0) {
      console.log(`We passed ${attempts} attempts!`);
    }
    attempts++;
  }
}

findSHA256Collision(originalHash, originalStr);

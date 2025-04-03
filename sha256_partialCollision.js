// build a partial collision for the first n characters of the original string hash
// 1 pass the string through the hashing function
// 2 assign the resulting hash to originalHash
// 3 create a function that cuts out a certain prefix of a certain length from the beginning of the original hash
// 4 create a function that starts an infinite loop to search for the desired prefix
// 5 put the necessary part of the hash and the length that needs to be forged in matсhedPrefix
// 6 put another text in hackText to select values
// startTime, endTime - to calculate the time to select the value

const crypto = require('crypto');

const originalMessage = 'Hello blockchain';

// ( 1 ) create hash sha256 and turn into hex
function sha256(inputData) {
  return crypto.createHash('sha256').update(inputData).digest('hex');
}

// show hash of string
const originalHash = sha256(originalMessage);
console.log(originalHash);

function getPrefix(hashStr, prefixLength = 16) {
  return hashStr.split('').slice(0, prefixLength).join('');
}

// ( 2 )create func with infinite loop. When we find particular value of prefix - loop stops
function findPartialCollision(strForHashing, prefix) {
  let attempts = 0;

  const startTime = Date.now();

  while (true) {
    let randomStr = attempts + strForHashing;
    let hash = sha256(randomStr);

    if (hash.startsWith(prefix)) {
      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000;

      console.log(`Found partial collision!!!`);
      console.log(`Required Prefix: ${prefix}`);
      console.log(`Original SHA-256 hash: ${originalHash}`);
      console.log(`Suitable SHA-256 hash: "${hash}"`);
      console.log(`Suitable string: "${randomStr}"`);
      console.log(`Number of attempts: ${attempts}`);
      console.log(`Search time: ${elapsedTime} sec`);
      break;
    }

    attempts++;
  }
}

const matсhedPrefix = getPrefix(originalHash, 6);
const hackText =
  'string for selecting prefix. The content can be whatever you want.';

findPartialCollision(hackText, matсhedPrefix);

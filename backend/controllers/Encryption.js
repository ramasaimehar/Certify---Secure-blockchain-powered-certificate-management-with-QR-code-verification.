const CryptoJS = require("crypto-js");

const secretKey = "your-secret-key"; // You should replace this with a strong key in a real application

// Function to encrypt the text using AES-256
function encrypt(text) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

// Function to decrypt the text
function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

const textToEncrypt = "Your text here";

const encryptedText = encrypt(textToEncrypt);
console.log("Encrypted:", encryptedText);

const decryptedText = decrypt(encryptedText);
console.log("Decrypted:", decryptedText);


module.exports = { encrypt, decrypt };

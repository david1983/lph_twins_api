const crypto = require('crypto');
var config = require("config");
const cipher = crypto.createCipher('aes192', config.app.cipher_secret);
const decipher = crypto.createDecipher('aes192', config.app.cipher_secret);
module.exports = {
    cipher: function(txt){
        var encrypted = cipher.update(txt, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    decipher: function(encrypted){        
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
var crypt = require('crypto');
console.log('\n')

console.log(" ██████╗  ██████╗  ██████╗██████╗ ██╗   ██╗██████╗ ")
console.log("██╔════╝ ██╔═══██╗██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗")
console.log("██║  ███╗██║   ██║██║     ██████╔╝ ╚████╔╝ ██████╔╝")
console.log("██║   ██║██║   ██║██║     ██╔══██╗  ╚██╔╝  ██╔═══╝ ")
console.log("╚██████╔╝╚██████╔╝╚██████╗██║  ██║   ██║   ██║      ")
console.log(" ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ")

console.log('\n')
console.log("Bienvenido a GoCrypt una herramienta que permite cifrar sus contraseñas")
console.log('')
console.log('------------------------- Encrypt -------------------------------------')
console.log('')
console.log('')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('A continuación ingrese su contraseña:\n> ', pass => {
  this.yourPass = pass
  var key = crypt.createCipher('aes-128-cbc', 'password_key');
  var encrypted_str = key.update(this.yourPass, 'utf8', 'hex')
  encrypted_str += key.final('hex');
  console.log('------------------------------------------')
  console.log('| Hash ' + '| ' + encrypted_str + ' |');
  console.log('------------------------------------------') 
  readline.close();
});

/*
console.log('------------------------- Decrypt ------------------------------')
console.log('\n')

var key = crypt.createDecipher('aes-128-cbc', 'password_key');
var decrypted_str = key.update(encrypted_str, 'hex', 'utf8')
decrypted_str += key.final('utf8');
console.log(decrypted_str);
console.log('\n')
*/
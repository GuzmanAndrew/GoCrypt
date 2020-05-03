const crypt = require('crypto');
const fs = require("fs");
const util = require("util");

const readLine = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
const question = function(q) {
    return new Promise((resolve) => {
        readLine.question(q, answer => {
            resolve(answer);
        });
    });
};

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const decipher = crypt.createDecipher('aes-128-cbc', 'password_key');

const textIntro = `
██████╗  ██████╗  ██████╗██████╗ ██╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗
██║  ███╗██║   ██║██║     ██████╔╝ ╚████╔╝ ██████╔╝
██║   ██║██║   ██║██║     ██╔══██╗  ╚██╔╝  ██╔═══╝ 
╚██████╔╝╚██████╔╝╚██████╗██║  ██║   ██║   ██║      
╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝   

Bienvenido a GoCrypt, una herramienta que permite cifrar y descifrar sus archivos.`;
const textMainMenu = `Por favor seleccione una opción:

1. Encriptar un archivo con el método AES-128
2. Desencriptar un archivo previamente codificado con el método AES-128
3. Salir

`;
const textCipherInputFileName = `¿Cúal es el nombre del archivo que desea encriptar?:`;
const textCipherPassword = `Escriba la contraseña que desea usar para encriptar el archivo:`;
const textCipherOutputFileName = `¿Cúal es el nombre con el que desea guardar el archivo encriptado?:`; 

function intro() {
	console.log(textIntro);
};
function outro(message) {
	console.log(message)
	readLine.close();
}

async function mainMenu() {
	let userSelection = await question(textMainMenu);
	switch(userSelection){
		case '1':
			cipherFile();
			break;
		case '2':
			console.log('\n¡Esta opción aun no ha sido programada!\n');
			mainMenu();
			break;
		case '3':
			outro('\nCerrando el programa...');
			break;
		default:
			console.log('\nLa opción selecionada es inválida.\n')
			mainMenu();
	};
};

async function cipherFile() {
	const inputFileName = await question(textCipherInputFileName);
	const password = await question(textCipherPassword);
	const outputFileName = await question(textCipherOutputFileName);

	readFile(inputFileName).then(fileData => {
		const stringData = fileData.toString();
		const cipher = crypt.createCipher('aes-128-cbc', password);
		return cipher.update(stringData, 'utf8', 'hex');
	}).then(async encryptedData => {
		await writeFile(outputFileName, encryptedData);
		console.log('\nEl archivo encriptado fue guardado exitosamente.\n');
	}).catch((errorMsg) => {
		console.log(`\nSe presentó un error al realizar el proceso: ${errorMsg}\n`);
	}).finally(()=>{
		mainMenu();
	});
}

intro();
mainMenu();

/*
console.log('------------------------- Decrypt ------------------------------')
console.log('\n')

var key = crypt.createDecipher('aes-128-cbc', 'password_key');
var decrypted_str = key.update(encrypted_str, 'hex', 'utf8')
decrypted_str += key.final('utf8');
console.log(decrypted_str);
console.log('\n')
*/
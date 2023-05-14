const formulario = document.getElementById('formulario1');
const mensaje = document.querySelector('p');

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
	validar();
});

const validar = function () {
		const nombre=formulario.querySelector('#no_cuenta').value;
		const contra=formulario.querySelector('#contra').value;
	 	const usuario= validarCampos(nombre,contra);
	 	if (usuario===undefined) {
	 		console.log('Los datos no fueron correctos');
	 		//no se puede hacer una consulta a la base de datos
	 	}else {
	 		mensaje.innerHTML=`Tus datos se estan verificando...`;
	 		//se puede hacer una consulta a la base de datos
	 	}
}
const validarCampos = (numero,pass)=>{
	try {
		console.log("Inicio de validaciones");

		let validado = numeroValido(numero);
		let espacio = espaciosVacios(pass);
		let cadena =  tamañoString(espacio);
		console.log('Los datos estan listos para enviarse a la base de datos ');
		const usuario ={
			no_cuenta: validado,
			password: cadena,
		}
		return usuario;

	} catch(err) {
		console.error(err.message);
		mensaje.innerHTML='Verifica el numero de cuenta o la contraseña';
	}
}
function numeroValido(numero) {
	let nuevo = parseInt(numero, 10);
	if(Number.isNaN(nuevo)){
		throw new Error ('Error, el dato ingresado no es un numero ');
	}else {
		return numero;
	}
	
}
function tamañoString(pass) {
	let n = pass.length;
	if (n >8 || n <1) {
		throw new Error('Error, numero de caracteres no valido');
	}else if(n === 8){
		return pass;
	}else {
		throw new Error('Error, numero de caracteres no valido');
	}
}
function espaciosVacios(pass) {
	let array =pass.split(' ');
	let n =array.length;
	if(n >= 2){
		throw new Error('Error, la cadena contiene espacios en blanco');
	}
	return pass;
}

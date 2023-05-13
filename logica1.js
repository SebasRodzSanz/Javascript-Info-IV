const formulario = document.getElementById('formulario1');
const mensaje = document.querySelector('p');

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
	validar();
});

const validar = function () {
	const nombre=formulario.querySelector('#no_cuenta').value;
	const contra=formulario.querySelector('#contra').value;

	 const listo= validarCampos(nombre,contra)
	 	.then(persona=>{
	 		// console.log(persona.no_cuenta);
	 		// console.log(persona.password);
	 	})
	 	.catch(err =>console.error('error en el sistema'));
	
}

const validarCampos = async (numero,pass)=>{
	try {
		console.log("Inicio de validaciones");

		let validado = await numeroValido(numero);
		let espacio = await espaciosVacios(pass);
		let cadena = await tamañoString(espacio);
		console.log('Los datos estan listos para enviarse a la base de datos ');
		const persona ={
			no_cuenta: validado,
			password: cadena
		}
		return new Promise ((resolve,reject)=>{resolve(persona)})
	} catch(err) {
		console.error(err);
	}
}
function numeroValido(numero) {
	let nuevo = parseInt(numero, 10);
	if(Number.isNaN(nuevo)){
		return Promise.reject('ERROR, No es un numero');
	}
	return new Promise((resolve,reject)=>{
		resolve(nuevo);
	})
}
function tamañoString(pass) {
	let n = pass.length;
	if (n >12) {
		return Promise.reject("ERROR, La contraseña no es valida");
	}else if(n <=0){
		return Promise.reject("ERROR, La contraseña no es valida");
	}else if(n === 8){
		return new Promise((resolve,reject)=>{
			resolve(pass)
		});
	}else {
		return Promise.reject("ERROR, La contraseña no es valida: tamaño de la cadena");
	}
}
function espaciosVacios(pass) {
	let array =pass.split(' ');
	let n =array.length;
	if(n >= 2){
		return Promise.reject("ERROR, La contraseña no es valida: espacios en la cadena");
	}
	return new Promise((resolve,reject)=>{
			resolve(pass)
		});
}

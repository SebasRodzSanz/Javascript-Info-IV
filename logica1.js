const formulario = document.getElementById('formulario1');
const mensaje = document.querySelector('p');

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
	validar();
});

const validar =  () =>{
	 const nombre=formulario.querySelector('#no_cuenta').value;
	 const contra=formulario.querySelector('#contra').value;
	 const usuario= validarCampos(nombre,contra);
 	if (!usuario) {
	 		console.log('Los datos no fueron correctos');
	 		//no se puede hacer una consulta a la base de datos
	}else {
 		mensaje.textContent=`Tus datos se estan verificando...`;
		//se puede hacer una consulta a la base de datos
	 }
}
const validarCampos = (numero,pass)=>{
	try {
		console.log("Inicio de validaciones");

		let no_cuenta = verificarNumeroValido(numero);
		let contraseña = verificarEspaciosVacios(pass);
		contraseña =  verificarTamanioString(contraseña);
		
		const usuario ={
			no_cuenta,
			contraseña
		}
		return usuario;
	} catch(err) {
		mensaje.textContent='Verifica el numero de cuenta o la contraseña';
	}
}
const verificarNumeroValido= (numero)=> {
	let nuevoNumero = parseInt(numero, 10);
	if(Number.isNaN(nuevoNumero)){
		throw new Error ('Error, el dato ingresado no es un numero ');
	}else {
		return nuevoNumero;
	}
}
const verificarTamanioString =(pass)=> {
	let tamañoCadena = pass.length;
	if (tamañoCadena >8 || tamañoCadena <1) {
		throw new Error('Error, numero de caracteres no valido');
	}else if(tamañoCadena === 8){
		return pass;
	}else {
		throw new Error('Error, numero de caracteres no valido');
	}
}
const verificarEspaciosVacios= (pass) =>{
	let numeroEspacios =pass.split(' ');
	let tamanioArreglo =numeroEspacios.length;
	if(tamanioArreglo >= 2){
		throw new Error('Error, la cadena contiene espacios en blanco');
	}
	return pass;
}

const templatePoke = document.getElementById('template-poke').content;//importante
const tableBody = document.getElementById('table-body');
const tableFoot = document.getElementById('table-foot');
const templateFoot = document.getElementById('template-foot').content;
const fragment = document.createDocumentFragment();

const getData = async (url="")=>{
	try {
		let respuesta = await fetch(url);
		let json = await respuesta.json();
		if (!respuesta.ok) {
			throw {
				status: respuesta.status,
				statusText: respuesta.statusText
			}
		}
		return json;
	} catch(e) {
		console.log(e);

	}
}
const pintarTabla = async ()=>{
	tableFoot.textContent='';

	let pokemones = await getData("https://pokeapi.co/api/v2/pokemon/");
	
	pokemones.results.forEach(async (pokemon)=>{

		let infoPoke = await getData(pokemon.url);//*******

		let h_uno= infoPoke.abilities[0].ability.name;
		//let h_dos= (!infoPoke.abilities[1])?"sin habilidad":infoPoke.abilities[1].ability.name;
		let h_dos= "sin habilidad";

		templatePoke.querySelector('th').textContent=`${pokemon.name}`;
		templatePoke.querySelector('td').textContent=`${pokemon.url}`;
		templatePoke.querySelector('td').textContent=`${h_uno}`;
		templatePoke.querySelector('td').textContent=`${h_dos}`;
		let clon = templatePoke.cloneNode(true);
		fragment.appendChild(clon);
		});
	
	  	tableBody.appendChild(fragment);

	 // templateFoot.querySelector('th').textContent='Ya hay pokemones';
	 // let clone = templateFoot.cloneNode(true);
	 // fragment.appendChild(clone);
	 // tableFoot.appendChild(fragment);
}
document.addEventListener('DOMContentLoaded',(e)=>{
	 pintarTabla();
});

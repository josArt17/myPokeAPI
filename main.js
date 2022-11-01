let btnPokemon = document.getElementById('btnPokemon');


document.addEventListener('DOMContentLoaded', () => {
    btnPokemon.addEventListener("click" , getRandomInt);

    function getRandomInt (){
    const random = Math.floor(Math.random() * 152);
    fetchData(random);
  }
});



const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img : data.sprites.other.dream_world.front_default,
            nombre : data.name,
            vida : data.stats[0].base_stat,
            especie : data.types[0].type.name,
            ataque :  data.stats[1].base_stat,
            defensa : data.stats[2].base_stat,
            ataqueEspecial : data.stats[3].base_stat

        };

        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}


const pintarCard = (pokemon) => {
    console.log(pokemon);

    const flex = document.querySelector('.flex');
    const template = document.getElementById('template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} - <span> ${pokemon.vida}</span>`;
    clone.querySelector('.card-body-text').innerHTML = `${pokemon.especie}`;
    clone.getElementById('ataque').innerHTML = `<h3>${pokemon.ataque}</h3> <p>ATK</p>`;
    clone.getElementById('defensa').innerHTML = `<h3>${pokemon.defensa}</h3> <p>DEF</p>`;
    clone.getElementById('ataqueEspecial').innerHTML = `<h3>${pokemon.ataqueEspecial}</h3> <p>Esp.ATK</p>`;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
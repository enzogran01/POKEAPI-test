"use strict";

// Variáveis

const pokemon = document.getElementById("pokemonSearch");
const saida = document.getElementById("pokemonDisplay");

// Funções

const obterPoke = () => pokemon.value;

const exibirSaida = (mensagem) => saida.innerHTML = mensagem;

const zeroAEsquerda = (n) => String(n).padStart(4, "0");

const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

const gerarCardPoke = ( name, id, sprite) => {
    return `
        <div class="flex flex-col bg-white p-3 rounded-xl w-full max-w-75">
            <img src="${sprite}" alt="${capitalize(name)}" class="w-2xs">
            <span class="font-bold text-2xl">${capitalize(name)}</span>
            <span>N° ${zeroAEsquerda(id)}</span>
        </div>
    `;
}

async function buscarPokemon() {
    const pokemon = obterPoke();
    let urlPokeAPI = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {
        const resposta = await fetch(urlPokeAPI);

        if (!resposta) {
            throw new Error("Falha na requisição HTTP.");
        }

        const dadosJSON = await resposta.json();

        if (!dadosJSON) {
            throw new Error("Pokémon inexistente.");
        }

        exibirSaida(gerarCardPoke(dadosJSON.name, dadosJSON.id, dadosJSON.sprites.front_default));
    } catch (err) {
        exibirSaida(`<span class="italic font-bold">Pokémon inexistente!</span>`);
    }
}

// Event Listeners

pokemon.addEventListener("input", () => {
    
    buscarPokemon();
});

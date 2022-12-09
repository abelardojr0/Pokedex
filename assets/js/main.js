const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const geracoes = document.querySelectorAll("[data-geracao]");
let maxRecords = 1154;
const limit = 12;
let offset = 0;
function chamarGeracao(event) {
  event.preventDefault();
  const geracao = event.target.dataset.geracao;
  if (geracao === "1") {
    offset = 0;
    maxRecords = 151;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "2") {
    offset = 151;
    maxRecords = 251;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "3") {
    offset = 251;
    maxRecords = 386;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "4") {
    offset = 386;
    maxRecords = 649;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "5") {
    offset = 649;
    maxRecords = 721;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "6") {
    offset = 721;
    maxRecords = 802;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "7") {
    offset = 802;
    maxRecords = 890;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else if (geracao === "8") {
    offset = 890;
    maxRecords = 1154;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  } else {
    offset = 0;
    maxRecords = 1154;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    modalPokemons();
  }
}
geracoes.forEach((geracao) => {
  geracao.addEventListener("click", chamarGeracao);
});

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
        <a href="#" data-pokemon="${pokemon.name}">
            <span class="number">N°${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </a>
        </li>

        <div class="modal-container" data-modal-container="${pokemon.name}">
        <div class="modal ${pokemon.type}">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="modal-detalhes">
            <ul>
            <li>Heigth: <span>${(pokemon.height / 10).toFixed(1)}m</span></li>
            <li>Weight: <span>${(pokemon.weight / 10).toFixed(1)}Kg</span></li>
            <li>HP: <span>${pokemon.hp}</span></li>
            <li>Attack: <span>${pokemon.attack}</span></li>
            <li>Defense: <span>${pokemon.defense}</span></li>
            <li>Special Attack: <span>${pokemon.specialAttack}</span></li>
            <li>Special Defense: <span>${pokemon.specialDefense}</span></li>
            <li>Speed: <span>${pokemon.speed}</span></li>
        </ul>
            </div>
            <button class="fechar" data-fechar="${pokemon.name}">X</button>
        </div>
    </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    modalPokemons();
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
    modalPokemons();
  }
});

function modalPokemons() {
  setTimeout(() => {
    const pokemons = document.querySelectorAll("[data-pokemon]");
    pokemons.forEach((pokemon) => {
      function toggleDetalhes(event) {
        event.preventDefault();
        document
          .querySelector(`[data-modal-container=${pokemon.dataset.pokemon}]`)
          .classList.toggle("ativo");
      }

      function clickFora(event) {
        if (event.target === this) {
          toggleDetalhes(event);
        }
      }

      pokemon.addEventListener("click", toggleDetalhes);
      document
        .querySelector(`[data-modal-container=${pokemon.dataset.pokemon}]`)
        .addEventListener("click", clickFora);
      document
        .querySelector(`[data-fechar=${pokemon.dataset.pokemon}]`)
        .addEventListener("click", toggleDetalhes);
    });
  }, 1000);
}
modalPokemons();

const menuBotao = document.querySelector("[data-menu-botao]");
const menuLista = document.querySelector("[data-menu-lista]");
function clickMenu() {
  menuLista.classList.toggle("ativo");
}
if (menuBotao) {
  menuBotao.addEventListener("click", clickMenu);
}

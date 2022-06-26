// local storage of pokemons
class Codex {
  constructor(target) {
    this.parent = target;
  };

  // members declaration
  #APIEndpoint = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100`;
  #parent; // where to return the object
  #codexData = []; // response parsed to object
  #cacheName = `pokeCodex`;
  #cacheFreshTime = 600000; // time before cache is stale
  #cacheCurrentFreshness; // store last cache timestamp

  // setters & getters
  set target(parent) {
    this.#parent = parent;
  };
  get target() {
    return this.#parent;
  };

  set codexData(object) {
    this.#codexData = object;
  };
  get codexData() {
    return this.#codexData;
  };

  // methods
  async updateCodex(endpoint = this.#APIEndpoint) {
    // check if local cache exists and is fresh
    if (!this.loadFromCache()) {
      console.log("cache nonexistant or stale")
      const newInfo = await fetch(endpoint);
      const newParsedInfo = await newInfo.json();
      /// look for more pokemons
      if (newParsedInfo.next !== null) {
        setTimeout(() => {this.updateCodex(newParsedInfo.next)}, 1000);
      };
      this.codexData = this.codexData.concat(newParsedInfo.results);
    };
    this.cacheData();
  };

  async cacheData() {
    const timeStamp = Date.now();
    const dataToCache = await JSON.stringify([timeStamp, this.codexData]);
    const cachedData = await JSON.parse(localStorage.getItem(this.#cacheName));
    // checks if in cache and cache not stale
    if (cachedData === null || (cachedData[0] + this.#cacheFreshTime) < timeStamp) {
      localStorage.setItem(`PokemonCodex`, dataToCache);
    };
  };

  loadFromCache() {
    const cachedData = JSON.parse(localStorage.getItem(this.#cacheName));
    if(cachedData !== null && (cachedData[0] + this.#cacheFreshTime) < dataToCache[0]) {
      console.log("cache is fresh")
      this.codexData = cachedData[1];
      return true;
    } else {return false};
  };

  #cacheFresh() {

  };
};

/*
class PokemonCard {
  constructor(pokemon) {
    this.name = pokemon.name;
    this.image = pokemon.image;
    this.updateCard();
  };

  #name;
  #imageSrc;

  #cardNode; // HTML node object
  #cardNodeTemplate = `
  <div>
    <h1>${this.name}</h1>
    <img src=${this.imageSrc}></img>
  </div>
  `;

  set cardNode(node) {
    this.#cardNode = new DOMParser().parseFromString(node).body.firstChild;
  };
  get cardNode() {
    return this.#cardNode;
  };

  updateCard() {


    
  };
};
*/

// ==================================
// -------------- main --------------
// ==================================

// global elements
let newCodex;

// DOM elements
const codexTarget = document.getElementById("target-cards");
const buttonCreate = document.getElementById(`button-create`);
const buttonUpdate = document.getElementById(`button-update`);
const buttonLog = document.getElementById(`button-log`);

// listners
buttonCreate.addEventListener("click", () => {
  console.log(`creating codex`);
  newCodex = new Codex(codexTarget);
  buttonCreate.disabled = true;
  buttonUpdate.disabled = false;
  buttonLog.disabled = false;
});

buttonUpdate.addEventListener("click", () => {
  newCodex.updateCodex();
});

buttonLog.addEventListener("click", () => {
  console.log(newCodex.codexData);
});

// const newCodex = new Codex(codexTarget);

// local storage of pokemons
class Codex {
  constructor() {
    this.#APIEndpoint = `https://pokeapi.co/api/v2/pokemon/`;
    this.#cacheName = `pokeCodex`;
    this.#cacheFreshTime = 600000;
  };

  // members declaration
  #APIEndpoint; // where to get data object
  #codexData = []; // stored data
  #codexDataIndividual = []; // individual pokemons
  #cacheName; // localSorage key
  #cacheFreshTime; // time before cache is stale, millisecond
  #cacheDataFreshness; // last cache timestamp, millisecond
  #cacheDetailsFreshness; // last cache timestamp, millisecond

  async updateData() {};
  // #loadCache() {};
  // async #fetchResource() {};
  // async #updateCache() {};
  // #cacheStale() {};
  async updataDataDetails() {};

  // setters & getters
  get codexData() {
    return this.#codexData;
  };

  get codexDataIndividual() {
    return this.#codexDataIndividual;
  };

  get cacheDataFreshness() {
    return this.#cacheDataFreshness;
  };

  get cacheDetailsFreshness() {
    return this.#cacheDataFreshness;
  };
  
  // methods

  //TODO: fix sequence of checks, this will always fetch from server at first call
  async updateData() {
    let cache;
    if (this.#cacheDataFreshness !== undefined && !this.#cacheStale(this.#cacheDataFreshness)) {
      console.log("cache exists and is fresh");
      cache = await this.#loadCache();
    } else {
      console.log("cache nonexistant or stale");
      cache = await this.#fetchResource();
      this.#updateCache(cache);
    };
    this.#codexData = cache;
  };

  async #loadCache() {
    const localRaw = localStorage.getItem(this.#cacheName);
    return JSON.parse(localRaw).data;
  };

  #cacheStale(timestamp) {
    if ((Date.now() - this.#cacheFreshTime) < timestamp) {
      return false;
    } else {
      return true;
    };
  };

  async #fetchResource() {
    let cache = [];
    let newCache;
    let iteration = 0;
    const stride = 100; // how much to fetch each time
    do {
      console.log(`fetcing dataset: ${iteration} from server`);
      const endpoint = this.#APIEndpoint + `?offset=${stride * iteration}&limit=${stride}}`;
      const newCacheRaw = await fetch(endpoint);
      newCache = await newCacheRaw.json();
      cache = cache.concat(newCache.results);
      iteration++;
    } while (newCache.next !== null);
    return cache;
  };

  async #updateCache(rawCache) {
    const timeStamp = Date.now();
    const toStore = JSON.stringify(
      {
        "timeStamp": timeStamp,
        "data": rawCache
      }
    );

    try{
      localStorage.setItem(this.#cacheName, toStore);
    } catch (exception) {
      console.warn(exception);
      return;
    };

    console.log(`data saved with timestamp ${new Date(timeStamp)}`);
    this.#cacheDataFreshness = Date.now();
  };

  async updataDataDetails() {
    this.#codexDataIndividual = await Promise.all(this.#codexData.map(async (pokemon) => {
      const unparsed = await fetch(pokemon.url);
      return await unparsed.json();
    }));
  };
};

// ==================================
// -------------- main --------------
// ==================================

// global elements
let newCodex;

// DOM elements
const codexTarget = document.getElementById("target-cards");
const buttonCreate = document.getElementById(`button-create`);
const buttonUpdateData = document.getElementById(`button-update-data`);
const buttonUpdateDetails = document.getElementById(`button-update-details`);
const buttonLogData = document.getElementById(`button-log-data`);
const buttonLogDetails = document.getElementById(`button-log-details`);

// listners
buttonCreate.addEventListener("click", () => {
  console.log(`creating codex`);
  newCodex = new Codex(codexTarget);
  buttonCreate.disabled = true;
  buttonUpdateData.disabled = false;
  buttonUpdateDetails.disabled = false;
  buttonLogData.disabled = false;
  buttonLogDetails.disabled = false;
  console.log(newCodex);
});

buttonUpdateData.addEventListener("click", () => {
  newCodex.updateData();
  buttonUpdateDetails.disabled = false;
});

buttonUpdateDetails.addEventListener("click", () => {
  newCodex.updataDataDetails();
});

buttonLogData.addEventListener("click", () => {
  console.log(newCodex.codexData);
});

buttonLogDetails.addEventListener("click", () => {
  console.log(newCodex.codexDataIndividual);
});
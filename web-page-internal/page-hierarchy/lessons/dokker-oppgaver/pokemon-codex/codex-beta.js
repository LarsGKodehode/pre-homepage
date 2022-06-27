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
  #cacheName; // localSorage key
  #cacheFreshTime; // time before cache is stale, millisecond
  #cacheFreshness; // last cache timestamp, millisecond 

  async updateData() {};
  // #loadCache() {};
  // async #fetchResource() {};
  // async #updateCache() {};
  // #cacheStale() {};

  // setters & getters
  get codexData() {
    return this.#codexData;
  };

  get cacheFreshness() {
    return this.#cacheFreshness;
  };

  // methods

  //TODO: fix sequence of checks, this will always fetch from server at first call
  async updateData() {
    let cache;
    if (this.#cacheFreshness !== undefined && !this.#cacheStale(this.#cacheFreshness)) {
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
    this.#cacheFreshness = Date.now();
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
const buttonUpdate = document.getElementById(`button-update`);
const buttonLog = document.getElementById(`button-log`);

// listners
buttonCreate.addEventListener("click", () => {
  console.log(`creating codex`);
  newCodex = new Codex(codexTarget);
  buttonCreate.disabled = true;
  buttonUpdate.disabled = false;
  buttonLog.disabled = false;

  console.log(newCodex);
});

buttonUpdate.addEventListener("click", () => {
  newCodex.updateData();
});

buttonLog.addEventListener("click", () => {
  console.log(newCodex.codexData);
});


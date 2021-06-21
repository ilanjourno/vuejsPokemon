import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemons: {
      data: {},
      next: '',
    },
    abilities: {},
    types: {},
  },
  mutations: {
    STORE_POKEMONS(state, data) {
      data.results.map((element) => {
        if (!state.pokemons.data[element.name]) {
          state.pokemons.data[element.name] = element;
        }
        return true;
      });
      state.pokemons.next = data.next;
    },
    STORE_ABILITIES(state, data) {
      data.results.map((element) => {
        if (!state.abilities[element.name]) {
          state.abilities[element.name] = element;
        }
        return state.abilities[element.name];
      });
    },
    STORE_TYPES(state, data) {
      data.results.map((element) => {
        if (!state.types[element.name]) {
          state.types[element.name] = element;
        }
        return state.types[element.name];
      });
    },
    STORE_TYPE(state, data) {
      if (!state.types[data.name] || Object.values(state.types[data.name]).length === 2) {
        state.types[data.name] = data;
      }
      return true;
    },
    STORE_ABILITY(state, data) {
      if (!state.abilities[data.name] || Object.values(state.abilities[data.name]).length === 2) {
        state.abilities[data.name] = data;
      }
      return true;
    },
    UPSERT_POKEMON(state, data) {
      state.pokemons.data[data.name] = data;
    },
    SEARCH_POKEMONS(state, data) {
      if (data.value !== '') {
        Object.entries(state.pokemons.data).map(([key]) => {
          if (!key.includes(data.value)) {
            state.pokemons.data[key].is_hidden = true;
          } else {
            state.pokemons.data[key].is_hidden = false;
          }
          return state.pokemons.data;
        });
      } else {
        Object.entries(state.pokemons.data).map(([key]) => {
          state.pokemons.data[key].is_hidden = false;
          return state.pokemons.data;
        });
      }
      return true;
    },
  },
  actions: {
    getPokemons({ commit }) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/pokemon?limit=100`)
        .then((res) => res.json())
        .then((res) => commit('STORE_POKEMONS', res));
    },
    getAbilities({ commit }) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/ability`)
        .then((res) => res.json())
        .then((res) => commit('STORE_ABILITIES', res));
    },
    getTypes({ commit }) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/type`)
        .then((res) => res.json())
        .then((res) => commit('STORE_TYPES', res));
    },
    getPokemon({ commit }, name) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/pokemon/${name}`)
        .then((res) => res.json())
        .then((res) => commit('UPSERT_POKEMON', res));
    },
    getType({ commit }, name) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/type/${name}`)
        .then((res) => res.json())
        .then((res) => commit('STORE_TYPE', res));
    },
    getAbility({ commit }, name) {
      return fetch(`${process.env.VUE_APP_POKEMON_API}/ability/${name}`)
        .then((res) => res.json())
        .then((res) => commit('STORE_ABILITY', res));
    },
    searchPokemon({ commit }, filter) {
      return commit('SEARCH_POKEMONS', filter);
    },
  },
});

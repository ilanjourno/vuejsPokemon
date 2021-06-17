import { createStore } from 'vuex';

export default createStore({
  state: {
    pokemons: {
      data: {},
      next: '',
    },
    abilities: {
      data: [],
      next: '',
    },
    types: {
      data: [],
      next: '',
    },
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
      data.results.map((element) => (!state.abilities.data.includes(element) ? state.abilities.data.push(element) : ''));
      state.abilities.next = data.next;
    },
    STORE_TYPES(state, data) {
      data.results.map((element) => (!state.types.data.includes(element) ? state.types.data.push(element) : ''));
      state.types.next = data.next;
    },
    UPSERT_POKEMON(state, data) {
      state.pokemons.data[data.name] = data;
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
  },
});

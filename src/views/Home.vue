<template>
  <input type="text" v-model="filter"/>
  <button type="button" @click="search">Search</button>
  <button type="button" @click="reset">Reset</button>
  <div class="home">
    <table>
        <thead>
          <tr>
            <th
              v-for="(element, index) in header"
              :key="index"
            >
              {{element}}
            </th>
          </tr>
        </thead>
        <tbody >
          <div v-for="(pokemon, index) in pokemons"
            :key="index">
            <tr v-if="!pokemon.is_hidden">
                <td >{{pokemon.name}}</td>
                <td v-if="!pokemon.is_hidden">
                  <router-link :to="'/pokemon/'+pokemon.name"
                  class="btn btn-primary">Voir la fiche</router-link>
                </td>
            </tr>
          </div>
        </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const filter = ref(null);
    const dataPokemon = store.state.pokemons;
    const pokemons = computed(() => dataPokemon.data);
    const header = ['Nom :', 'Actions :'];
    const search = () => {
      store.dispatch('searchPokemon', filter);
    };
    const reset = () => {
      filter.value = '';
      store.dispatch('searchPokemon', filter);
    };
    return {
      pokemons,
      header,
      search,
      reset,
      filter,
    };
  },
};
</script>

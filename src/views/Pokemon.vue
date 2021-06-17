<template>
  <h1>{{pokemonName}}</h1>
  <div v-if="pokemon">
    <h1>{{pokemon}}</h1>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Pokemon',
  props: {
    name: String,
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const pokemonName = props.name ? props.name : route.params.name;
    const pokemons = store.state.pokemons.data;
    if (!pokemons[pokemonName] || !pokemons[pokemonName].id) {
      store.dispatch('getPokemon', pokemonName);
    }
    const pokemon = computed(() => {
      console.log(pokemons[pokemonName]);
      return pokemons[pokemonName];
    });
    const tables = computed(() => {
      const abilities = {
        title: "Abilités",
        data: pokemon.abilities.map(() => 'ilan')
      }
      console.log(abilities);
      return "ilan";
    });
    return {
      pokemonName,
      pokemon,
      tables,
    };
  },
};

</script>

<style>

</style>

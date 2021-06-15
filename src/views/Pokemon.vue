<template>
  <div>
  </div>
</template>

<script>
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
    const pokemon = store.state.pokemons.data[pokemonName];
    console.log(pokemon);
    return {
      pokemonName,
      pokemon,
    };
  },
};

</script>

<style>

</style>

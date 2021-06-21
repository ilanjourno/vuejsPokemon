<template>
  <h1>{{pokemonName}}</h1>
  <Table :elements="tables"/>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table from '../components/Table.vue';

export default {
  name: 'Pokemon',
  props: {
    name: String,
  },
  components: {
    Table,
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const pokemonName = props.name ? props.name : route.params.name;
    const pokemons = store.state.pokemons.data;
    if (!pokemons[pokemonName] || !pokemons[pokemonName].id) {
      store.dispatch('getPokemon', pokemonName);
    }
    const pokemon = computed(() => pokemons[pokemonName]);
    const tables = computed(() => {
      const result = [
        {
          title: 'Expérience :',
          value: pokemon.value.base_experience,
        },
        {
          title: 'Taille :',
          value: pokemon.value.height,
        },
        {
          title: 'Poid :',
          value: pokemon.value.weight,
        },
        {
          title: 'Espece :',
          value: pokemon.value.species && pokemon.value.species.name,
        },
        {
          title: 'Les abilités :',
          header: [
            {
              label: 'Nom :',
              value: 'ability.name',
              url: '/ability/',
            },
          ],
          columns: pokemon.value.abilities,
        },
        {
          title: 'Types: ',
          header: [
            {
              label: 'Slot :',
              value: 'slot',
            },
            {
              label: 'Nom :',
              value: 'type.name',
              url: '/type/',
            },
          ],
          columns: pokemon.value.types,
        },
        {
          title: 'Les mouvements :',
          header: [
            {
              label: 'Nom :',
              value: 'move.name',
            },
            {
              label: 'Version détaillé :',
              value: 'version_group_details',
              array: {
                header: [
                  {
                    label: 'Appris à :',
                    value: 'level_learned_at',
                  },
                  {
                    label: 'Mouvement d\'apprentissage :',
                    value: 'move_learn_method.name',
                  },
                  {
                    label: 'Version groupe :',
                    value: 'version_group.name',
                  },
                ],
              },
            },
          ],
          columns: pokemon.value.moves,
        },
      ];
      return result;
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

<template>
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
        <tbody>
          <tr
            v-for="(pokemon, index) in pokemons"
            :key="index"
          >
            <td>{{pokemon.name}}</td>
            <td>
              <router-link :to="'/pokemon/'+pokemon.name"
              class="btn btn-primary">Voir la fiche</router-link>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const pokemons = store.state.pokemons.data;
    const header = ['Nom :', 'Actions :'];

    return {
      pokemons,
      header,
    };
  },
};
</script>

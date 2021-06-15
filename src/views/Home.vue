<template>
  <div class="home">

  </div>
</template>

<script>
import { onMounted } from 'vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  setup() {
    onMounted(async () => {
      const store = useStore();
      await store.dispatch('getPokemons');
      console.log(store.state.pokemons);
    });
  },
};
</script>

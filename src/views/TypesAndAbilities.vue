<template>
    <label for="search">Rechercher :</label>
    <input type="text" id="search" v-model="filter"/>
    <div class="home">
    <table>
        <thead>
          <tr>
            <th>
              Nom :
            </th>
          </tr>
        </thead>
        <tbody >
            <tr v-for="(element, index) in
            result.sort().filter((element) => filter == null ? element : element.includes(filter))"
            :key="index">
                <td>{{element}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TypesAndAbilities',
  setup() {
    const filter = ref(null);
    const store = useStore();
    const array = ref([]);
    const { types, abilities } = store.state;
    const result = computed(() => {
      const global = { ...types, ...abilities };
      Object.keys(global).map((element) => array.value.push(element));
      return array.value;
    });
    return {
      filter,
      array,
      result,
    };
  },
};
</script>

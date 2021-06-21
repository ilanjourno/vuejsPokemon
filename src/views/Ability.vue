<template>
    <Table :elements="tables"/>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table from '../components/Table.vue';

export default {
  name: 'PokemonAbility',
  components: {
    Table,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const abilityName = route.params.name;
    const { abilities } = store.state;
    if (!abilities[abilityName]) {
      store.dispatch('getAbility', abilityName);
    }
    const ability = computed(() => abilities[abilityName]);
    const tables = computed(() => {
      const result = [
        {
          title: 'Effect entries :',
          array: true,
          filter: {
            path: 'language.name',
            value: 'en',
          },
          header: [
            {
              label: 'Effect :',
              value: 'effect',
            },
            {
              label: 'Language :',
              value: 'language.name',
            },
            {
              label: 'Short effect :',
              value: 'short_effect',
            },
          ],
          columns: ability.value && ability.value.effect_entries,
        },
        {
          title: 'Flavor text entries :',
          array: true,
          filter: {
            path: 'language.name',
            value: 'en',
          },
          header: [
            {
              label: 'Flavor text :',
              value: 'flavor_text',
            },
            {
              label: 'Language :',
              value: 'language.name',
            },
            {
              label: 'Version group :',
              value: 'version_group.name',
            },
          ],
          columns: ability.value && ability.value.flavor_text_entries,
        },
        {
          title: 'Génération :',
          value: ability.value && ability.value.generation && ability.value.generation.name,
        },
      ];
      return result;
    });

    return { tables, ability };
  },
};
</script>

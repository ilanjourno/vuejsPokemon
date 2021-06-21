<template>
    <h1>{{typeName}}</h1>
    <Table :elements="tables"/>
</template>

<script>
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table from '../components/Table.vue';

export default {
  name: 'PokemonType',
  components: {
    Table,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const typeName = ref(route.params.name);
    const { types } = store.state;
    const load = () => {
      if (!types[typeName.value] || Object.values(types[typeName.value]).length === 2) {
        store.dispatch('getType', typeName.value);
      }
    };
    load();
    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.name !== from.params.id) {
        typeName.value = to.params.name;
        load();
      }
    });
    const type = computed(() => types[typeName.value]);
    const tables = computed(() => {
      const result = [
        {
          title: 'ID :',
          value: type.value && type.value.id,
        },
        {
          title: 'Damage relation :',
          array: true,
          header: [
            {
              label: 'Double damages from :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.double_damage_from,
        },
        {
          array: true,
          header: [
            {
              label: 'Double damages to :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.double_damage_to,
        },
        {
          array: true,
          header: [
            {
              label: 'Half damage from :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.half_damage_from,
        },
        {
          array: true,
          header: [
            {
              label: 'Half damage to :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.half_damage_to,
        },
        {
          array: true,
          header: [
            {
              label: 'No damage from :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.no_damage_from,
        },
        {
          array: true,
          header: [
            {
              label: 'No damae to :',
              value: 'name',
              url: '/type/',
            },
          ],
          columns: type.value && type.value.damage_relations
          && type.value.damage_relations.no_damage_to,
        },
        {
          title: 'Génération :',
          value: type.value && type.value.generation && type.value.generation.name,
        },
      ];

      return result;
    });
    return {
      type, types, typeName, tables,
    };
  },
};
</script>

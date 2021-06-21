<template>
    <div
        v-for="(table, index) in tables"
        :key="index"
        style="text-align:left;"
    >
        <h2>{{table.title && table.title}}</h2>
        <table
        v-if="!table.value">
            <thead>
                <tr>
                    <th
                    v-for="(header, i) in table.header"
                    :key="i">
                        {{header.label}}
                    </th>
                </tr>
            </thead>
            <tbody v-if="!table.array">
                <tr
                v-for="(column, i) in table.columns"
                :key="i">
                    <td
                    class="d-flex"
                    v-for="(header, h) in table.header"
                    :key="h">
                        <p v-if="!header.url && !header.array && !header.value2">
                            {{header.value.split('.').reduce(getIndex, column)}}
                        </p>
                        <router-link
                        v-if="header.url"
                        :to="header.url+header.value.split('.').reduce(getIndex, column)"
                        >{{header.value.split('.').reduce(getIndex, column)}}</router-link>
                        <table v-if="header.array">
                           <thead>
                                <tr>
                                    <th
                                    v-for="(h, ind) in header.array.header"
                                    :key="ind">
                                        {{h.label}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(col, colI) in
                                header.value.split('.').reduce(getIndex, column)"
                                :key="colI">
                                    <td
                                    v-for="(h, ind) in header.array.header"
                                    :key="ind">
                                        {{h.value.split('.').reduce(getIndex, col)}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="table.array && table.filter">
                <tr
                v-for="(column, col) in table.columns"
                :key="col">
                    <td
                    v-for="(header, h) in table.header"
                    :key="h">
                        <div
                        v-if="table.filter.path &&
                        table.filter.path.split('.')
                        .reduce(getIndex, column) === table.filter.value">
                            <p v-if="!header.url">
                                {{header.value.split('.').reduce(getIndex, column)}}
                            </p>
                            <router-link
                            v-if="header.url"
                            :to="header.url+header.value.split('.').reduce(getIndex, column)"
                            >{{header.value.split('.').reduce(getIndex, column)}}</router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="table.array && !table.filter">
                <tr
                    v-for="(column, col) in table.columns"
                    :key="col">
                    <td
                    v-for="(header, h) in table.header"
                    :key="h">
                        <p v-if="!header.url">
                            {{header.value.split('.').reduce(getIndex, column)}}
                        </p>
                        <router-link
                        v-if="header.url"
                        :to="header.url+header.value.split('.').reduce(getIndex, column)"
                        >{{header.value.split('.').reduce(getIndex, column)}}</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="table.value">
            <p v-if="!table.url">{{table.value}}</p>
            <router-link
            v-if="table.url"
            :to="table.url+table.value"
            >{{table.value}}</router-link>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Table',
  props: {
    elements: Object,
  },
  setup(props) {
    const tables = computed(() => props.elements);
    const getIndex = (obj, i) => obj[i];

    return { tables, getIndex };
  },
};
</script>

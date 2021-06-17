<template>
    <h1>{{title}}</h1>
    <table>
        <thead>
            <tr>
                <th v-for="(value, index) in header" :key="index">{{value}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value, index) in columns.data" :key="index">
                <td>{{value}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        title: String,
        header: Array,
        columns: Object
    },
};
</script>
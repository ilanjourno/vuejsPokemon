import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Pokemon from '../views/Pokemon.vue';
import PokemonType from '../views/PokemonType.vue';
import PokemonAbility from '../views/Ability.vue';
import TypesAndAbilities from '../views/TypesAndAbilities.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon/:name',
    name: 'Pokemon',
    component: Pokemon,
  },
  {
    path: '/type/:name',
    name: 'Type',
    component: PokemonType,
  },
  {
    path: '/ability/:name',
    name: 'Ability',
    component: PokemonAbility,
  },
  {
    path: '/typesAndAbilities',
    name: 'TypesAndAbilities',
    component: TypesAndAbilities,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/HelloWorld.vue'),
        props: { msg: 'Welcome to NearBy' }
    },
    {
        path: '/getStarted',
        name: 'getStarted',
        component: () => import('../components/GetStartedComponent.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
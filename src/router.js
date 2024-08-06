import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './components/Welcome.vue';
import Contact from './components/Contact.vue';
import Shop from './components/Shop.vue';
import Cart from './components/Cart.vue';
import Checkout from "@/components/Checkout.vue";

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
    }
    // Add more routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
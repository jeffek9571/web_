import { createApp } from 'vue'
import App from './App.vue'
import lazyPlugin from 'vue3-lazy'

createApp(App).use(lazyPlugin, {
    loading: '',
    error: ''
}).mount('#app')

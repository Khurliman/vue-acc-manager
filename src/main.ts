import { createApp } from 'vue'

import { createPinia } from 'pinia'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css'

import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives
})

createApp(App)
.use(createPinia())
.use(vuetify)
.mount('#app')

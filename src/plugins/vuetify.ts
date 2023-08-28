/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      default: {
        colors: {
          primary: '#97ce4c',
          secondary: '#E89242FF',
          background: '#84b0f7',
          'background-light': '#fff',
          surface: '#b7e4f9',
          accent: '#44281d'
        }
      }
    }
  }
})

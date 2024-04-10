import './assets/css/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes,
  },
  // function to have custom setups
  /* ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }, */
)

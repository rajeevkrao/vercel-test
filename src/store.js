import { reactive } from 'vue'

export const store = reactive({
  backend_uri: import.meta.env.PROD ? '/' : 'http://localhost:5000/',
  count:0
})
import { reactive } from 'vue'

export const store = reactive({
  backend_uri: import.meta.env.PROD ? '/' : 'localhost:5000/'
})
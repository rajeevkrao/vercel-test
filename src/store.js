import { reactive } from 'vue'

export const store = reactive({
  backend_uri: import.meta.env.PROD ? 'https://scamnum-backend.vercel.app/' : 'http://localhost:5000/',
  count:0
})
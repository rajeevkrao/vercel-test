<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { store } from '../store.js'

onMounted(()=>{
  axios.get(store.backend_uri+"api/getnums").then(res=>{
    console.log("axios get")
    data.value = res.data
  })
  .catch(err=>{
    console.log(err)
  })
})

defineProps({
  msg: String,
})

function click(){
  count.value++;
  store.count++;
}

const count = ref(0)
const data = ref(null)
</script>

<template>
  <h1>{{ msg }}</h1>

  <h3 v-for="num in data">+{{ num.cc }} {{ num.number }}</h3>

  <div class="card">
    <button type="button" @click="click()">count is {{ count }}</button>
    <p>
      Edit
      <code>views/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

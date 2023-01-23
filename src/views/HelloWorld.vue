<script setup>
import { ref } from 'vue'
import axios from 'axios'

import { store } from '../store.js'

defineProps({
  msg: String,
})

function click(){
  count.value++;
  store.count++;
}

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <h1>{{ store.backend_uri }}</h1>

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

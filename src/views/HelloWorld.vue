<script setup>
import { ref } from 'vue'
import axios from 'axios'

import { store } from '../store.js'

defineProps({
  msg: String,
})

let a = import.meta.env.DEV

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <h1>{{ store.backend_uri }}</h1>

  <div class="card">
    <h1>{{ a }}</h1>
    <button type="button" @click="count++">count is {{ count }}</button>
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

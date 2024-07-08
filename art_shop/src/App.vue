<script setup>

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation.vue'


</script>

<template>
  <header>

  </header>

  <main>
    <div>
      <Navigation/>
      <router-view/>
    </div>

  </main>
</template>

<style scoped>

</style>

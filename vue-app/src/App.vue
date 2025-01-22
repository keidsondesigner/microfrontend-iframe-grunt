<template>
  <div style="padding: 20px;">
    <h1>Vue Microfrontend</h1>
    <p>This is the Vue application running in an iframe.</p>
    <button @click="sendMessage">Send Message to Parent</button>
  </div>
</template>

<script setup lang="ts">
const sendMessage = () => {
  window.parent.postMessage('Hello from Vue!', '*');
};
</script>
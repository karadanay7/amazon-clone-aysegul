<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>

<style>
body {
  font-size: 13px;
  list-style: 19px;
  color: #111;
}
</style>

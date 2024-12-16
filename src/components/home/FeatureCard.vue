<script setup>
defineProps({
  icon: String,
  title: String,
  description: String
});
</script>

<template>
  <div class="feature-card glass-card p-8 rounded-2xl">
    <div class="text-primary-600 mb-6" v-html="icon"></div>
    <h3 class="font-display text-2xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
      {{ title }}
    </h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>
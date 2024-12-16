`
<script setup>
import { ref } from 'vue';

const props = defineProps({
  currentFormat: String
});

const emit = defineEmits(['update:targetFormat']);

const formats = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'webp', label: 'WebP' },
  { value: 'svg', label: 'SVG' }
];

const selectedFormat = ref(formats[0].value);

const updateFormat = (format) => {
  selectedFormat.value = format;
  emit('update:targetFormat', format);
};
</script>

<template>
  <div class="space-y-3">
    <h4 class="text-lg font-medium text-gray-800">Izaberite format</h4>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button v-for="format in formats" :key="format.value" @click="updateFormat(format.value)" :class="[
        'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
        selectedFormat === format.value
          ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg scale-[1.02]'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      ]">
        {{ format.label }}
      </button>
    </div>
  </div>
</template>
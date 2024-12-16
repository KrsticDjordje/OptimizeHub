<script setup>
import { ref, computed } from 'vue';
import FormatSelector from './converter/FormatSelector.vue';

const file = ref(null);
const convertedFile = ref(null);
const isConverting = ref(false);
const targetFormat = ref('png');
const conversionStatus = ref('');
const conversionProgress = ref(0);

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  convertedFile.value = null;
  conversionStatus.value = '';
  conversionProgress.value = 0;
};

const convertFile = async () => {
  if (!file.value) return;

  isConverting.value = true;
  conversionStatus.value = 'Konverzija u toku...';
  conversionProgress.value = 0;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (file.value.type.startsWith('image/')) {
      const img = new Image();
      img.src = URL.createObjectURL(file.value);

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const mimeType = `image/${targetFormat.value}`;
          canvas.toBlob((blob) => {
            convertedFile.value = blob;
            conversionProgress.value = 100;
            resolve();
          }, mimeType, 0.9);
        };
      });

      conversionStatus.value = 'Konverzija uspešno završena!';
    }
  } catch (error) {
    console.error('Konverzija nije uspela:', error);
    conversionStatus.value = 'Greška pri konverziji';
  } finally {
    isConverting.value = false;
  }
};

const downloadConvertedFile = () => {
  if (!convertedFile.value) return;

  const fileName = `converted_${file.value.name.split('.')[0]}.${targetFormat.value}`;
  const url = URL.createObjectURL(convertedFile.value);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

const buttonText = computed(() => {
  if (isConverting.value) {
    return 'Konverzija u toku...';
  }
  return convertedFile.value ? 'Konvertuj novi fajl' : 'Konvertuj fajl';
});
</script>

<template>
  <div class="p-8">
    <div class="space-y-8">
      <div class="glass-card rounded-2xl p-10 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50 -z-10"></div>

        <input type="file" @change="handleFileChange" class="hidden" id="convertFileInput" accept="image/*" />
        <label for="convertFileInput" class="cursor-pointer block">
          <div class="space-y-6">
            <div
              class="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-5 shadow-lg animate-float">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p class="text-xl font-display font-bold text-primary-700">Drop your image here</p>
              <p class="text-gray-600 mt-2">or click to browse</p>
              <p class="text-sm text-gray-500 mt-4">Supports PNG, JPEG, WebP, and SVG</p>
            </div>
          </div>
        </label>

        <div v-if="file" class="mt-6 p-4 bg-white/50 rounded-xl">
          <p class="font-medium text-gray-700">{{ file.name }}</p>
          <p class="text-sm text-gray-500">Size: {{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
        </div>
      </div>

      <div v-if="file" class="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <FormatSelector :current-format="file.type.split('/')[1]" v-model:targetFormat="targetFormat" />
      </div>

      <div v-if="conversionStatus" class="mt-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-blue-700">{{ conversionStatus }}</p>
          <div v-if="conversionProgress > 0" class="mt-2 h-2 bg-blue-200 rounded-full">
            <div class="h-full bg-blue-600 rounded-full transition-all duration-300"
              :style="{ width: `${conversionProgress}%` }"></div>
          </div>
        </div>
      </div>

      <div v-if="convertedFile" class="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">Konverzija završena</h3>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-green-800">
            Fajl je uspešno konvertovan u {{ targetFormat.toUpperCase() }} format
          </p>
        </div>

        <button @click="downloadConvertedFile"
          class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Preuzmi konvertovani fajl</span>
        </button>
      </div>

      <button @click="convertFile" :disabled="!file || isConverting"
        class="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-4 rounded-xl font-medium disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100">
        <span class="flex items-center justify-center space-x-2">
          <svg v-if="isConverting" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span>{{ buttonText }}</span>
        </span>
      </button>
    </div>
  </div>
</template>
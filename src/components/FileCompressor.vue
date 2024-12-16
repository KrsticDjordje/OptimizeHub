<template>
  <div class="p-8">
    <div class="space-y-8">
      <div class="glass-card rounded-2xl p-10 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50 -z-10"></div>

        <input type="file" @change="handleFileChange" class="hidden" id="fileInput"
          accept="image/*,application/pdf,video/*" />
        <label for="fileInput" class="cursor-pointer block">
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
              <p class="text-xl font-display font-bold text-primary-700">Drop your files here</p>
              <p class="text-gray-600 mt-2">or click to browse</p>
              <p class="text-sm text-gray-500 mt-4">Supports Images, PDFs, and Videos</p>
            </div>
          </div>
        </label>

        <div v-if="file" class="mt-6 p-4 bg-white/50 rounded-xl">
          <p class="font-medium text-gray-700">{{ file.name }}</p>
          <p class="text-sm text-gray-500">Size: {{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
        </div>
      </div>

      <div v-if="compressionStatus" class="mt-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-blue-700">{{ compressionStatus }}</p>
          <div v-if="compressionProgress > 0" class="mt-2 h-2 bg-blue-200 rounded-full">
            <div class="h-full bg-blue-600 rounded-full transition-all duration-300"
              :style="{ width: `${compressionProgress}%` }"></div>
          </div>
        </div>
      </div>

      <div v-if="compressionStats" class="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">Rezultat kompresije</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Originalna veličina</p>
            <p class="text-xl font-semibold text-gray-800">{{ compressionStats.originalSize }} MB</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Nova veličina</p>
            <p class="text-xl font-semibold text-gray-800">{{ compressionStats.compressedSize }} MB</p>
          </div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-green-800">
            Smanjeno za {{ compressionStats.savedPercentage }}%
          </p>
        </div>

        <button @click="downloadCompressedFile"
          class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Preuzmi kompresovani fajl</span>
        </button>
      </div>

      <button @click="compressFile" :disabled="!file || isCompressing"
        class="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-4 rounded-xl font-medium disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100">
        <span class="flex items-center justify-center space-x-2">
          <svg v-if="isCompressing" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
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

<script setup>
import { ref, computed } from 'vue';
import Compressor from 'compressorjs';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const file = ref(null);
const isCompressing = ref(false);
const compressionStatus = ref('');
const compressionProgress = ref(0);
const compressedFile = ref(null);
const compressionStats = ref(null);

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  compressionStatus.value = '';
  compressionProgress.value = 0;
  compressedFile.value = null;
  compressionStats.value = null;
};

const calculateCompressionStats = (originalSize, compressedSize) => {
  const savedBytes = originalSize - compressedSize;
  const compressionRatio = ((savedBytes / originalSize) * 100).toFixed(1);
  return {
    originalSize: (originalSize / (1024 * 1024)).toFixed(2),
    compressedSize: (compressedSize / (1024 * 1024)).toFixed(2),
    savedPercentage: compressionRatio
  };
};

const compressImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      quality: 0.6,
      maxWidth: 2000,
      maxHeight: 2000,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      }
    });
  });
};

const compressPDF = async (pdfFile) => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const compressedPdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    compress: true
  });

  return new Blob([compressedPdfBytes], { type: 'application/pdf' });
};

const compressVideo = async (videoFile) => {
  return videoFile;
};

const downloadCompressedFile = () => {
  if (!compressedFile.value) return;
  const fileName = `compressed_${file.value.name}`;
  saveAs(compressedFile.value, fileName);
};

const resetState = () => {
  file.value = null;
  compressionStatus.value = '';
  compressionProgress.value = 0;
  compressedFile.value = null;
  compressionStats.value = null;
};

const compressFile = async () => {
  if (compressionStats.value) {
    resetState();
    return;
  }

  if (!file.value) return;

  isCompressing.value = true;
  compressionStatus.value = 'Kompresija u toku...';
  compressedFile.value = null;
  compressionStats.value = null;

  try {
    let compressed;

    if (file.value.type.startsWith('image/')) {
      compressionStatus.value = 'Kompresija slike...';
      compressed = await compressImage(file.value);
    }
    else if (file.value.type === 'application/pdf') {
      compressionStatus.value = 'Kompresija PDF-a...';
      compressed = await compressPDF(file.value);
    }
    else if (file.value.type.startsWith('video/')) {
      compressionStatus.value = 'Kompresija videa...';
      compressed = await compressVideo(file.value);
    }

    compressedFile.value = compressed;
    compressionStats.value = calculateCompressionStats(file.value.size, compressed.size);

    compressionStatus.value = 'Kompresija uspešno završena!';
    compressionProgress.value = 100;
  } catch (error) {
    console.error('Greška pri kompresiji:', error);
    compressionStatus.value = 'Greška pri kompresiji fajla';
  } finally {
    isCompressing.value = false;
  }
};

const buttonText = computed(() => {
  if (isCompressing.value) {
    return 'Kompresija u toku...';
  }
  return compressionStats.value ? 'Kompresuj novi fajl' : 'Kompresuj fajl';
});
</script>
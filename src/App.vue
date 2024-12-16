<script setup>
import { ref, computed } from 'vue';
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import FileCompressor from './components/FileCompressor.vue';
import FormatConverter from './components/FormatConverter.vue';
import FeatureCard from './components/home/FeatureCard.vue';
import PaymentModal from './components/payment/PaymentModal.vue';

const activeTab = ref('compress');
const isPaymentModalOpen = ref(false);
const selectedAmount = ref(0);
const customAmount = ref(0);

const handlePayment = (amount) => {
  selectedAmount.value = amount;
  isPaymentModalOpen.value = true;
};

const features = [
  {
    icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
    title: 'Smart Compression',
    description: 'Reduce file sizes while maintaining quality using advanced compression algorithms.'
  },
  {
    icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>',
    title: 'Format Conversion',
    description: 'Convert between popular formats including PNG, JPEG, WebP, and SVG with perfect quality.'
  },
  {
    icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>',
    title: 'Secure Processing',
    description: 'All processing happens locally in your browser. Your files never leave your device, ensuring complete privacy.'
  }
];
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Header />

    <main class="flex-grow">
      <!-- Hero Section -->
      <section
        class="relative pt-32 pb-38 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 overflow-hidden">
        <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 mt-8">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Files with <br class="hidden sm:block" />
              Professional Tools
            </h1>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Professional file tools available to everyone. No limits, no subscriptions -
              just pay what you feel is fair. Your support keeps these tools free and accessible.
            </p>
            <a href="#tools"
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-violet-600 bg-white rounded-xl hover:bg-violet-50 transition shadow-lg">
              Try it Now
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Tools Section -->
      <section id="tools" class="py-20 -mt-20">
        <div class="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-1">
            <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div class="border-b">
                <nav class="flex">
                  <button v-for="tab in ['compress', 'convert']" :key="tab" @click="activeTab = tab" :class="[
                    'px-8 py-4 text-sm font-medium border-b-2 transition',
                    activeTab === tab
                      ? 'border-violet-500 text-violet-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  ]">
                    {{ tab === 'compress' ? 'Compress Files' : 'Convert Format' }}
                  </button>
                </nav>
              </div>

              <div>
                <FileCompressor v-if="activeTab === 'compress'" />
                <FormatConverter v-if="activeTab === 'convert'" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Professional Tools For Everyone</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              High-quality tools that respect your privacy, supported by the community. Use for free, contribute if you
              can.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard v-for="feature in features" :key="feature.title" v-bind="feature" />
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section id="how-it-works" class="py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">How it Works</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your files in just a few clicks with our powerful tools
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Step 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div
                class="w-14 h-14 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-6">
                1
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Upload Your Files</h3>
              <p class="text-gray-600">
                Simply drag and drop your files or click to browse. We support various formats including images, PDFs,
                and videos.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div
                class="w-14 h-14 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-6">
                2
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Choose Your Tool</h3>
              <p class="text-gray-600">
                Select between compression to reduce file size while maintaining quality, or convert between different
                formats.
              </p>
              <ul class="mt-4 space-y-2 text-sm text-gray-500">
                <li>• Compress images up to 80% smaller</li>
                <li>• Optimize PDFs for sharing</li>
                <li>• Convert between PNG, JPEG, WebP</li>
              </ul>
            </div>

            <!-- Step 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div
                class="w-14 h-14 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-6">
                3
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Download Results</h3>
              <p class="text-gray-600">
                Get your optimized files instantly. All processing happens in your browser - your files never leave your
                device.
              </p>
            </div>
          </div>

          <!-- Results Section -->
          <div class="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">What You Can Achieve</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-white p-6 rounded-xl">
                <div class="text-violet-600 font-bold text-2xl mb-2">80%</div>
                <div class="text-gray-600">Smaller image files</div>
              </div>
              <div class="bg-white p-6 rounded-xl">
                <div class="text-violet-600 font-bold text-2xl mb-2">90%</div>
                <div class="text-gray-600">PDF size reduction</div>
              </div>
              <div class="bg-white p-6 rounded-xl">
                <div class="text-violet-600 font-bold text-2xl mb-2">100%</div>
                <div class="text-gray-600">Browser-based processing</div>
              </div>
              <div class="bg-white p-6 rounded-xl">
                <div class="text-violet-600 font-bold text-2xl mb-2">4+</div>
                <div class="text-gray-600">Supported formats</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing/Donation Section -->
      <section id="donate" class="py-24 bg-gradient-to-br from-violet-50 to-pink-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Support Our Project</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              OptimizeHub Pro is open for everyone. Your contribution helps us maintain and improve the tools.
            </p>
          </div>

          <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="p-8 text-center">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Pay What You Want</h3>
                <p class="text-gray-600 mb-8">
                  Choose your contribution amount. Every donation helps us keep these tools free and accessible for
                  everyone.
                </p>

                <div class="grid grid-cols-3 gap-4 mb-8">
                  <button @click="handlePayment(5)"
                    class="p-4 rounded-xl border-2 border-violet-200 hover:border-violet-500 hover:bg-violet-50 transition">
                    <div class="text-2xl font-bold text-violet-600">€5</div>
                    <div class="text-sm text-gray-500">Coffee</div>
                  </button>
                  <button @click="handlePayment(10)" class="p-4 rounded-xl border-2 border-violet-500 bg-violet-50">
                    <div class="text-2xl font-bold text-violet-600">€10</div>
                    <div class="text-sm text-gray-500">Popular</div>
                  </button>
                  <button @click="handlePayment(20)"
                    class="p-4 rounded-xl border-2 border-violet-200 hover:border-violet-500 hover:bg-violet-50 transition">
                    <div class="text-2xl font-bold text-violet-600">€20</div>
                    <div class="text-sm text-gray-500">Support</div>
                  </button>
                </div>

                <div class="mb-8">
                  <div class="relative">
                    <input type="number" min="1" v-model="customAmount"
                      class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                      placeholder="Custom amount $">
                    <div class="absolute inset-y-0 left-3 flex items-center text-gray-500"></div>
                  </div>
                </div>

                <button @click="handlePayment(customAmount || 10)"
                  class="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition shadow-lg">
                  Support Now
                </button>

                <div class="mt-6 text-center">
                  <p class="text-sm text-gray-500">
                    Your contribution includes:
                  </p>
                  <ul class="mt-4 space-y-3">
                    <li class="flex items-center justify-center text-gray-600">
                      <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Unlimited access to all tools
                    </li>
                    <li class="flex items-center justify-center text-gray-600">
                      <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Support future development
                    </li>
                    <li class="flex items-center justify-center text-gray-600">
                      <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Help keep tools free for everyone
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="mt-8 text-center">
              <p class="text-sm text-gray-500">
                Want to contribute in other ways?
                <a href="#" class="text-violet-600 hover:text-violet-700">Check our GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />

    <PaymentModal :is-open="isPaymentModalOpen" :selected-amount="selectedAmount" @close="isPaymentModalOpen = false" />
  </div>
</template>
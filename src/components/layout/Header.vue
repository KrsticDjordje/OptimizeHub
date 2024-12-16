<template>
  <header class="fixed w-full z-50 transition-all duration-300"
    :class="[scrolled ? 'bg-white shadow-lg' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Header -->
      <div class="flex items-center justify-between h-20 relative z-50">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold" :class="[scrolled && !isMenuOpen ? 'text-gray-900' : 'text-white']">OptimizeHub
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:block">
          <ul class="flex items-center space-x-8">
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href" class="font-medium transition-colors duration-200" :class="[
                scrolled
                  ? 'text-gray-600 hover:text-violet-600'
                  : 'text-white/90 hover:text-white'
              ]">
                {{ item.label }}
              </a>
            </li>
            <li>
              <a href="#tools"
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-white font-medium hover:opacity-90 transition shadow-lg">
                Get Started
              </a>
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden p-2 rounded-lg transition-all duration-300 z-50"
          :class="[isMenuOpen ? 'text-white rotate-90' : scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300"
            :class="{ 'rotate-90': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="md:hidden">
        <transition name="fade">
          <div v-if="isMenuOpen"
            class="fixed inset-0 bg-gradient-to-br from-violet-600/95 via-fuchsia-600/95 to-pink-500/95 backdrop-blur-lg z-40"
            @click="closeMenu">
          </div>
        </transition>

        <!-- Mobile Menu Content -->
        <transition name="slide-down">
          <div v-if="isMenuOpen" class="fixed inset-0 z-40 flex items-center justify-center">
            <div class="w-full max-w-md px-6" @click.stop>
              <nav class="text-center">
                <ul class="space-y-6">
                  <li v-for="item in navItems" :key="item.href">
                    <a :href="item.href"
                      class="block text-2xl font-medium text-white/90 hover:text-white transition-colors duration-200"
                      @click="closeMenu">
                      {{ item.label }}
                    </a>
                  </li>
                  <li class="pt-6">
                    <a href="#tools" @click="closeMenu"
                      class="inline-block px-8 py-4 text-lg rounded-xl bg-white text-violet-600 font-medium hover:bg-white/90 transition shadow-lg">
                      Get Started
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const isMenuOpen = ref(false);

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#about', label: 'About' },
  { href: '#donate', label: 'Donate' }
];

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Sprečava skrolovanje kada je meni otvoren
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Zatvori meni kada se promeni veličina prozora na desktop
const handleResize = () => {
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animacija za hamburger ikonicu */
.rotate-90 {
  transform: rotate(90deg);
}
</style>
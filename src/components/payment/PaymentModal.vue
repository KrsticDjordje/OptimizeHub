<script setup>
import { ref, computed } from 'vue';
import QRCode from 'qrcode.vue';

const props = defineProps({
    isOpen: Boolean,
    selectedAmount: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['close']);
const selectedCurrency = ref('EUR');

const paymentDetails = {
    name: "Đorđe Krstić",
    bank: "Raiffeisen Banka",
    accountNumber: "265-0000007149733-30",
    swift: "RZBSRSBG",
    purpose: "Donation for OptimizeHub"
};

// Kursna lista (približne vrednosti)
const exchangeRates = {
    EUR: 1,
    RSD: 117.5,
    USD: 1.08
};

// Konvertuje iznos iz EUR u izabranu valutu
const convertAmount = (amount, toCurrency) => {
    return (amount * exchangeRates[toCurrency]).toFixed(2);
};

// Formatiranje iznosa za prikaz
const formattedAmount = computed(() => {
    const eur = props.selectedAmount;
    const rsd = convertAmount(eur, 'RSD');
    const usd = convertAmount(eur, 'USD');

    if (selectedCurrency.value === 'EUR') {
        return `€${eur} (≈ ${rsd} RSD)`;
    } else if (selectedCurrency.value === 'RSD') {
        return `${rsd} RSD (≈ €${eur})`;
    } else {
        return `$${usd} (≈ €${eur})`;
    }
});

// Generisanje stringa za QR kod u IPS QR format
const qrValue = computed(() => {
    const amount = Math.round(props.selectedAmount * exchangeRates.RSD);
    return `K:PR|V:01|C:1|R:${paymentDetails.accountNumber}|N:${paymentDetails.name}|I:RSD${amount}|P:${paymentDetails.purpose}|SF:289`;
});

const qrOptions = {
    width: 240,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: {
        dark: '#000',
        light: '#fff'
    }
};
</script>

<template>
    <transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="emit('close')">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            <!-- Modal -->
            <div class="flex min-h-screen items-center justify-center p-4">
                <div class="relative bg-white rounded-2xl shadow-xl max-w-lg w-full" @click.stop>
                    <!-- Close button -->
                    <button @click="emit('close')"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Payment Details</h3>

                        <!-- Amount with Currency Selection -->
                        <div class="bg-violet-50 p-4 rounded-xl mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <div class="text-sm text-violet-600">Selected Amount</div>
                                <select v-model="selectedCurrency"
                                    class="text-sm bg-transparent border-0 text-violet-600 font-medium focus:ring-0 cursor-pointer">
                                    <option value="EUR">EUR</option>
                                    <option value="RSD">RSD</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                            <div class="text-2xl font-bold text-violet-700">{{ formattedAmount }}</div>
                        </div>

                        <!-- Bank Details -->
                        <div class="space-y-4 mb-8">
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Recipient</div>
                                <div class="font-medium">{{ paymentDetails.name }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Bank</div>
                                <div class="font-medium">{{ paymentDetails.bank }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Account Number</div>
                                <div class="font-medium select-all">{{ paymentDetails.accountNumber }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">SWIFT / BIC</div>
                                <div class="font-medium">{{ paymentDetails.swift }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">Purpose</div>
                                <div class="font-medium">{{ paymentDetails.purpose }}</div>
                            </div>
                        </div>

                        <!-- QR Code -->
                        <div class="text-center">
                            <div class="text-sm text-gray-500 mb-4">Scan with Your Banking App</div>
                            <div class="bg-white p-4 rounded-xl inline-block shadow-lg">
                                <QRCode :value="qrValue" :options="qrOptions" class="mx-auto" />
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                Works with all Serbian banking apps (Raiffeisen, Mobi, Intesa, etc.)
                            </p>
                        </div>

                        <!-- Copy Button -->
                        <button @click="navigator.clipboard.writeText(paymentDetails.accountNumber)"
                            class="mt-6 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy Account Number</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
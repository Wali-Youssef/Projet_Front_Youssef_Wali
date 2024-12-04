<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>

<div v-if="error" class="p-error">
    Une erreur s'est produite {{ error.statusCode }}
    <br>
    message: {{ error.statusMessage}}
    <br>
    <button @click="handleError">Retourner a l'accueil</button>
</div>
</template>
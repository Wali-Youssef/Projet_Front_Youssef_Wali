<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'; // Import du formulaire
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref('');

// Fonction pour gérer l'inscription
async function handleRegister(data: { username: string; password: string }) {
  console.log('Données reçues du formulaire:', data);

  try {
    const responseRegister = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Vérifie si la réponse est incorrecte
    if (!responseRegister.ok) {
      throw new Error('Une erreur est survenue lors de l\'inscription.');
    }

    const responseData = await responseRegister.json();
    console.log('Réponse API:', responseData);

    // Rediriger vers la page de connexion ou autre
    await router.push('/login');
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
  }
}
</script>

<template>
  <div class="test">
    <!-- Utilisation du formulaire d'inscription -->
    <RegisterForm @submit="handleRegister" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.test {
    background-image: url('/assets/img/fond.jpg'); 
    background-size: cover; 
    background-repeat: no-repeat; 
    background-position: center; 
    min-height: 100vh; 
  
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

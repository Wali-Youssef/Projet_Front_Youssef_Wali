<script setup lang="ts">
import LoginForm from '@/components/Form.vue'; // Chemin vers ton composant de formulaire
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref('');

async function handleLogin(data: { username: string; password: string }) {
  console.log('Données reçues du formulaire:', data);

  try {
    const responseLogin = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Vérifie si la réponse est incorrecte
    if (!responseLogin.ok) {
      throw new Error('Une erreur est survenue lors de la connexion.');
    }

    const responseData = await responseLogin.json();
    console.log('Réponse API:', responseData);

    // Enregistrer le token dans un cookie ou un autre stockage
    const cookieJwt = useCookie('api_tracking_jwt');
    cookieJwt.value = responseData.token;

    // Rediriger vers le tableau de bord
    await router.push('/app/dashboard');
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
  }
}
</script>

<template>
  <div class="test">


    <LoginForm @submit="handleLogin" />

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

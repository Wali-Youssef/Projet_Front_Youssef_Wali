<script setup lang="ts">
import { ref } from 'vue';

// Définir les props
const props = defineProps({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
});

// Définir l'événement `submit` pour émettre l'événement lors de la soumission
const emit = defineEmits<{ (e: 'submit', data: { username: string; password: string }): void }>();

const username = ref(props.username);
const password = ref(props.password);
const errorMessage = ref('');

function handleSubmit(event: Event) {
  event.preventDefault(); // Empêche le rechargement de la page
  console.log('Login form has been submitted');
  console.log('Username:', username.value);
  console.log('Password:', password.value);

  // Émettre l'événement de soumission
  emit('submit', { username: username.value, password: password.value });
}
</script>

<template>
  <div class="form-container">
    <form class="form" @submit.prevent="handleSubmit">
      <!-- Titre -->
      <h2 class="form__title">Connexion</h2>

      <div class="form__group">
        <label for="username" class="form__label">Nom d'utilisateur</label>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          placeholder="Entrez votre nom d'utilisateur"
          class="form__input"
          required
        >
      </div>

      <div class="form__group">
        <label for="password" class="form__label">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          class="form__input"
          required
        >
      </div>

      <div class="form__actions">
        <MyButton :variant="'primary'" :disabled="false">Se connecter</MyButton>
        <p v-if="errorMessage" class="form__error-message">{{ errorMessage }}</p>
        <p class="form__register-link">
          Vous n'avez pas de compte ?
          <NuxtLink to="/register" class="form__link">S'inscrire</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form__group {
  margin-bottom: 1.5rem;
}

.form__label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.form__input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form__register-link {
  font-size: 0.875rem;
  text-align: center;
}

.form__link {
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.form__error-message {
  color: red;
  font-size: 0.875rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .form {
    padding: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .form {
    padding: 1rem;
    width: 90%;
  }

  .form__input {
    padding: 0.5rem;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import Mybutton from './Button.vue';

const email = ref('');
const password = ref('');

function handleSubmit() {
    alert(email.value + " " + password.value);
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form__group">
                <label for="email" class="form__label">Email</label>
                <input type="email" name="email" v-model="email" placeholder="Entrez votre email" class="form__input"/>
            </div>
            <div class="form__group">
                <label for="password" class="form__label">Mot de passe</label>
                <input type="password" name="password" v-model="password" placeholder="Entrez votre mot de passe" class="form__input"/>
            </div>
            <div class="form__actions">
                <!-- Utilisation du bouton avec les props -->
                <Mybutton :variant="'primary'" :disabled="false">Se connecter</Mybutton>
                <p class="form__register-link">Vous n'avez pas de compte ? <a href="#" class="form__link">S'inscrire</a></p>
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
    background: url('../assets/img/dubai.png') no-repeat center center fixed;
    background-size: cover;
}

.form {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

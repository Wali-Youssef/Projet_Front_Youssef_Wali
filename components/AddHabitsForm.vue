<script setup lang="ts">
const response = await fetch('http://localhost:4000/dashboard', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
  },
});

const emit = defineEmits(['habit:created'])

const data = await response.json();

const newHabitTitle = ref('');
const newHabitDescription = ref('');
const message = ref('');

const addHabit = async () => {
  if (!newHabitTitle.value || !newHabitDescription.value) {
    message.value = 'Veuillez remplir tous les champs.';
    return;
  }

  const habitResponse = await fetch('http://localhost:4000/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
    },
    body: JSON.stringify({
      title: newHabitTitle.value,
      description: newHabitDescription.value,
    }),
  });

  if (habitResponse.ok) {
    const newHabit = await habitResponse.json();
    data.personalHabits.push(newHabit);
    message.value = 'Nouvelle habitude ajoutée avec succès !';
    newHabitTitle.value = '';
    emit('habit:created')
    newHabitDescription.value = '';
  } else {
    message.value = "Erreur lors de l'ajout de l'habitude.";
  }
};
</script>

<template>
  <div class="add-habit-form">
    <h2 class="add-habit-form__title">Ajouter une nouvelle habitude</h2>
    <form @submit.prevent="addHabit">
      <div class="add-habit-form__group">
        <label for="title" class="add-habit-form__label">Titre de l'habitude :</label>
        <input id="title" v-model="newHabitTitle" type="text" class="add-habit-form__input">
      </div>

      <div class="add-habit-form__group">
        <label for="description" class="add-habit-form__label">Description :</label>
        <input id="description" v-model="newHabitDescription" type="text" class="add-habit-form__input">
      </div>

      <button type="submit" class="add-habit-form__button" :disabled="!newHabitTitle || !newHabitDescription">Ajouter</button>
    </form>

    <p v-if="message" :class="['add-habit-form__message', message.includes('Erreur') ? 'add-habit-form__message--error' : 'add-habit-form__message--success']">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>


// Styles globaux
body {
  font-family: $font-family;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}

// Bloc : add-habit-form
.add-habit-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: $spacing-unit;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: $spacing-unit;
    color: $primary-color;
    text-align: center;
  }

  &__group {
    margin-bottom: $spacing-unit * 1.5;

    &:last-of-type {
      margin-bottom: $spacing-unit;
    }
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }

  &__input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid $input-border-color;
    border-radius: 4px;
    background-color: #fdfdfd;
    transition: border-color 0.3s;

    &:focus {
      border-color: $primary-color;
      outline: none;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }
  }

  &__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: $button-hover-color;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__message {
    margin-top: $spacing-unit;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;

    &--error {
      background-color: lighten($error-color, 40%);
      color: $error-color;
      border: 1px solid $error-color;
    }

    &--success {
      background-color: lighten($success-color, 40%);
      color: $success-color;
      border: 1px solid $success-color;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .add-habit-form {
    padding: $spacing-unit / 2;

    &__title {
      font-size: 1.25rem;
    }
  }
}


</style>
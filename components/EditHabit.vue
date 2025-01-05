<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  habit: {
    type: Object as () => { id: number; title: string; description: string },
    required: true,
  },
});

const emit = defineEmits(['habit:modified']);

const updatedHabitTitle = ref('');
const updatedHabitDescription = ref('');

watch(
  () => props.habit,
  (newValue) => {
    if (newValue) {
      updatedHabitTitle.value = newValue.title;
      updatedHabitDescription.value = newValue.description;
    }
  },
  { immediate: true } 
);

const message = ref('');

const modifyHabit = async () => {
  if (!updatedHabitTitle.value || !updatedHabitDescription.value) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const response = await fetch(`http://localhost:4000/habits/${props.habit.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
    },
    body: JSON.stringify({
      title: updatedHabitTitle.value,
      description: updatedHabitDescription.value,
    }),
  });

  if (response.ok) {
    message.value = ('Habitude modifiée avec succès.');
    emit('habit:modified'); 
  } else {
    message.value =("Erreur lors de la modification de l'habitude.");
  }
};
</script>

<template>
  <div class="habit-modify">
    <h2 class="habit-modify__title">Modifier l'habitude</h2>
    <form class="habit-modify__form" @submit.prevent="modifyHabit">
      <div class="habit-modify__field">
        <label for="title" class="habit-modify__label">Titre de l'habitude :</label>
        <input id="title" v-model="updatedHabitTitle" type="text" class="habit-modify__input" >
      </div>

      <div class="habit-modify__field">
        <label for="description" class="habit-modify__label">Description :</label>
        <input id="description" v-model="updatedHabitDescription" type="text" class="habit-modify__input" >
      </div>

      <button type="submit" class="habit-modify__button">Modifier</button>
    </form>
    <p class="habit-modify__message">{{ message }}</p>
  </div>
</template>

<style lang ="scss" scoped>

// Styles globaux
body {
  font-family: $font-family;
  background-color: #f3f4f6;
  color: #333;
  margin: 0;
  padding: 0;
}

// Bloc : habit-modify
.habit-modify {
  max-width: 450px;
  margin: 2rem auto;
  padding: $spacing-unit;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: $spacing-unit * 1.5;
    text-align: center;
    color: $primary-color;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-weight: 600;
    color: #555;
  }

  &__input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid $input-border-color;
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      border-color: $primary-color;
      outline: none;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }
  }

  &__button {
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $button-hover-color;
    }

    &:disabled {
      background-color: lighten($primary-color, 20%);
      cursor: not-allowed;
    }
  }

  &__message {
    margin-top: $spacing-unit;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;

    &--success {
      color: $success-color;
      background-color: lighten($success-color, 40%);
      border: 1px solid $success-color;
    }

    &--error {
      color: $error-color;
      background-color: lighten($error-color, 40%);
      border: 1px solid $error-color;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .habit-modify {
    padding: $spacing-unit / 2;

    &__title {
      font-size: 1.5rem;
    }

    &__button {
      font-size: 0.9rem;
    }
  }
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

// Définir les props et émettre les événements
const props = defineProps({
  habit: {
    type: Object as () => { id: number; title: string; description: string },
    required: true,
  }
});

// Définir les événements émis, y compris 'cancel-delete'
const emit = defineEmits(['habit:deleted', 'cancel-delete']);

const message = ref('');

// Fonction pour confirmer la suppression
const confirmDelete = async () => {
  const response = await fetch(`http://localhost:4000/habits/${props.habit.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
    },
  });

  if (response.ok) {
    message.value = 'Habitude supprimée avec succès.';
    emit('habit:deleted'); // Émettre l'événement de suppression
  } else {
    message.value = "Erreur lors de la suppression de l'habitude.";
  }
};

// Fonction pour annuler la suppression
const cancelDelete = () => {
  emit('cancel-delete'); // Émettre l'événement d'annulation
};
</script>

<template>
  <div class="confirmation">
    <h3 class="confirmation__title">Confirmer la suppression</h3>
    <p class="confirmation__text">
      Êtes-vous sûr de vouloir supprimer l'habitude : 
      <strong class="confirmation__text--highlight">{{ habit.title }}</strong> ?
    </p>
    <div class="confirmation__actions">
      <button class="confirmation__button confirmation__button--confirm" @click="confirmDelete">Confirmer</button>
      <button class="confirmation__button confirmation__button--cancel" @click="cancelDelete">Annuler</button>
    </div>
    <p class="confirmation__message">{{ message }}</p>
  </div>
</template>
<style lang="scss">




// Bloc : confirmation
.confirmation {
  max-width: 400px;
  margin: 2rem auto;
  padding: $spacing-unit;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: $spacing-unit;
    color: $neutral-color;
  }

  &__text {
    font-size: 1rem;
    color: $neutral-color;
    margin-bottom: $spacing-unit * 1.5;

    &--highlight {
      color: $danger-color;
      font-weight: bold;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: $spacing-unit;

    &__button {
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &--confirm {
        background-color: $danger-color;
        color: #fff;

        &:hover {
          background-color: darken($danger-color, 10%);
        }
      }

      &--cancel {
        background-color: $primary-color;
        color: #fff;

        &:hover {
          background-color: $button-hover-color;
        }
      }
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
      color: $danger-color;
      background-color: lighten($danger-color, 40%);
      border: 1px solid $danger-color;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .confirmation {
    padding: $spacing-unit / 2;

    &__title {
      font-size: 1.25rem;
    }

    &__actions__button {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
  }
}
  
</style>


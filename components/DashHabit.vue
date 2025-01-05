<script lang="ts" setup>
import { ref } from 'vue';

// Interface pour l'objet Habit
interface Habit {
  id: number; // ou string, selon ton modèle
  title: string;
  description: string;
}

const { data, refresh } = await useAsyncData('dashboard', async () => {
  const response = await fetch('http://localhost:4000/dashboard', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
    },
  });

  return await response.json();
});

const habitToEdit = ref<Habit | null>(null);
const habitToDelete = ref<Habit | null>(null);
const message = ref('');

// Fonction modifiée avec le type Habit
const toggleEditHabit = (habit: Habit) => {
  if (habitToEdit.value?.id === habit.id) {
    habitToEdit.value = null;
  } else {
    habitToEdit.value = habit;
  }
};

function onHabitCreated() {
  refresh();
}

function onHabitModified() {
  refresh();
  habitToEdit.value = null; 
}

function onHabitDeleted() {
  refresh();
  habitToDelete.value = null;
}

const resetActions = () => {
  habitToEdit.value = null;
  habitToDelete.value = null;
};
</script>


<template>
  <div class="dashboard"> 
    <h1 class="dashboard__title">Mon dashboard</h1>

    <h2>Habitudes Personnelles</h2>
    <ul class="dashboard__habit-list">
      <li 
        v-for="(habit, index) in data.personalHabits" 
        :key="index" 
        class="dashboard__habit-list__item"
      >
        <span class="dashboard__habit-list__item__title">{{ habit.title }}</span>
        <span class="dashboard__habit-list__item__description">{{ habit.description }}</span>

        <button 
          class="dashboard__habit-list__item__button dashboard__habit-list__item__button--delete" 
          @click="resetActions(); habitToDelete = habit"
        >
          Supprimer
        </button>

        <button 
          class="dashboard__habit-list__item__button dashboard__habit-list__item__button--edit" 
          @click="toggleEditHabit(habit)"
        >
          {{ habitToEdit?.id === habit.id ? 'Annuler' : 'Modifier' }}
        </button>
      </li>
    </ul>

    <DeleteHabit
      v-if="habitToDelete"
      :habit="habitToDelete"
      class="dashboard__form dashboard__form--delete"
      @habit:deleted="onHabitDeleted"
      @cancel-delete="habitToDelete = null"
    />

    <EditHabit
      v-if="habitToEdit"
      :habit="habitToEdit"
      class="dashboard__form dashboard__form--edit"
      @habit:modified="onHabitModified"
    />

    <AddHabitsForm @habit:created="onHabitCreated" />

    <p class="dashboard__message">{{ message }}</p>

    <TrackingHabit 
    />
  </div>
</template>

<style lang="scss">
// Dashboard styles using BEM methodology
.dashboard {
  // Block styles
  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
  }

  &__habit-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__item {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      &__title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #444;
      }

      &__description {
        font-size: 1rem;
        color: #666;
      }

      &__button {
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &--delete {
          background-color: #ff4d4d;
          color: #fff;

          &:hover {
            background-color: #e60000;
          }
        }

        &--edit {
          background-color: #4caf50;
          color: #fff;

          &:hover {
            background-color: #388e3c;
          }
        }
      }
    }
  }

  &__form {
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;

    &--delete {
      border-color: #ff4d4d;
    }

    &--edit {
      border-color: #4caf50;
    }
  }

  &__message {
    margin-top: 2rem;
    font-size: 1rem;
    color: #444;
    text-align: center;
  }
}


</style>
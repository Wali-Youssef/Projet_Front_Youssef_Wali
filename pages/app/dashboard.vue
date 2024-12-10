<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Champs réactifs pour stocker les données du tableau de bord
const data = ref({
  username: '',
  globalHabits: [] as { id: string; title: string; description: string }[],
  personalHabits: [] as { id: string; title: string; description: string }[],
});

// Champs réactifs pour le formulaire d'ajout
const newHabitTitle = ref('');
const newHabitDescription = ref('');
const formErrorMessage = ref('');

// Fonction pour charger les données du tableau de bord
const fetchDashboardData = async () => {
  try {
    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du tableau de bord');
    }

    data.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Fonction pour ajouter une nouvelle habitude
const handleAddHabit = async () => {
  formErrorMessage.value = '';

  if (!newHabitTitle.value.trim()) {
    formErrorMessage.value = 'Le titre est obligatoire.';
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
      body: JSON.stringify({
        title: newHabitTitle.value,
        description: newHabitDescription.value || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l’ajout de l’habitude.');
    }

    newHabitTitle.value = '';
    newHabitDescription.value = '';
    await fetchDashboardData();
  } catch (error: any) {
    console.error('Erreur:', error.message);
    formErrorMessage.value = 'Impossible d’ajouter une nouvelle habitude.';
  }
};

// Fonction pour supprimer une habitude
const deleteHabit = async (habitId: string) => {
  try {
    const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l’habitude');
    }

    await fetchDashboardData();
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Charger les données au montage du composant
onMounted(fetchDashboardData);
</script>

<template>
  <div class="dashboard-container">
    <h1>Mon tableau de bord</h1>

    <!-- Formulaire pour ajouter une habitude -->
    <div class="habit-form-container">
      <h2>Ajouter une nouvelle habitude</h2>

      <form @submit.prevent="handleAddHabit" class="habit-form">
        <div class="form-group">
          <label for="newHabitTitle">Titre de l'habitude</label>
          <input
            id="newHabitTitle"
            v-model="newHabitTitle"
            type="text"
            placeholder="Ex: Lecture quotidienne"
            required
          />
        </div>

        <div class="form-group">
          <label for="newHabitDescription">Description (optionnel)</label>
          <textarea
            id="newHabitDescription"
            v-model="newHabitDescription"
            placeholder="Décrivez votre habitude en détail"
          ></textarea>
        </div>

        <div v-if="formErrorMessage" class="error-message">
          {{ formErrorMessage }}
        </div>

        <button type="submit" class="submit-btn">Ajouter l'habitude</button>
      </form>
    </div>

    <!-- Habitudes globales -->
    <div class="habits-section">
      <h2>Habitudes globales</h2>
      <ul v-if="data.globalHabits.length">
        <li v-for="habit in data.globalHabits" :key="habit.id">
          {{ habit.title }} : {{ habit.description || 'Pas de description' }}
        </li>
      </ul>
      <p v-else>Aucune habitude globale disponible.</p>
    </div>

    <!-- Habitudes personnelles -->
    <div class="habits-section">
      <h2>Mes habitudes personnelles</h2>
      <ul v-if="data.personalHabits.length">
        <li v-for="habit in data.personalHabits" :key="habit.id" class="personal-habit-item">
          <div>
            <strong>{{ habit.title }}</strong>: {{ habit.description || 'Pas de description' }}
          </div>
          <button @click="deleteHabit(habit.id)" class="delete-btn">Supprimer</button>
        </li>
      </ul>
      <p v-else>Vous n'avez pas encore d'habitudes personnelles.</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.habits-section {
  margin-top: 20px;
}

.habit-form-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.habit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.personal-habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 4px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>

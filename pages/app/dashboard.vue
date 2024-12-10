<script setup lang="ts">
import { ref } from 'vue'

// Interfaces
interface Habit {
  id: number
  title: string
  description?: string
}

interface DashboardData {
  username: string
  globalHabits: Habit[]
  personalHabits: Habit[]
}

// Récupération des données avec useAsyncData
const { data, refresh } = await useAsyncData('dashboard', async () => {
  const jwt = useCookie('api_tracking_jwt').value
  if (!jwt) throw new Error('Token JWT manquant')

  const response = await fetch('http://localhost:4000/dashboard', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  if (!response.ok) throw new Error('Erreur lors du chargement du dashboard')

  return await response.json() as DashboardData
})

// État pour le formulaire d'ajout d'habitude
const title = ref('')
const description = ref('')
const error = ref('')

// Fonction pour AJOUTER une habitude
const addHabit = async () => {
  error.value = ''

  if (!title.value) {
    error.value = 'Le titre est requis'
    return
  }

  try {
    const jwt = useCookie('api_tracking_jwt').value
    if (!jwt) throw new Error('Token JWT manquant')

    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la création de l\'habitude')
    }

    // Réinitialiser le formulaire et rafraîchir les données
    title.value = ''
    description.value = ''
    await refresh()
  } catch (err) {
    error.value = (err as Error).message
  }
}

// Fonction pour SUPPRIMER une habitude
const deleteHabit = async (habitId: number) => {
  try {
    const jwt = useCookie('api_tracking_jwt').value
    if (!jwt) throw new Error('Token JWT manquant')

    const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'habitude')
    }

    await refresh()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// État pour l'édition d'habitude
const editingHabit = ref<Habit | null>(null)

// Fonction pour commencer l'édition
const startEditHabit = (habit: Habit) => {
  editingHabit.value = { ...habit }
}

// Fonction pour mettre à jour une habitude
const updateHabit = async () => {
  if (!editingHabit.value) {
    alert('Aucune habitude à mettre à jour.')
    return
  }

  if (!editingHabit.value.title) {
    alert('Le titre est requis')
    return
  }

  try {
    const jwt = useCookie('api_tracking_jwt').value
    if (!jwt) throw new Error('Token JWT manquant')

    const response = await fetch(`http://localhost:4000/habits/${editingHabit.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        title: editingHabit.value.title,
        description: editingHabit.value.description
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'habitude')
    }

    editingHabit.value = null
    await refresh()
  } catch (error) {
    console.error('Erreur:', error)
    alert((error as Error).message)
  }
}

// Fonction pour FAIRE une habitude
const trackHabit = async (habitId: number, completed: boolean) => {
  try {
    const jwt = useCookie('api_tracking_jwt').value
    if (!jwt) throw new Error('Token JWT manquant')

    const response = await fetch(`http://localhost:4000/tracking/${habitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        completed: completed,
        date: new Date().toISOString().split('T')[0]
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors du tracking de l\'habitude')
    }

    await refresh()
  } catch (error) {
    console.error('Erreur:', error)
    alert((error as Error).message)
  }
}
</script>

<template>
  <div class="dashboard-container">
    <h1>Mon dashboard</h1>

    <!-- Formulaire d'AJOUT d'habitude -->
    <div class="habit-form-container">
      <h2>Ajouter une nouvelle habitude</h2>
      <form class="habit-form" @submit.prevent="addHabit">
        <div class="form-group">
          <label for="title">Titre de l'habitude</label>
          <input 
            id="title" 
            v-model="title" 
            type="text" 
            placeholder="Ex: Lecture quotidienne" 
            required
          >
        </div>
        <div class="form-group">
          <label for="description">Description (optionnel)</label>
          <textarea 
            id="description" 
            v-model="description" 
            placeholder="Décrivez votre habitude en détail"
          />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" class="submit-btn">Ajouter l'habitude</button>
      </form>
    </div>

    <!-- Habitudes globales -->
    <div class="habits-section">
      <h2>Habitudes globales</h2>
      <ul v-if="data?.globalHabits?.length">
        <li v-for="habit in data.globalHabits" :key="habit.id">
          {{ habit.title }} : {{ habit.description }}
        </li>
      </ul>
      <p v-else>Aucune habitude globale disponible</p>
    </div>

    <!-- Habitudes personnelles -->
    <div class="habits-section">
      <h2>Mes habitudes personnelles</h2>
      <ul v-if="data?.personalHabits?.length">
        <li 
          v-for="habit in data.personalHabits" 
          :key="habit.id" 
          class="personal-habit-item"
        >
          <template v-if="editingHabit && editingHabit.id === habit.id">
            <div class="edit-form">
              <input 
                v-model="editingHabit.title" 
                placeholder="Titre" 
                required
              >
              <textarea 
                v-model="editingHabit.description" 
                placeholder="Description"
              />
              <div class="edit-buttons">
                <button 
                  class="save-btn" 
                  @click="updateHabit"
                >
                  Enregistrer
                </button>
                <button 
                  class="cancel-btn" 
                  @click="editingHabit = null"
                >
                  Annuler
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="habit-details">
              <span>
                {{ habit.title }} : {{ habit.description }}
              </span>
              <div class="habit-actions">
                <button 
                  class="track-btn track-success" 
                  @click="trackHabit(habit.id, true)"
                >
                  ✓ Terminé
                </button>
                <button 
                  class="track-btn track-fail" 
                  @click="trackHabit(habit.id, false)"
                >
                  ✗ Non fait
                </button>
                <button 
                  class="edit-btn" 
                  @click="startEditHabit(habit)"
                >
                  Modifier
                </button>
                <button 
                  class="delete-btn" 
                  @click="deleteHabit(habit.id)"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </template>
        </li>
      </ul>
      <p v-else>Vous n'avez pas encore d'habitudes personnelles</p>
    </div>
  </div>
</template>



<style scoped lang="scss">
$primary-color: #4A90E2;
$secondary-color: #F5A623;
$bg-color: #F2F2F2;
$light-color: #E1E1E1;
$error-color: #E74C3C;
$success-color: #2ECC71;
$white: #FFFFFF;
$dark-color: #333333;

.dashboard-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 40px;
  background-color: $bg-color;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.habits-section {
  margin-top: 40px;
}

.habit-form-container {
  background-color: $white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  h2 {
    color: $primary-color;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
}

.habit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  font-weight: 600;
  color: $dark-color;
  margin-bottom: 10px;
}

input, textarea {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid $light-color;
  border-radius: 8px;
  background-color: $white;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: $primary-color;
    outline: none;
  }
}

.submit-btn {
  background-color: $primary-color;
  color: $white;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.error-message {
  color: $error-color;
  margin-bottom: 20px;
  font-size: 0.875rem;
}

.personal-habit-item {
  background-color: $white;
  margin-bottom: 18px;
  border-radius: 8px;
  padding: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.habit-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habit-actions {
  display: flex;
  gap: 12px;
}

.track-btn, .edit-btn, .delete-btn {
  padding: 8px 16px;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.track-success {
  background-color: $success-color;
  color: $white;

  &:hover {
    background-color: lighten($success-color, 10%);
  }
}

.track-fail {
  background-color: $error-color;
  color: $white;

  &:hover {
    background-color: lighten($error-color, 10%);
  }
}

.edit-btn {
  background-color: $primary-color;
  color: $white;

  &:hover {
    background-color: lighten($primary-color, 10%);
  }
}

.delete-btn {
  background-color: $error-color;
  color: $white;

  &:hover {
    background-color: lighten($error-color, 10%);
  }
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.edit-buttons {
  display: flex;
  gap: 15px;
}

.save-btn {
  background-color: $success-color;
  color: $white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: lighten($success-color, 10%);
  }
}

.cancel-btn {
  background-color: $error-color;
  color: $white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: lighten($error-color, 10%);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 20px;
  }

  .habit-form-container {
    padding: 20px;
  }

  .habit-form {
    flex-direction: column;
  }

  .habit-actions {
    flex-direction: column;
    gap: 10px;
  }

  .track-btn, .edit-btn, .delete-btn {
    width: 100%;
  }
}



</style>

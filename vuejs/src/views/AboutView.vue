<script setup lang="ts">
import Form from '@/components/form.vue';
</script>

<template>
  <div class="test">
    
    
    <Form/>
  </div>
</template>

<style scoped lang="scss">
/* Appliquer une image de fond à la classe "test" */
.test {
  background-image: url('/src/assets/img/fond.jpg'); /* Remplacez par le chemin de votre image */
  background-size: cover; /* L'image couvre toute la zone */
  background-repeat: no-repeat; /* Pas de répétition de l'image */
  background-position: center; /* Centrer l'image */
  min-height: 100vh; /* La hauteur minimale est celle de la fenêtre */

  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

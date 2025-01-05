<script setup lang="ts">
const props = defineProps<{
  features: Array<{ image?: { asset?: { url: string } }; text?: string }>;
}>();

// Gestion des données par défaut
const features = props.features || [];
</script>

<template>
  <div class="features">
    <h2 class="features__title">Fonctionnalités</h2>
    <ul class="features__list">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="features__item"
      >
        <div v-if="feature.image?.asset?.url" class="features__image">
          <img :src="feature.image.asset.url" alt="Feature Image" >
        </div>
        <div v-if="feature.text" class="features__text">
          {{ feature.text }}
        </div>
      </li>
    </ul>
  </div>
</template>
  

<style scoped lang="scss">
.features {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;

  &__title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  &__list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }

    &__image {
      width: 100%;
      height: 200px; /* Hauteur fixe pour toutes les images */
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* L'image remplira le conteneur sans déformation */
        object-position: center; /* Centrer l'image si elle ne couvre pas tout */
      }
    }

    &__text {
      padding: 20px;
      font-size: 1.1rem;
      color: #555;
      font-weight: 400;
      line-height: 1.6;
    }
  }
}

</style>

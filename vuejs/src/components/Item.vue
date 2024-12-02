<script lang="ts" setup>
defineProps<{
  name: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  description: string;
}>();

// Définir l'émission pour le bouton "Ajouter au panier"
const emit = defineEmits<{
  (e: 'addToCart'): void;
}>();

const handleAddToCart = () => {
  emit('addToCart');  // Émet l'événement 'addToCart' lors du clic sur le bouton
};
</script>

<template>
  <div class="c-item">
    <img class="c-itemimage -blue" :src="image.url" :alt="image.alt"/>
    <p class="c-itemtitle">{{ name }}</p>
    <p>{{ description }}</p>
    <p>{{ price }} €</p>
    <button @click="handleAddToCart" class="button c-itembutton">Ajouter au panier</button>
  </div>
</template>

<style lang="scss">
$c-gray100: #d3d3d3;
$c-gray800: #333;
$c-primaryColor: #007bff;
$c-gray400: #e0e0e0;
$c-blue: #007bff;

.c-item {
  padding: 16px;
  border: 1px solid $c-gray100;

  &:hover {
    .c-itemtitle {
      color: $c-primaryColor;
    }
  }

  .c-itemtitle {
    font-size: 24px;
    color: $c-gray800;
  }

  .c-itemimage {
    border-bottom: 4px solid $c-gray400;
  }

  .c-itembutton {
    margin-top: 16px;
    background-color: $c-blue;
    border-color: $c-blue;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: darken($c-blue, 10%);
    }
  }
}
</style>

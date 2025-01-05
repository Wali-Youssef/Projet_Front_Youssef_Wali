<script setup lang="ts">
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const props = defineProps<{
  title: string;
  text: string;
  image: SanityImageSource;
  stats: { value: string; text: string }[];
}>();

const { urlFor } = useSanityImage();
</script>

<template>
  <div class="hero" :style="{ backgroundImage: `url(${urlFor(props.image)?.url()})` }">
    <div class="hero__overlay">
      <h1 class="hero__title">{{ props.title }}</h1>
      <p class="hero__text">{{ props.text }}</p>
      <div class="hero__stats">
        <div
          v-for="(stat, index) in props.stats"
          :key="index"
          class="hero__stat"
        >
          <span class="hero__stat-value">{{ stat.value }}</span>
          <span class="hero__stat-text">{{ stat.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 90vh;
  background-size: cover;
  background-position: center;

  &__overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 2rem;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1rem;
    font-weight: bold;
  }

  &__text {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin-bottom: 2rem;
  }

  &__stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  &__stat {
    background-color: rgba(255, 255, 255, 0.8);
    padding: clamp(1rem, 2vw, 1.5rem);
    border-radius: 5px;
    color: #333;
    width: calc(50% - 1rem);
    text-align: center;
    margin: 0.5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
      width: calc(50% - 1rem);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  &__stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: black;
  }

  &__stat-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 1024px) {
  .hero {
    padding: 3rem 2rem;
  }

  .hero__title {
    font-size: 2.5rem;
  }

  .hero__text {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 2rem 1rem;
  }

  .hero__title {
    font-size: 2rem;
  }

  .hero__text {
    font-size: 1.2rem;
  }
}
</style>

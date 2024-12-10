<script setup lang="ts">
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


const props = defineProps<{ 
    title: string,
    text: string,
    image: SanityImageSource,
    stats: { value: string, text: string }[] 
}>();
  
const { urlFor } = useSanityImage();
</script>

<template>
  <div class="hero" :style="{ backgroundImage: `url(${urlFor(props.image)?.url()})` }">
    <div class="hero-overlay">
      <h1 class="hero-title">{{ props.title }}</h1>
      <p class="hero-text">{{ props.text }}</p>
      <div class="hero-stats">
        <div
          v-for="(stat, index) in props.stats"
          :key="index"
          class="hero-stat"
        >
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-text">{{ stat.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  height: 80vh;
  background-size: cover;
  background-position: center;

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 2rem;
  }

  .hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .hero-text {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;

    .hero-stat {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 1rem;
      border-radius: 5px;
      color: #333;
      width: 180px;
      text-align: center;

      .stat-value {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .stat-text {
        font-size: 1rem;
      }
    }
  }
}
</style>



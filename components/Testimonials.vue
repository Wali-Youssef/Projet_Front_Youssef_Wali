<script setup lang="ts">
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const props = defineProps<{
  testimonials: {
    name: string;
    role?: string;
    text: string;
    image: SanityImageSource;
  }[];
}>();

const { urlFor } = useSanityImage();
</script>

<template>
  <section class="testimonials">
    <div class="testimonials__header">
      <h2 class="testimonials__title">Ce que disent nos clients</h2>
      <p class="testimonials__subtitle">
        Découvrez les retours de nos clients satisfaits.
      </p>
    </div>
    <div class="testimonials__container">
      <div
        v-for="(testimonial, index) in props.testimonials"
        :key="index"
        class="testimonial"
      >
        <img
          v-if="testimonial.image"
          :src="urlFor(testimonial.image)?.url()"
          alt="Image de {{ testimonial.name }}"
          class="testimonial__image"
        />
        <div class="testimonial__content">
          <h3 class="testimonial__name">{{ testimonial.name }}</h3>
          <p v-if="testimonial.role" class="testimonial__role">{{ testimonial.role }}</p>
          <p class="testimonial__text">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  padding: 3rem 1rem;
  background-color: #f9f9f9;
  text-align: center;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  .testimonial {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    text-align: center;
    max-width: 300px;

    &__image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 1rem;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__name {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    &__role {
      font-size: 1rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    &__text {
      font-size: 0.9rem;
      color: #333;
      font-style: italic;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    &__container {
      flex-direction: column;
      align-items: center;
    }

    .testimonial {
      max-width: 90%;
    }
  }
}
</style>

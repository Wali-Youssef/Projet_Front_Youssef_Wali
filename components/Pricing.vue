<script setup lang="ts">
const _props = defineProps<{
  pricing: Array<{
    name: string;
    price: number;
    features: string[];
    cta: string;
  }> ;
}>();
</script>


<template>
  <div class="pricing">
    <h2 class="pricing__title">LES PRIX</h2>
    <div class="pricing__plans">
      <div
        v-for="(plan, index) in pricing"
        :key="index"
        class="pricing__plan"
      >
        <h3 class="pricing__plan-name">{{ plan.name }}</h3>
        <p class="pricing__plan-price">${{ plan.price.toFixed(2) }}</p>
        <ul class="pricing__plan-features">
          <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex">
            {{ feature }}
          </li>
        </ul>
        <button class="pricing__plan-cta">{{ plan.cta }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pricing {
  text-align: center;
  padding: 40px 20px;
  background-color: #f5f5f5;

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
  }

  &__plans {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__plan {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    &-name {
      font-size: 1.8rem;
      font-weight: bold;
      color: #444;
      margin-bottom: 10px;
    }

    &-price {
      font-size: 2rem;
      font-weight: bold;
      color: #ff6f61;
      margin-bottom: 15px;
    }

    &-features {
      list-style: none;
      padding: 0;
      margin: 0 0 20px;

      li {
        font-size: 1rem;
        color: #555;
        margin-bottom: 8px;
      }
    }

    &-cta {
      background-color: #ff6f61;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e65a50;
      }
    }
  }
}
</style>

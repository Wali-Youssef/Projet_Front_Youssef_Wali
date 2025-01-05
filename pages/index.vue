<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { data: homepageData } = await useSanityQuery<SanityDocument>(groq`
  *[_type == "homepage"][0] {
    title,
    hero {
      title,
      text,
      image {
        asset->{
          _id,
          url
        }
      },
      stats[] {
        value,
        text
      }
    },
    features[] {
      image {
        asset->{
          _id,
          url
        }
      },
      text
    },
    pricing[] {
      name,
      price,
      features,
      cta
    },
    testimonials[] {
      name,
      role,
      text,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`);
</script>

<template>
  <div class="homepage">
    <!-- Composant Hero -->
    <Hero
      :title="homepageData?.hero.title"
      :text="homepageData?.hero.text"
      :image="homepageData?.hero.image"
      :stats="homepageData?.hero.stats"
    />

    <!-- Composant Features -->
    <Features :features="homepageData?.features" />

    <!-- Composant Pricing -->
    <Pricing :pricing="homepageData?.pricing" />

    <!-- Composant Testimonials -->
    <Testimonials :testimonials="homepageData?.testimonials" />
  </div>
</template>

<style scoped lang="scss">
.homepage {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;

  .page-title {
    font-size: 2.2rem;
    color: #333;
    text-align: center;
    font-weight: bold;
    margin-top: 2rem;
  }
}
</style>

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
    }
  }
`);
</script>

<template>
  <div class="homepage">
    <!-- Appel du composant Hero avec les données récupérées -->
    <Hero
      :title="homepageData?.hero.title"
      :text="homepageData?.hero.text"
      :image="homepageData?.hero.image"
      :stats="homepageData?.hero.stats"
    />
    <h2 class="page-title">{{ homepageData?.title }}</h2>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;

  .page-title {
    font-size: 2.2rem;
    color: #333;
    text-align: center;
    font-weight: bold;
    margin-top: 2rem;
  }
}
</style>

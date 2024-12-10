<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";




// Inclure un tableau de catégories dans la requête
const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    image,
    body,
    "categories": categories[]->title // Récupérer toutes les catégories associées
  }
`;

const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, { slug: route.params.slug });


if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
const {urlFor}  = useSanityImage()

    useSeoMeta({
  title: `${post.value.title} | Tracking app`,
  description: 'retrouver nos notes de mises à jour et nos dernieres actualités',
  ogTitle: 'un titre spécifique pour les balises opengraphe',
  ogDescription: 'une descripton speécifique pour chaque balises',
  ogImage: post.value.image && urlFor(post.value.image) ? urlFor(post.value.image)?.url() : '/foot5logo.png'
});


</script>




<template>
  <div v-if="post" class="p-blog-slug">
    <h1>{{ post.title }}</h1>
    
    <!-- Afficher les catégories -->
    <div class="p-blog-categories">
      <span v-for="(category, index) in post.categories" :key="index" class="p-blog-category">
        {{ category }}
      </span>
    </div>

    <div class="p-blog-slug_image">
      <SanityImage v-if="post.image" :asset-id="post.image.asset._ref" />
    </div>

    <SanityContent v-bind="{ blocks: post.body }" />
  </div>
</template>

<style lang="scss">

.p-blog-categories {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.p-blog-category {
  background-color: #f0f0f0;
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.p-blog-category:hover {
  background-color: #ddd;
  color: #000;
}

</style>
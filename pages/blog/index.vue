<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();


const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>


<template>
    <div class="p-blog">

        une page de listing
<div>
    <ul>

        <li v-for="(post, index) in posts" :key="index">
            <NuxtLink :to="`/blog/${post.slug.current}`">
                {{ post.title }}
            </NuxtLink>
            <img v-if="post.image" class="p-blog__item-image" :src="urlFor(post.image)?.url()" alt="post.title" >
        </li>
    </ul>
    </div>
</div>
</template>

<style lang="scss" >
</style>
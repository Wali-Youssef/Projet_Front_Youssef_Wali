<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

const { data: post} = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug})




</script>



<template>

    <div v-if="post" class="p-blog-slug">


        <h1>{{post.title}}</h1>
        
<div class="p-blog-slug_image">

    <SanityImage :asset-id="post.image.asset._ref" />
</div>

<SanityContent v-bind="{blocks: post.body}" />

    </div>

</template>
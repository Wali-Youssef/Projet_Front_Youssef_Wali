<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";


useSeoMeta({
    title: 'Blog | Tracking app de youssef',
    description: 'retrouver nos notes de mises à jour et nos dernieres actualités',
    ogTitle:'un titre spécifique pour les balises opengraphe',
    ogDescription: 'une descripton speécifique pour chaque balises',
    ogImage: '/foot5logo.png'



})

const page = ref(1)
const perPage=2


const paginationStart = computed(() => {
    return (page.value - 1) * perPage

})

const paginationEnd = computed(() => {
    return page.value * perPage
})

 function onPageClick (index: number){
    page.value = index
}


const filterRef= ref('');

function onCategoryClick (category: SanityDocument) {
    page.value = 1 
    if (filterRef.value === category.slug.current)
{
    filterRef.value = ''
} else {
    filterRef.value = category.slug.current
}
    
  
    
}





const {data:totalPosts} = await useSanityQuery<number>(groq`
 count( *[
    _type == "post"
    && defined(slug.current)
    && ($filterRef == "" || $filterRef in categories[]->slug.current)
    
  ]) ` , { filterRef: filterRef  });


  const totalPages = computed(() => {

if ( !totalPosts.value) return 0 
return Math.ceil( totalPosts.value / perPage)
})



const {data: categories} = await useSanityQuery<SanityDocument[]>(groq`*[_type == "category" && defined(slug.current)] | order(title asc)`);



const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`
  *[
    _type == "post"
    && defined(slug.current)
    && ($filterRef == "" || $filterRef in categories[]->slug.current)
    

  ] | order(publishedAt desc)[$start...$end] {
    _id,
    image,
    title,
    slug,
    publishedAt,
    "categories": categories[]->title
  }
`, { filterRef: filterRef , start: paginationStart, end: paginationEnd });





 const {urlFor}  = useSanityImage()
 
</script>


<template>
    <div class="p-blog">
        <div v-if="!posts || posts.length === 0 ">  pas d'article </div>
            
      <h1 class="p-title">Une page de listing</h1>
  
      <!-- Boutons de filtre -->
      <div class="p-blog__category">
        <div 
          v-for="(category, index) in categories" 
          :key="index" 
          :class="['p-blog__category-item', { 'p-blog__category-item--active': filterRef === category.slug.current }]" 
          @click="onCategoryClick(category)"
        >
          <span>{{ category.title }}</span>
        </div>
      </div>
  
  

<br>



on affiche la page {{ totalPages}}
<div class="p-blog__pagination">
<div
v-for="n in totalPages" :key="n" class="p-blog__page"
@click="onPageClick(n)">
page {{ n }}

</div>
</div>

      <!-- Liste des articles -->
      <div>
        <ul class="p-blog__list">
          <li v-for="(post, index) in posts" :key="index" class="p-blog__title">
            <NuxtLink :to="`/blog/${post.slug.current}`">
              {{ post.title }}
            </NuxtLink>
            <img
              v-if="post.image"
              class="p-blog__item-image"
              :src="urlFor(post.image)?.url()"
              :alt="post.title"
            >
            <div class="p-blog__tags">
              <span
                v-for="(category, idx) in post.categories"
                :key="idx"
                class="p-blog__tag"
              >
                {{ category }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      
    
</div>

  

  </template>
  
  
  <!-- :class="['p-blog-active': filter == category.slug.current]"  -->
<style lang="scss" >

.p-blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #fafafa;
  max-width: 1200px;
  margin: 0 auto;

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }

  &__category {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
  }

  &__category-item {
    padding: 0.75rem 1.25rem;
    background-color: #f7f7f7;
    border-radius: 0.5rem;
    font-weight: 600;
    color: #333;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, transform 0.3s ease-in-out;
    font-size: 1rem;
    border: 1px solid transparent;

    &--active {
      background-color: #333;
      color: #fff;
      border-color: #333;
    }

    &:hover {
      background-color: #ddd;
      color: #000;
      transform: translateY(-2px);
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center; /* Centre les cards horizontalement */
    width: 100%;
    max-width: 1200px;
  }

  &__card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    max-width: 300px; /* Taille maximum des cards */
    width: 100%; /* Les cards prennent toute la largeur possible */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin: 1rem 0 0.5rem;
  }

  &__item-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  &__tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }

  &__tag {
    background-color: #f0f0f0;
    color: #333;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    transition: background-color 0.3s, color 0.3s;
  }

  &__tag:hover {
    background-color: #ddd;
    color: #000;
  }

  &__pagination {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
  }

  &__page {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 0.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, transform 0.2s ease-in-out;

    &:hover {
      background-color: #ddd;
      color: #000;
      transform: translateY(-2px);
    }

    &--active {
      background-color: #333;
      color: #fff;
    }
  }
}

.p-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

</style>
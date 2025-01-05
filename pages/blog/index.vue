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
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;

  &__category {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    &-item {
      cursor: pointer;
      padding: 0.5rem 1rem;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-weight: bold;
      color: #333;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #007bff;
        color: #ffffff;
      }

      &--active {
        background-color: #007bff;
        color: #ffffff;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    &__page {
      cursor: pointer;
      padding: 0.5rem 1rem;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-weight: bold;
      color: #333;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #007bff;
        color: #ffffff;
      }

      &:active {
        background-color: #0056b3;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__title {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    a {
      text-decoration: none;
      font-size: 1.2rem;
      color: #333;
      font-weight: bold;
      display: block;
      margin-bottom: 1rem;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }
    }
  }

  &__item-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    background-color: #f1f1f1;
    padding: 0.3rem 0.7rem;
    border-radius: 16px;
    font-size: 0.9rem;
    color: #555;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #007bff;
      color: #ffffff;
    }
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
  }
  
  &__filter {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .p-blog {
    padding: 1rem;

    &__pagination {
      flex-direction: column;
      align-items: center;
    }
  }
}


</style>
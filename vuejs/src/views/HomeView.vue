<script setup lang="ts">
import { RouterLink,  } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import Form from '@/components/form.vue';
import ListParfums from '@/components/ListParfums.vue';


</script>

<template>
  <DefaultLayout>

    <template #header>
      <RouterLink to="/">Home</RouterLink>
    </template>

    <template #aside>
      <h1>Menu</h1>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
      </ul>
    </template>

    <template #footer>
      <RouterLink to="/about">About</RouterLink>
    </template>

    <h1>Home</h1>
      
      <ListParfums/>

      <Form/>
  </DefaultLayout>
</template>

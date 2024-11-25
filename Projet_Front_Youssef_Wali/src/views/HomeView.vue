<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import bouton from '@/components/Button.vue';
import DefaultLayout from '@/layouts/Default.vue';
import Form from '@/components/form.vue';
import Item from '@/components/Item.vue';
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
      </ul>
    </template>

    <template #footer>
      <RouterLink to="/about">About</RouterLink>
    </template>

    <h1>Home</h1>
      <Form></Form>
      <ListParfums></ListParfums>

  </DefaultLayout>
</template>

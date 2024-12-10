<script lang="ts" setup>

const username = ref('')
const password = ref('')

async function onSubmit(event: Event) {
   event.preventDefault()
}

console.log('form has submitted')
</script>

<template>
    <div>
        
      <h1>  Page d'inscription </h1>

 
      <form @submit="onSubmit">

      <div>
        <label for="username">Username</label>
        <input id="username" v-model="username" type="username">

    </div>

    <div>
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" type="password">
    </div>

    <div>
        <button type="submit">S'inscrire</button>
    </div>

        </form>
        
    </div>
</template> 


<style lang="scss">

</style>

<script lang="ts" setup>
</script>

<template>

<main class="layouts">
<header class="header">
<slot name="header"></slot>

</header>

<section class="section">
    <slot></slot>
</section>

<aside class="aside">
    <slot name="aside"></slot>
</aside>

<footer class="footer">
    <slot name="footer"></slot>
</footer>

</main>



</template>

<style lang="scss">

.layouts{

    display: grid;
    grid-template:
    "header"
    "aside"
    "footer";

    @include medium-up() {
    grid-template-areas:
        "header header header header"
    "aside section section aside"
    "footer footer foote footer";
  }

}

.header {

    grid-area: header;
    background-color: aqua;
}

.aside { 
    grid-area: aside;
    background-color: red;

}

.main {
    grid-area: section;
}
.footer {
    grid-area: footer;
    background-color: blue; 
}

</style>
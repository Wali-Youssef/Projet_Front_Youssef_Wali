<script lang="ts" setup>
defineProps<{
   
   name: string;
    price: number;
    image: {
        url: string;
        alt: string;
    };
    description: string;
}>();

</script>

<template>
    <div class="c-item">
        <img class="c-itemimage -blue" :src="image.url" :alt="image.alt"/>
        <p class="c-itemtitle">{{ name }}</p>
        <p>
           {{ description }}
        </p>

        <p>
           {{ price }}
        </p>
        <button class="button c-itembutton">Ajouter au panier</button>
    </div>
</template>

<style lang="scss">
.c-item {
    $self: &;
    padding: rem(16px);
    border: 1px solid $gray100;

    @each $color, $value in $colors {
        &.-#{$color} #{$self}image {
            border-color: $value;
        }

        &.-#{$color} #{$self}button {
            background: $value;
            border-color: $value;
        }
    }

    &:hover {
        #{$self}title {
            color: $primaryColor;
        }
    }

    &title {
        font-size: rem(24px);
        color: $gray800;
    }

    &image {
        border-bottom: 4px solid $gray400;
    }

    &__button {
        margin-top: rem(16px);
    }
}
</style>
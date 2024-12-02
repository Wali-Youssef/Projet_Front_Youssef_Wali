<script setup lang="ts">
defineProps<{
    variant?: "primary" | "outline";
    disabled?: boolean;
}>();
</script>

<template>
    <button :class="[
        'button',
        variant ? `button--${variant}` : '',
        disabled ? 'button--disabled' : ''
    ]">
        <slot></slot>
    </button>
</template>

<style lang="scss">
$primaryColor: #007bff; // Définit la couleur primaire
$primaryDarkColor: #0056b3; // Couleur primaire sombre
$white: #fff; // Couleur blanche
$gray100: #f1f1f1; // Gris clair
$gray400: #dcdcdc; // Gris moyen

.button {
    background-color: $primaryColor;
    color: $white;
    padding: 0.75rem 1.5rem;
    border-radius: 2.5rem; /* Le bouton devient arrondi */
    border: 1px solid $primaryColor;
    text-decoration: none;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    &--primary {
        background-color: $primaryColor;
        color: $white;
        border: 1px solid $primaryColor;

        &:hover {
            background-color: $white;
            color: $primaryColor;
        }

        &--disabled {
            background-color: $gray100;
            border-color: $gray100;
            color: $gray400;
            cursor: not-allowed;
        }
    }

    &--outline {
        background-color: transparent;
        color: $primaryColor;
        border-color: $primaryColor;

        &:hover {
            color: $primaryDarkColor;
            border-color: $primaryDarkColor;
        }

        &--disabled {
            background-color: transparent;
            color: $gray400;
            border-color: $gray100;
        }
    }

    &--disabled {
        background-color: $gray100;
        border-color: $gray100;
        color: $gray400;
        cursor: not-allowed;
    }

    &--small {
        padding: 0.5rem 1rem;
    }
}
</style>

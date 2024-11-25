<script setup lang="ts">
defineProps<{
    variant?: "primary" | "outline";
    disabled?: boolean
}>();

</script>

<template>
    <button :class="{
        'button': true,
        '-outline': variant === 'outline',
        '-disabled': disabled
    }">
        <slot></slot>
    </button>
</template>

<style lang="scss">
.button {
  background: $primaryColor;
  color: $white;
  padding: rem(16px) rem(32px);
  border-radius: rem(48px);
  border: 1px solid $primaryColor;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: $white;
    color: $primaryColor;
  }
  &.-outline {
    background: transparent;
    color: $primaryColor;
    &:hover {
      color: $primaryDarkColor;
      border-color: $primaryDarkColor;
    }
    &.-disabled {
      background: transparent;
      color: $gray400;
      border-color: $gray100;
    }
  }
  &.-disabled {
    background: $gray100;
    border-color: $gray100;
    color: $gray400;
    cursor: not-allowed;
  }

  &.-small {
    padding: rem(8px) rem(16px);
  }
};
</style>
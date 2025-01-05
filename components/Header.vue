<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <NuxtLink to="/">
          <img src="../assets/img/foot5logo.png" alt="Logo" >
        </NuxtLink>
      </div>
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item"><NuxtLink to="/" class="header__link">Home</NuxtLink></li>
          <li class="header__item"><NuxtLink to="/login" class="header__link">Connexion</NuxtLink></li>
          <li class="header__item"><NuxtLink to="/register" class="header__link">Inscription</NuxtLink></li>
          <li class="header__item"><NuxtLink to="/blog" class="header__link">Blog</NuxtLink></li>
        </ul>
      </nav>
      <button class="header__burger" @click="toggleMenu">
        <span class="header__burger-line"/>
        <span class="header__burger-line"/>
        <span class="header__burger-line"/>
      </button>
    </div>
    <nav class="header__mobile-nav" :class="{ 'header__mobile-nav--active': isMenuOpen }">
      <ul class="header__mobile-list">
        <li class="header__mobile-item"><NuxtLink to="/" class="header__mobile-link">Home</NuxtLink></li>
        <li class="header__mobile-item"><NuxtLink to="/connexion" class="header__mobile-link">Connexion</NuxtLink></li>
        <li class="header__mobile-item"><NuxtLink to="/inscription" class="header__mobile-link">Inscription</NuxtLink></li>
        <li class="header__mobile-item"><NuxtLink to="/blog" class="header__mobile-link">Blog</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false, // Etat du menu hamburger
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Bascule entre ouvert/fermé
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a2a44; /* Bleu foncé */
    border-bottom: 1px solid #ddd;
  }

  &__logo img {
    height: 40px;
  }

  &__nav {
    display: block;

    @media (max-width: 768px) {
      display: none; /* Masqué en mobile */
    }
  }

  &__list {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {}

  &__link {
    text-decoration: none; /* Enlever le soulignage */
    color: #ffffff; /* Texte blanc */
    font-weight: bold;

    &:hover {
      color: #93c5fd; /* Bleu plus clair au survol */
    }
  }

  &__burger {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;

    @media (max-width: 768px) {
      display: flex; /* Affiché sur mobile */
    }

    @media (min-width: 769px) {
      display: none; /* Masqué sur desktop */
    }
  }

  &__burger-line {
    width: 25px;
    height: 3px;
    background-color: #ffffff; /* Blanc */
  }

  &__mobile-nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #1a2a44; /* Bleu foncé */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &--active {
      display: block; /* Affiche le menu mobile quand isMenuOpen est true */
    }
  }

  &__mobile-list {
    list-style: none;
    margin: 0;
    padding: 1rem;
  }

  &__mobile-item {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__mobile-link {
    text-decoration: none; /* Enlever le soulignage */
    color: #ffffff; /* Texte blanc */
    font-size: 1.2rem;

    &:hover {
      color: #93c5fd; /* Bleu plus clair au survol */
    }
  }
}
</style>

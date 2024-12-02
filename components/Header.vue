<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/img/foot5logo.png" alt="Logo" />
      </div>
      <!-- Bouton hamburger -->
      <button class="hamburger" @click="toggleMenu">
        <span />
        <span />
        <span />
      </button>
      <!-- Navigation -->
      <nav class="nav" :class="{ 'is-active': isMenuOpen }">
        <NuxtLink to="/connexion" class="btn">Connexion</NuxtLink>
        <NuxtLink to="/blog" class="btn btn-primary">Inscription</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader", // Nouveau nom
  data() {
    return {
      isMenuOpen: false, // État du menu hamburger
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Basculer l'état du menu
    },
  },
};
</script>

<style lang="scss" scoped>
/* Styles principaux */
.header {
  background-color: #1a2a44; /* Bleu foncé */
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo img {
    max-height: 50px;
  }

  /* Bouton hamburger */
  .hamburger {
    display: none; /* Caché en mode desktop */
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;

    span {
      display: block;
      height: 3px;
      background: #ffffff; /* Blanc */
      border-radius: 2px;
      transition: transform 0.3s, opacity 0.3s;
    }
  }

  /* Menu navigation */
  .nav {
    display: flex;
    gap: 1rem;

    .btn {
      padding: 0.5rem 1.5rem;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      color: #ffffff; /* Texte bleu */
      background-color: #1e3a8a; /* Bleu clair */
      transition: background-color 0.3s;

      &:hover {
        background-color: #93c5fd; /* Bleu plus saturé */
      }

      &.btn-primary {
        background-color: #e67e22; /* Orange vif */
        color: #ffffff;

        &:hover {
          background-color: #fb923c; /* Orange plus clair */
        }
      }
    }
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .hamburger {
      display: flex; /* Visible en mode mobile/tablette */
    }

    .nav {
      display: none; /* Masqué par défaut */

      &.is-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 0;
        background: #1e3a8a; /* Fond bleu foncé */
        width: 100%;
        padding: 1rem;
        gap: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }

      .btn {
        background-color: #e0f2fe; /* Bleu clair */
        color: #1e3a8a;

        &.btn-primary {
          background-color: #f97316; /* Orange vif */
          color: #ffffff;
        }
      }
    }
  }
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #ffffff; /* Couleur blanche pour les barres */
  border-radius: 2px;
  margin-bottom: 4px;
  transition: transform 0.3s, opacity 0.3s;
}
</style>

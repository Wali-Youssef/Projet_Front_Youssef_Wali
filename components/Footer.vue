<template>
  <div class="footer">
    <!-- Section Partenaires -->
    <div class="footer__top" v-if="footerData">
      <div
        v-if="footerData.partners && footerData.partners.length"
        class="footer__partners"
      >
        <h3 class="footer__heading">Nos partenaires</h3>
        <div class="footer__partners-container">
          <div
            v-for="(partner, index) in footerData.partners"
            :key="partner.name + index"
            class="footer__partner"
          >
            <a :href="partner.link" target="_blank" rel="noopener noreferrer" class="footer__partner-link">
              <img
                v-if="partner.logo?.asset?.url"
                :src="partner.logo.asset.url"
                :alt="partner.name || 'Partenaire'"
                class="footer__partner-logo"
              />
            </a>
            <p class="footer__partner-name">{{ partner.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Réseaux Sociaux -->
    <div class="footer__socials">
      <h3 class="footer__heading">Suivez-nous</h3>
      <ul class="footer__socials-list">
        <li
          v-for="(social, index) in footerData?.socialLinks || []"
          :key="social.name + index"
          class="footer__social-item"
        >
          <a :href="social.url" target="_blank" rel="noopener noreferrer" class="footer__social-link">
            <img
              v-if="social.icon?.asset?.url"
              :src="social.icon.asset.url"
              :alt="social.name || 'Réseau social'"
              class="footer__social-icon"
            />
            {{ social.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Section Contact -->
    <div class="footer__contact">
      <h3 class="footer__heading">Contactez-nous</h3>
      <ul class="footer__contact-list">
        <li v-if="footerData?.contact?.email" class="footer__contact-item">
          <strong>Email :</strong> {{ footerData.contact.email }}
        </li>
        <li v-if="footerData?.contact?.phone" class="footer__contact-item">
          <strong>Téléphone :</strong> {{ footerData.contact.phone }}
        </li>
        <li v-if="footerData?.contact?.address" class="footer__contact-item">
          <strong>Adresse :</strong> {{ footerData.contact.address }}
        </li>
      </ul>
    </div>

    <!-- Section À propos -->
    <div class="footer__about">
      <h3 class="footer__heading">À propos</h3>
      <p v-if="footerData?.about?.text" class="footer__about-text">
        {{ footerData.about.text }}
      </p>
    </div>

    <!-- Gestion des erreurs -->
    <div v-if="error" class="footer__error">
      <p class="footer__error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const footerData = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const query = `
      *[_type == "footer"][0] {
        partners[] {
          name,
          logo {
            asset->{
              url
            }
          },
          link
        },
        socialLinks[] {
          name,
          url,
          icon {
            asset->{
              url
            }
          }
        },
        contact {
          email,
          phone,
          address
        },
        about {
          text
        }
      }
    `;

    const data = await useSanity().fetch(query);  
    footerData.value = data;  

  } catch (err) {
    error.value = "Erreur lors de la récupération des données du footer.";
    console.error("Erreur générale:", err);
  }
});
</script>

<style scoped lang="scss">
// Variables
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;

// Couleurs
$background-color-footer: #1a2a44; // Fond du footer
$color-text: #fff; // Texte blanc
$color-heading: #f0f0f0; // Couleur des titres
$color-link: #3498db; // Couleur des liens
$background-color-sections: #2c3e50; // Fond sombre pour les sections

// Footer global styles
.footer {
  background-color: $background-color-footer; // Fond du footer
  padding: 40px;
  font-family: 'Arial', sans-serif;
  color: $color-text; // Texte blanc

  // Section : Partenaires
  &__top {
    margin-bottom: 40px;
  }

  &__heading {
    font-size: 1.5rem;
    font-weight: bold;
    color: $color-heading; // Couleur des titres
    margin-bottom: 20px;
  }

  &__partners {
    background-color: $background-color-sections; // Fond sombre pour la section partenaires
    padding: 20px;
    border-radius: 5px;

    &-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    &-link {
      display: block;
      text-decoration: none; // Supprime le surlignage des liens
      color: $color-link; // Couleur des liens

      &:hover {
        text-decoration: none; // Assure qu'il n'y a pas de surlignage au survol
        color: $color-link; // Maintient la couleur du lien
      }
    }

    &-logo {
      max-width: 100px;
      height: auto;
      object-fit: contain;
      width: 100%;
    }

    &-name {
      text-align: center;
      font-size: 1rem;
      margin-top: 10px;
      color: #f0f0f0;
    }
  }

  // Section : Réseaux sociaux
  &__socials {
    margin-bottom: 40px;

    &-list {
      display: flex;
      gap: 15px;
      list-style: none;
      padding: 0;
      justify-content: center;
    }

    &-item {
      &-link {
        text-decoration: none; // Supprime le surlignage des liens
        color: $color-text; // Texte blanc
        display: flex;
        align-items: center;
        font-size: 1rem;
        gap: 8px;

        &:hover {
          text-decoration: none; // Supprime le soulignement au survol
          color: $color-link; // Change la couleur au survol si tu le souhaites
        }
      }

      &-icon {
        max-width: 24px;
        max-height: 24px;
        width: auto;
        height: auto;
        object-fit: contain;
      }
    }
  }

  // Section : Contact
  &__contact {
    background-color: $background-color-sections;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 40px;

    &-list {
      list-style: none;
      padding: 0;
    }

    &-item {
      font-size: 1rem;
      margin-bottom: 10px;
      color: #f0f0f0;

      strong {
        font-weight: bold;
      }
    }
  }

  // Section : À propos
  &__about {
    background-color: $background-color-sections;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 40px;

    &-text {
      font-size: 1rem;
      color: #f0f0f0;
    }
  }

  // Section : Erreur
  &__error {
    background-color: #ffcccc;
    padding: 15px;
    border-radius: 5px;
    font-size: 1rem;
    color: #d9534f;
    text-align: center;

    &-message {
      margin: 0;
    }
  }

  // Responsiveness
  @media (max-width: #{$breakpoint-sm}) {
    .footer {
      padding: 20px;
    }

    .footer__heading {
      font-size: 1.2rem;
    }

    .footer__partners {
      &-container {
        gap: 15px;
      }

      &-logo {
        max-width: 80px; // Réduit la taille des logos
      }
    }

    .footer__socials {
      &-list {
        flex-direction: column;
        gap: 12px;
      }
    }

    .footer__contact {
      &-list {
        padding-left: 20px;
      }
    }

    .footer__about {
      &-text {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: #{$breakpoint-md}) {
    .footer {
      padding: 30px 20px;
    }

    .footer__heading {
      font-size: 1.3rem;
    }

    .footer__partners {
      &-container {
        gap: 20px;
      }

      &-logo {
        max-width: 90px; // Ajuste la taille des logos
      }
    }

    .footer__socials {
      &-list {
        gap: 15px;
      }
    }

    .footer__contact {
      &-list {
        padding-left: 20px;
      }
    }
  }

  @media (max-width: #{$breakpoint-lg}) {
    .footer {
      padding: 40px 30px;
    }

    .footer__partners {
      &-container {
        gap: 20px;
      }

      &-logo {
        max-width: 100px;
      }
    }

    .footer__socials {
      &-list {
        gap: 20px;
      }
    }

    .footer__contact {
      &-list {
        padding-left: 30px;
      }
    }
  }
}


</style>

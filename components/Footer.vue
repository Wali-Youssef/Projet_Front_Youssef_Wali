<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

// Déclarez un type spécifique pour les données du footer
interface FooterData {
  partners: {
    name: string;
    logo: { asset: { url: string } };
    link: string;
  }[];
  socialLinks: {
    name: string;
    url: string;
    icon: { asset: { url: string } };
  }[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  about: {
    text: string;
  };
}

let footerData: FooterData | null = null;
let error: string | null = null;

try {
  // Récupérer les données du footer à partir de Sanity
  const { data } = await useSanityQuery<SanityDocument>(groq`
    *[_type == "footer"][0] {
      partners[] {
        name,
        logo {
          asset->{
            _id,
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
            _id,
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
  `);

  footerData = data;
} catch (err) {
  error = "Une erreur s'est produite lors de la récupération des données du footer.";
  console.error(error, err);
}
</script>

<template>
  <footer class="footer">
    <div class="footer__top">
      <!-- Section Partenaires -->
      <div v-if="footerData?.partners" class="footer__partners">
        <h3>Nos partenaires</h3>
        <div class="partners__container">
          <div v-for="(partner, index) in footerData.partners" :key="index" class="partner">
            <a :href="partner.link" target="_blank" rel="noopener noreferrer">
              <img
                v-if="partner.logo"
                :src="partner.logo?.asset?.url"
                :alt="partner.name"
                class="partner__logo"
              />
            </a>
            <p>{{ partner.name }}</p>
          </div>
        </div>
      </div>

      <!-- Section Réseaux Sociaux -->
      <div v-if="footerData?.socialLinks" class="footer__socials">
        <h3>Suivez-nous</h3>
        <div class="social__icons">
          <div v-for="(social, index) in footerData.socialLinks" :key="index" class="social__icon">
            <a :href="social.url" target="_blank" rel="noopener noreferrer">
              <img
                v-if="social.icon"
                :src="social.icon?.asset?.url"
                :alt="social.name"
                class="social__icon-img"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Section Contact -->
      <div v-if="footerData?.contact" class="footer__contact">
        <h3>Contactez-nous</h3>
        <p>Email: <a :href="'mailto:' + footerData.contact.email">{{ footerData.contact.email }}</a></p>
        <p>Téléphone: <a :href="'tel:' + footerData.contact.phone">{{ footerData.contact.phone }}</a></p>
        <p>Adresse: {{ footerData.contact.address }}</p>
      </div>
    </div>

    <!-- Section À propos -->
    <div v-if="footerData?.about" class="footer__about">
      <p>{{ footerData.about.text }}</p>
    </div>

    <!-- Section d'erreur -->
    <div v-if="error" class="footer__error">
      <p>{{ error }}</p>
    </div>

    <!-- Copyright -->
    <div class="footer__copyright">
      <p>&copy; 2024 Votre Entreprise. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding: 4rem 1rem;
  font-family: Arial, sans-serif;

  &__top {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Trois colonnes pour partenaires, réseaux sociaux, contact */
    gap: 3rem;
    margin-bottom: 2rem;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }

  &__partners,
  &__socials,
  &__contact {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .partners__container,
    .social__icons {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .partner,
    .social__icon {
      text-align: center;
    }

    .partner__logo,
    .social__icon-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-bottom: 1rem;
    }
  }

  &__about {
    text-align: center;
    margin-top: 2rem;

    p {
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  &__contact {
    p {
      font-size: 1rem;
      line-height: 1.5;
    }

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__copyright {
    text-align: center;
    margin-top: 3rem;
    font-size: 1rem;
    color: #bbb;
  }

  &__error {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .footer__top {
    grid-template-columns: 1fr; /* Une colonne en mode mobile */
    gap: 2rem;
  }
}
</style>

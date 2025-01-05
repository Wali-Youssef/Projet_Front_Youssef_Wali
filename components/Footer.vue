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

<style scoped>
/* Bloc principal : Footer */
.footer {
  padding: 2rem;
  background-color: #f9f9f9;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Section générale : Titres */
.footer__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Section partenaires */
.footer__partners {
  margin-top: 1rem;
}

.footer__partners-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__partner {
  text-align: center;
}

.footer__partner-logo {
  max-width: 100px;
  max-height: 50px;
  object-fit: contain;
}

.footer__partner-link {
  display: block;
  margin-bottom: 0.5rem;
}

.footer__partner-name {
  font-size: 1rem;
  color: #333;
}

/* Section réseaux sociaux */
.footer__socials-list {
  list-style: none;
  padding: 0;
}

.footer__social-item {
  margin-bottom: 0.5rem;
}

.footer__social-icon {
  max-width: 24px;
  max-height: 24px;
  margin-right: 0.5rem;
}

.footer__social-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  text-decoration: none;
}

/* Section contact */
.footer__contact-list {
  list-style: none;
  padding: 0;
}

.footer__contact-item {
  margin-bottom: 0.5rem;
}

.footer__about-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

/* Gestion des erreurs */
.footer__error-message {
  color: red;
  font-weight: bold;
}

/* RESPONSIVE */

/* Pour les écrans de plus de 768px */
@media (min-width: 768px) {
  .footer__partners-container {
    justify-content: space-between;
  }

  .footer__socials-list {
    display: flex;
    justify-content: space-between;
  }

  .footer__contact-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

/* Pour les écrans de plus de 1024px */
@media (min-width: 1024px) {
  .footer__partner {
    width: 22%;
  }

  .footer__social-item {
    display: inline-block;
    margin-right: 1rem;
  }

  .footer__contact-item {
    width: 30%;
  }

  .footer__about-text {
    width: 50%;
    margin-top: 1rem;
  }
}

</style>

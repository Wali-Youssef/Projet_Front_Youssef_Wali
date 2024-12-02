<script setup lang="ts">


// Définir les props du composant : `filterValue` et `parfums`
const props = defineProps({
  filterValue: {
    type: String,
    default: '',  // Valeur par défaut pour le filtre
  },
  parfums: {
    type: Array,
    default: () => [],  // Liste vide par défaut
  }
});

// Définir les émetteurs d'événements
const emit = defineEmits<{
  (e: 'update:filterValue', value: string): void;
}>();

// Liste des parfums
const staticParfums = [
  {
    id: 1,
    name: "Chanel No. 5",
    description: "Un parfum classique, intemporel, avec des notes florales de rose, de jasmin et de vanille.",
    price: 130,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Chanel No. 5"
    }
  },
  {
    id: 2,
    name: "Dior Sauvage",
    description: "Un parfum frais et épicé avec des notes de bergamote, poivre et ambroxan.",
    price: 95,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Dior Sauvage"
    }
  },
  {
    id: 3,
    name: "Tom Ford Black Orchid",
    description: "Un parfum oriental et floral, riche en orchidée noire, épices et bois précieux.",
    price: 180,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Tom Ford Black Orchid"
    }
  },
  {
    id: 4,
    name: "Yves Saint Laurent Libre",
    description: "Un parfum audacieux alliant la lavande et la fleur d'oranger, avec des touches de musc et de vanille.",
    price: 110,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Yves Saint Laurent Libre"
    }
  },
  {
    id: 5,
    name: "Hermès Terre d'Hermès",
    description: "Un parfum boisé et épicé, avec des notes de citron, poivre, cèdre et vétiver.",
    price: 140,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Hermès Terre d'Hermès"
    }
  }
];

// Calculer les parfums filtrés en fonction de la valeur de `filterValue`
const parfumsFiltered = computed(() => {
  return staticParfums.filter(parfum => parfum.name.toLowerCase().includes(props.filterValue.toLowerCase()));
});

// Gérer la mise à jour de la valeur de `filterValue`
const handleFilterChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:filterValue', value);  // Émettre l'événement pour mettre à jour la valeur
};
</script>

<template>
  <div>
    <!-- Champ de recherche pour filtrer les parfums -->
    <input
      :value="filterValue"
      type="text"  
      placeholder="Filtrer par nom"
      class="filter-input"
      @input="handleFilterChange"
    >

    <!-- Liste des parfums filtrés -->
    <div v-for="parfum in parfumsFiltered" :key="parfum.id" class="parfum-item">
      <!-- Passer les props individuellement au lieu de passer un objet complet -->
      <Item
        :name="parfum.name"
        :price="parfum.price"
        :image="parfum.image"
        :description="parfum.description"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.parfum-item {
  margin-bottom: 1.5rem;
}

/* Styles de vos autres éléments, selon vos besoins */
</style>

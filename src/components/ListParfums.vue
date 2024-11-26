<script setup lang="ts">
import MyItem from "@/components/Item.vue";

import { reactive, computed} from "vue";

const filterValue = defineModel<string>('filter')


type Parfums = {
    id: number;
    name: string;
    price: number;
    image: {
        url: string;
        alt: string;
    };
    description: string;
}

const parfums : Parfums [] = reactive( [


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
    description: "Un parfum boisée et épicée, avec des notes de citron, poivre, cèdre et vétiver.",
    price: 140,
    image: {
      url: "https://placehold.co/600x400",
      alt: "Flacon de parfum Hermès Terre d'Hermès"
    }

  }

]);

const parfumsFiltered = computed(() =>parfums.filter((parfum) => {
    return parfum.name.includes(filterValue.value ?? "")
}))

</script>

<template>

    <div class="c-parfums">
        <h2>Nos parfums</h2>
 <div class="c-parfums__input">

    <input type="text" placeholder="Rechercher un parfum" v-model="filterValue" />
 </div>
      <div class="c-parfums__list">

        <MyItem v-for="({id, ...parfum}) in parfumsFiltered " :key="id" v-bind="parfum" />

      </div>
</div>
</template>


    <style lang="scss">
.c-parfums {
    &__input {
        padding: rem(16px);
        * {
            width: 100%;;
        }
    }

    &__list {
        display: flex;
        grid-template-columns: repeat(3, 1fr);
    }
}


    </style>
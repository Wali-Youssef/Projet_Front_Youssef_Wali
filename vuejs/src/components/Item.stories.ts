import type { Meta, StoryObj } from '@storybook/vue3';
import Item from './Item.vue'; // Chemin vers votre composant Item

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Nom de l\'article',
      defaultValue: 'Produit',
    },
    price: {
      control: { type: 'number' },
      description: 'Prix de l\'article',
      defaultValue: 10.0,
    },
    image: {
      control: { type: 'object' },
      description: 'Image de l\'article',
      defaultValue: {
        url: 'https://via.placeholder.com/150',
        alt: 'Placeholder image',
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description de l\'article',
      defaultValue: 'Description du produit.',
    },
    onAddToCart: {
      action: 'addToCart',
      description: 'Événement déclenché lors du clic sur le bouton Ajouter au panier',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Item>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { Item },
    setup() {
      return { args };
    },
    template: `
      <Item 
        v-bind="args" 
        @addToCart="args.onAddToCart" 
      />
    `,
  }),
};

export const Default: Story = {
  ...storyOptions,
  args: {
    name: 'Produit par défaut',
    price: 15.99,
    image: {
      url: 'https://via.placeholder.com/150',
      alt: 'Image par défaut',
    },
    description: 'Ceci est une description par défaut du produit.',
  },
};

export const CustomProduct: Story = {
  ...storyOptions,
  args: {
    name: 'T-Shirt Rouge',
    price: 25.99,
    image: {
      url: 'https://via.placeholder.com/300',
      alt: 'Un t-shirt rouge',
    },
    description: 'Un magnifique t-shirt rouge en coton bio.',
  },
};

export const ExpensiveProduct: Story = {
  ...storyOptions,
  args: {
    name: 'Montre de Luxe',
    price: 5000.0,
    image: {
      url: 'https://via.placeholder.com/400',
      alt: 'Une montre de luxe',
    },
    description: 'Montre en or 18 carats avec bracelet en cuir.',
  },
};

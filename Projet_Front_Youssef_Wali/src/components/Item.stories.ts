import type { Meta, StoryObj } from '@storybook/vue3';
import Item from './Item.vue';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Nom de l\'item',
    },
    price: {
      control: { type: 'number' },
      description: 'Prix de l\'item',
    },
    image: {
      control: { type: 'object' },
      description: 'Image de l\'item (URL et texte alternatif)',
    },
    description: {
      control: { type: 'text' },
      description: 'Description de l\'item',
    },
    onAddToCart: { action: 'addToCart' },
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

export const DefaultItem: Story = {
  ...storyOptions,
  args: {
    name: 'Produit Exemple',
    price: 29.99,
    image: {
      url: 'https://via.placeholder.com/600*400',
      alt: 'Image par défaut',
    },
    description: 'Ceci est une description d\'un produit.',
  },
};

export const CustomItem: Story = {
  ...storyOptions,
  args: {
    name: 'Sac à dos',
    price: 49.99,
    image: {
      url: 'https://via.placeholder.com/200',
      alt: 'Image d\'un sac à dos',
    },
    description: 'Un sac à dos robuste pour toutes vos aventures.',
  },
};

export const ExpensiveItem: Story = {
  ...storyOptions,
  args: {
    name: 'Montre de Luxe',
    price: 999.99,
    image: {
      url: 'https://via.placeholder.com/250',
      alt: 'Image d\'une montre de luxe',
    },
    description: 'Une montre élégante et sophistiquée pour les grandes occasions.',
  },
};

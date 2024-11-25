import type { Meta, StoryObj } from '@storybook/vue3';
import ListParfums from './ListParfums.vue';

const meta: Meta<typeof ListParfums> = {
  title: 'Elements/ListParfums',
  component: ListParfums,
  argTypes: {
    filterValue: {
      control: { type: 'text' },
      description: 'Valeur utilisée pour filtrer les parfums par nom.',
    },
    parfums: {
      control: { type: 'object' },
      description: 'Liste des parfums à afficher.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ListParfums>;

const parfumsMock = [
  {
    id: 1,
    name: 'Chanel No. 5',
    description: 'Un parfum classique avec des notes florales de rose, jasmin et vanille.',
    price: 130,
    image: { url: 'https://placehold.co/600x400', alt: 'Chanel No. 5' },
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    description: 'Un parfum frais avec des notes de bergamote, poivre et ambroxan.',
    price: 95,
    image: { url: 'https://placehold.co/600x400', alt: 'Dior Sauvage' },
  },
  {
    id: 3,
    name: 'Tom Ford Black Orchid',
    description: 'Un parfum oriental avec orchidée noire et épices.',
    price: 180,
    image: { url: 'https://placehold.co/600x400', alt: 'Tom Ford Black Orchid' },
  },
];

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { ListParfums },
    setup() {
      return { args };
    },
    template: `
      <ListParfums style="width: 100%"
        v-bind="args"
      />
    `,
  }),
};

export const DefaultList: Story = {
  ...storyOptions,
  args: {
    filterValue: '',
    parfums: parfumsMock,
  },
};

export const FilteredList: Story = {
  ...storyOptions,
  args: {
    filterValue: 'Dior',
    parfums: parfumsMock,
  },
};

export const EmptyList: Story = {
  ...storyOptions,
  args: {
    filterValue: '',
    parfums: [],
  },
};

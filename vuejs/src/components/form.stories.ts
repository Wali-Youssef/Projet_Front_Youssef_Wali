import type { Meta, StoryObj } from '@storybook/vue3';
import Form from './form.vue'; // Chemin vers votre composant Form

const meta: Meta<typeof Form> = {
  title: 'Elements/Form',
  component: Form,
  argTypes: {
    email: {
      control: { type: 'text' },
      description: 'Email initial pour le formulaire',
      defaultValue: '',
    },
    password: {
      control: { type: 'text' },
      description: 'Mot de passe initial pour le formulaire',
      defaultValue: '',
    },
    onSubmit: { action: 'submit', description: 'Événement déclenché lors de la soumission' },
  },
};
export default meta;

type Story = StoryObj<typeof Form>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { Form },
    setup() {
      return { args };
    },
    template: `
      <Form v-bind="args" @submit="args.onSubmit" />
    `,
  }),
};

export const Default: Story = {
  ...storyOptions,
  args: {
    email: '',
    password: '',
  },
};

export const PreFilled: Story = {
  ...storyOptions,
  args: {
    email: 'test@example.com',
    password: 'password123',
  },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FormComponent from './form.vue';

const meta: Meta<typeof FormComponent> = {
  title: 'Elements/Form',
  component: FormComponent,
  argTypes: {
    email: {
      control: { type: 'text' },
      description: 'Email value entered in the form',
    },
    password: {
      control: { type: 'text' },
      description: 'Password value entered in the form',
    },
    onSubmit: { action: 'submit' },
  },
};
export default meta;

type Story = StoryObj<typeof FormComponent>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { FormComponent },
    setup() {
      return { args };
    },
    template: `
      <FormComponent
        v-bind="args"
        @submit="args.onSubmit"
      />
    `,
  }),
};

export const DefaultForm: Story = {
  ...storyOptions,
  args: {
    email: '',
    password: '',
  },
};

export const PrefilledForm: Story = {
  ...storyOptions,
  args: {
    email: 'example@test.com',
    password: 'password123',
  },
};

export const SubmitAction: Story = {
  ...storyOptions,
  args: {
    email: '',
    password: '',
    onSubmit: (data: { email: string; password: string }) =>
      alert(`Submitted Email: ${data.email}, Password: ${data.password}`),
  },
};

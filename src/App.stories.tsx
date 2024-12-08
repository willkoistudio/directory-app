import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";

// Définition du Meta type pour les stories
const meta: Meta<typeof App> = {
  title: "App",
  component: App,
};

export default meta;

// Définition du type Story
type Story = StoryObj<typeof App>;

// Création des stories avec le type correct
export const Default: Story = {
  args: {
    // Ajoutez ici les props par défaut si nécessaire
  },
};

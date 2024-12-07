import App from "./App";

export default {
  title: "App",
  component: App,
};

const Template = (args: { [key: string]: any }) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Ajoutez ici les props par défaut si nécessaire
};

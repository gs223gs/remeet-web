import type { Preview } from "@storybook/nextjs-vite";

import { ThemeProvider } from "../components/theme-provider";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "テーマ",
      defaultValue: "system",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          forcedTheme={theme === "system" ? undefined : theme}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

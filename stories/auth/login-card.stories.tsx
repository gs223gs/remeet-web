import type { Meta, StoryObj } from "@storybook/react";

import { LoginCard } from "@/components/LoginCard";
import type { ProviderOptions } from "@/type/auth";

const GithubBrandIcon = () => (
  <svg
    aria-hidden
    className="size-5"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.1.823 2.219v3.293c0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      fill="#181717"
    />
  </svg>
);

const GoogleBrandIcon = () => (
  <svg
    aria-hidden
    className="size-5"
    role="img"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M533.5 278.4c0-17.4-1.6-34-4.7-50.1H272v94.9h147.3c-6.4 34.6-26.1 63.8-55.5 83.5v69.2h89.7c52.4-48.3 80-119.5 80-197.5"
      fill="#4285F4"
    />
    <path
      d="M272 544.3c74.7 0 137.4-24.8 183.2-67.4l-89.7-69.2c-24.9 16.7-56.9 26-93.5 26-71.9 0-132.8-48.6-154.6-113.9H26.7v71.6C72.2 486 166.1 544.3 272 544.3"
      fill="#34A853"
    />
    <path
      d="M117.4 319.8c-5.6-16.7-8.8-34.7-8.8-53s3.2-36.3 8.8-53V142.2H26.7C9.7 176.4 0 215 0 266.8c0 51.8 9.7 90.4 26.7 124.6l90.7-71.6"
      fill="#FBBC05"
    />
    <path
      d="M272 107.9c40.7 0 77 14 105.7 41.5l79.1-79.1C409.2 27.2 346.5 0 272 0 166.1 0 72.2 58.3 26.7 142.2l90.7 71.6c21.8-65.3 82.7-105.9 154.6-105.9"
      fill="#EA4335"
    />
  </svg>
);

const noopAction = () => {};

const mockProviderOptions: ProviderOptions[] = [
  {
    id: "github",
    label: "GitHubでサインイン",
    icon: GithubBrandIcon,
    action: noopAction,
    isPending: false,
    state: null,
  },
  {
    id: "google",
    label: "Googleでサインイン",
    icon: GoogleBrandIcon,
    action: noopAction,
    isPending: false,
    state: null,
  },
];

const meta = {
  title: "Auth/LoginCard",
  component: LoginCard,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    providerOptions: mockProviderOptions,
  },
} satisfies Meta<typeof LoginCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleProvider: Story = {
  name: "プロバイダが1つの例",
  args: {
    providerOptions: [mockProviderOptions[0]],
  },
};

export const PendingState: Story = {
  name: "処理中の例",
  args: {
    providerOptions: [
      {
        ...mockProviderOptions[0],
        isPending: true,
      },
    ],
  },
};

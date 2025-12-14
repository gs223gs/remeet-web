import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { CreateMeetupForm } from "@/components/meetup/form/create-meetup-form";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

type CreateMeetupFormPreviewProps = {
  buttonLabel: string;
  disabled?: boolean;
};

function CreateMeetupFormPreview({
  buttonLabel,
  disabled,
}: CreateMeetupFormPreviewProps) {
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: new Date(),
    },
    mode: "onChange",
  });

  const isDisabled = disabled ?? !form.formState.isValid;

  return (
    <div className="w-full max-w-xl rounded-xl border border-dashed border-muted-foreground/30 p-6">
      <CreateMeetupForm
        form={form}
        action={async (formData) => {
          const entries = Object.fromEntries(formData.entries());
          console.log(entries);
        }}
        buttonLabel={buttonLabel}
        isDisabled={isDisabled}
      />
    </div>
  );
}

const meta = {
  title: "Meetup/CreateMeetupForm",
  component: CreateMeetupFormPreview,
  args: {
    buttonLabel: "送信",
    disabled: false,
  },
  argTypes: {
    buttonLabel: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CreateMeetupFormPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Pending: Story = {
  args: {
    buttonLabel: "送信中",
    disabled: true,
  },
};

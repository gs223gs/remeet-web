"use client";

import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const SidebarUserProfile = () => {
  const { data: session } = useSession();
  const userProfile = {
    image: session?.user?.image ?? null,
    name: session?.user?.name ?? null,
  };
  return (
    <>
      <Avatar className="h-4 w-4">
        {userProfile.image ? (
          <AvatarImage src={userProfile.image} alt={`user image`} />
        ) : (
          <CircleUserRound />
        )}
        <AvatarFallback>
          <CircleUserRound />
        </AvatarFallback>
      </Avatar>
      {userProfile.name ? userProfile.name : "GUEST"}
    </>
  );
};

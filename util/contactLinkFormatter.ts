import type { LinkType } from "@prisma/client";

import { outsideUrl } from "@/util/routes";
export const linkLabels: Record<LinkType, string> = {
  GITHUB: "GitHub",
  TWITTER: "X (Twitter)",
  WEBSITE: "Website",
  OTHER: "Other",
  PRODUCT: "Product",
};

const linkHandlers: Record<LinkType, (handle: string, url: string) => string> =
  {
    GITHUB: (handle) => outsideUrl.githubUrl(handle),
    TWITTER: (handle) => outsideUrl.twitterUrl(handle),
    WEBSITE: (_, siteUrl) => outsideUrl.websiteUrl(siteUrl),
    OTHER: (_, siteUrl) => outsideUrl.otherUrl(siteUrl),
    PRODUCT: (_, siteUrl) => outsideUrl.productUrl(siteUrl),
  };

export const createLinkUrl = (
  type: LinkType,
  handle: string | undefined,
  url: string,
) => {
  if (!handle) {
    return linkHandlers[type]("", url);
  }
  return linkHandlers[type](handle, url);
};

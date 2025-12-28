import type { LinkType } from "@prisma/client";

import { outsideUrl } from "@/util/routes";
export const linkLabels: Record<LinkType, string> = {
  GITHUB: "GitHub",
  TWITTER: "X (Twitter)",
  WEBSITE: "Website",
  OTHER: "Other",
  PRODUCT: "Product",
};

const linkHandlers: Record<LinkType, (url: string) => string> = {
  GITHUB: (handle) => outsideUrl.githubUrl(handle),
  TWITTER: (handle) => outsideUrl.twitterUrl(handle),
  WEBSITE: (siteUrl) => outsideUrl.websiteUrl(siteUrl),
  OTHER: (siteUrl) => outsideUrl.otherUrl(siteUrl),
  PRODUCT: (siteUrl) => outsideUrl.productUrl(siteUrl),
};

export const createLinkUrl = (type: LinkType, url: string) => {
  return linkHandlers[type](url);
};

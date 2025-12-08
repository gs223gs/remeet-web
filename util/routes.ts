export const routes = {
  home: () => "/" as const,
  notFound: () => "/_not-found" as const,
  login: () => "/login" as const,
  apiAuth: () => "/api/auth/[...nextauth]" as const,
  dashboard: () => "/dashboard" as const,
  dashboardContacts: () => "/dashboard/contacts" as const,
  dashboardMeetupList: () => "/dashboard/meetup" as const,
  dashboardMeetupNew: () => "/dashboard/meetup/new" as const,
  dashboardMeetupDetail: (meetupId: string) =>
    `/dashboard/meetup/${meetupId}` as const,
  dashboardMeetupEdit: (meetupId: string) =>
    `/dashboard/meetup/${meetupId}/edit` as const,
  dashboardMeetupContactNew: (meetupId: string) =>
    `/dashboard/meetup/${meetupId}/contacts/new` as const,
  dashboardMeetupContactDetail: (meetupId: string, contactsId: string) =>
    `/dashboard/meetup/${meetupId}/contacts/${contactsId}` as const,
  dashboardMeetupContactEdit: (meetupId: string, contactsId: string) =>
    `/dashboard/meetup/${meetupId}/contacts/${contactsId}/edit` as const,
  dashboardTags: () => "/dashboard/tags" as const,
  dashboardTagDetail: (tagId: string) => `/dashboard/tags/${tagId}` as const,
  dashboardTagEdit: (tagId: string) => `/dashboard/tags/${tagId}/edit` as const,
} as const;

export const outsideUrl = {
  githubUrl: (id: string) => `https://github.com/${id}`,
  twitterUrl: (id: string) => `https://x.com/${id}`,
  websiteUrl: (url: string) => `https://${url}`,
  otherUrl: (url: string) => `https://${url}`,
  productUrl: (url: string) => `https://${url}`,
} as const;

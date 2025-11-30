export const dateFormatter = (date: Date): string => {
  const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tokyo",
  });

  return dateFormatter.format(date);
};

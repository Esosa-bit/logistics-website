// Lagos time so every visitor sees the same clock.
const dateTime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

const dateOnly = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Africa/Lagos",
});

export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));
export const formatDate = (iso: string) => dateOnly.format(new Date(iso));

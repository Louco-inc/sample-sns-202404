export const formattedAccountName = (email: string): string => {
  return `@${email.split("@")[0]}`;
};

export const formattedPostTime = (updatedAt: Date): string => {
  const postedDate = new Date(updatedAt).getTime();
  const now = new Date().getTime();
  const diff = now - postedDate;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) {
    return "1分前";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}分前`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}時間前`;
  } else {
    const days = Math.floor(diff / day);
    return `${days}日前`;
  }
};

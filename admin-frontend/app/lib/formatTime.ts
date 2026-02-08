import { format, formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

export default function formatTime(time: any) {
  const fTime = formatRelative(time, new Date(), {
    locale: {
      ...enUS,
      formatRelative: (token, date, baseDate) => {
        const formatRelativeFn = enUS.formatRelative;
        if (token === "other") {
          return format(date, "MMMM d, y");
        }
        return formatRelativeFn(token, date, baseDate);
      },
    },
  });
  return fTime[0].toUpperCase() + fTime.slice(1);
}

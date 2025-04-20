export function convertStringToTime(timeString: string): Date {
  const numbers = timeString.match(/\d+/g);
  const [day, month, year, hour, minute] = numbers
    ? numbers.map(Number)
    : [0, 0, 0, 0, 0];

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  );
}

export function timeFromNow(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function similarity(s1: string, s2: string): number {
  function sml(s1, s2) {
    return Array.from({ length: s1.length }, (_, i) =>
      Array.from({ length: s1.length - i }, (_, j) => i + j + 1)
        .map((j) => s1.slice(i, j))
        .filter((s3) => s2.includes(s3))
        .reduce((acc, s3) => acc + s3.length * 10, 0),
    ).reduce((acc, score) => acc + score, 0);
  }

  return (
    (Math.min(sml(s1, s2), sml(s2, s1)) / Math.max(sml(s1, s1), sml(s2, s2))) *
    100
  );
}

export function similaritySentence(s1: string, s2: string): number {
  const words1 = s1.split(" ").filter(Boolean);
  const words2 = s2.split(" ").filter(Boolean);

  return (
    words1
      .map((word1, index) =>
        words2[index] ? similarity(word1, words2[index]) : 0,
      )
      .reduce((acc, score) => acc + score, 0) /
    Math.max(words1.length, words2.length)
  );
}

export function getDateRange(weeks: number) {
  const endDate = new Date();
  const startDate = new Date(
    endDate.getTime() - weeks * 7 * 24 * 60 * 60 * 1000,
  );
  const startWeekDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() - startDate.getDay(),
  );
  const endWeekDate = new Date(
    startWeekDate.getTime() + 6 * 24 * 60 * 60 * 1000,
  );

  return [startWeekDate, endWeekDate];
}

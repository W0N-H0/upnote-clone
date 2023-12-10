export function formatDate(dateString: Date) {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 현재 시간을 가져오기
  const now = new Date();

  // 주어진 날짜가 현재 시간으로부터 24시간 이내인지 확인
  const isWithin24Hours = now.getTime() - date.getTime() < 24 * 60 * 60 * 1000;

  if (isWithin24Hours) {
    // 24시간 이내인 경우 'Today, hh:mm a' 형식으로 포맷
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `Today, ${timeFormat.format(date)}`;
  } else {
    // 24시간 이외인 경우 'MMM d, hh:mm a' 형식으로 포맷
    const dateFormat = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return dateFormat.format(date);
  }
}

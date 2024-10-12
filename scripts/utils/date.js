import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDate(deliveryDays) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

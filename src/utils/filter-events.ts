import { type CampusEvent } from "../types/campus-event";

export function filterEvents(
  events: CampusEvent[],
  searchText: string,
  category: string
): CampusEvent[] {
  return events.filter((e) => {
    const textOk = e.title
      .toLocaleLowerCase("tr-TR")
      .includes(searchText.toLocaleLowerCase("tr-TR"));
    const catOk = category === "" || e.category === category;
    return textOk && catOk;
  });
}
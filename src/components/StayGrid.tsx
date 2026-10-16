import type { Stay } from "../types";
import StayCard from "./StayCard";
export default function StayGrid({
  items,
  detailed,
}: {
  items: Stay[];
  detailed?: boolean;
}) {
  return (
    <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <StayCard key={s.id} s={s} detailed={detailed} />
      ))}
    </div>
  );
}

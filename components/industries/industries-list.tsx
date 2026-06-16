import { INDUSTRIES } from "./data";
import { IndustryRow } from "./industry-row";

export function IndustriesList() {
  return (
    <div data-industries-list className="industries-list">
      {INDUSTRIES.map((industry, index) => (
        <IndustryRow key={industry.id} industry={industry} index={index} />
      ))}
    </div>
  );
}

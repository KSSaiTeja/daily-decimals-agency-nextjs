import type { FooterNavColumn } from "@/components/footer/data";
import { FooterLink } from "@/components/footer/footer-link";

type FooterNavColumnProps = {
  column: FooterNavColumn;
};

export function FooterNavColumn({ column }: FooterNavColumnProps) {
  return (
    <nav className="footer-nav-column" aria-label={column.title}>
      <p className="footer-nav-column__title">{column.title}</p>
      <ul className="footer-nav-column__list">
        {column.links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

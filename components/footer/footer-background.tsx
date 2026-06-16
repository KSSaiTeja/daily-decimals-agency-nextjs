/** Dark textured backdrop for the footer card (matches Figma footer image treatment). */
export function FooterBackground() {
  return (
    <div className="footer-card__background" data-name="Footer image" aria-hidden>
      <div className="footer-card__background-media">
        <div className="footer-card__background-base" />
        <div className="footer-card__background-grid" />
        <div className="footer-card__background-noise" />
      </div>
      <div className="footer-card__background-glow footer-card__background-glow--left" />
      <div className="footer-card__background-glow footer-card__background-glow--right" />
    </div>
  );
}

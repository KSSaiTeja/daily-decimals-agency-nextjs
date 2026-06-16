export function ContactPatternBackground() {
  return (
    <div
      data-contact-card-bg
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(255,77,0,0.38),transparent_42%),radial-gradient(circle_at_92%_82%,rgba(255,120,40,0.24),transparent_48%),linear-gradient(155deg,#141414_0%,#0a0a0a_52%,#111111_100%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -left-28 top-[12%] h-[300px] w-[300px] rounded-full bg-[#ff4d00]/14 blur-3xl" />
      <div className="absolute -right-20 bottom-[8%] h-[340px] w-[340px] rounded-full bg-[#ff6b2d]/12 blur-3xl" />
    </div>
  );
}

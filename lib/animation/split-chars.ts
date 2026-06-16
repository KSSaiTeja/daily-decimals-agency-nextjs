/** Split text into inline-block character spans for staggered reveal animations. */
function splitChars(el: HTMLElement, datasetKey = "char") {
  const attr = `data-${datasetKey}`;
  if (el.querySelector(`[${attr}]`)) return;

  const raw = el.textContent ?? "";
  if (!raw.trim()) return;

  el.textContent = "";
  for (const char of raw) {
    const span = document.createElement("span");
    span.setAttribute(attr, "true");
    span.textContent = char === " " ? "\u00a0" : char;
    span.style.display = "inline-block";
    el.appendChild(span);
  }
}

export function splitTitleLines(
  root: ParentNode,
  leadSelector: string,
  emphasisSelector: string,
  datasetKey: string,
) {
  const lead = root.querySelector<HTMLElement>(leadSelector);
  const emphasis = root.querySelector<HTMLElement>(emphasisSelector);

  if (lead) splitChars(lead, datasetKey);
  if (emphasis) splitChars(emphasis, datasetKey);

  return root.querySelectorAll<HTMLElement>(`[data-${datasetKey}]`);
}

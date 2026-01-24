/**
* Set the foreground image Y position (in pixels).
* The image is anchored from the bottom of the hero.
*/
export function setForegroundY(px: number): void {
  const hero = document.querySelector<HTMLElement>(".hero");

  if (!hero) {
    return;
  }
  hero.style.setProperty("--foreground-y", `${px}px`);
}


// Example usage:
setForegroundY(0);


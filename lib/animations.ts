"use client";

import gsap from "gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

export const EASE_OUT = "power3.out";
export const EASE_EXPO = "expo.out";

type Targets = gsap.TweenTarget;

/** Fade + rise in. No-ops (jumps to final state) under prefers-reduced-motion. */
export function fadeUp(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  if (prefersReducedMotion()) {
    return gsap.set(targets, { clearProps: "all" }) as unknown as gsap.core.Tween;
  }
  // fromTo + clearProps so a ScrollTrigger.refresh() mid-flight can never
  // re-capture the start offset as the end value and freeze elements.
  return gsap.fromTo(
    targets,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_OUT,
      immediateRender: true,
      clearProps: "transform,opacity",
      ...vars,
    }
  );
}

/** fadeUp across a group with a stagger. */
export function staggerReveal(targets: Targets, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return fadeUp(targets, { stagger: 0.08, ...vars });
}

export interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  /** Restores the original markup and accessibility tree. */
  revert: () => void;
}

/**
 * Splits an element's text into word + char spans while preserving nested
 * elements (so colored/styled spans inside headings keep their styling).
 * Accessibility: the parent gets aria-label with the full text; every split
 * span is aria-hidden so screen readers hear one intact string.
 */
export function splitText(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const label = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];

  const splitNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      for (const token of text.split(/(\s+)/)) {
        if (!token) continue;
        if (/^\s+$/.test(token)) {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const word = document.createElement("span");
        word.className = "split-word";
        word.setAttribute("aria-hidden", "true");
        for (const ch of Array.from(token)) {
          const c = document.createElement("span");
          c.className = "split-char";
          c.textContent = ch;
          word.appendChild(c);
          chars.push(c);
        }
        words.push(word);
        frag.appendChild(word);
      }
      node.parentNode?.replaceChild(frag, node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as HTMLElement).tagName === "BR") return;
      for (const child of Array.from(node.childNodes)) splitNode(child);
    }
  };

  for (const child of Array.from(el.childNodes)) splitNode(child);
  el.setAttribute("aria-label", label);

  return {
    chars,
    words,
    revert: () => {
      el.innerHTML = original;
      el.removeAttribute("aria-label");
    },
  };
}

export interface SplitRevealResult {
  tween: gsap.core.Tween | null;
  revert: () => void;
}

/**
 * Staggered char reveal: chars slide up out of a clip mask.
 * Under prefers-reduced-motion the text is left untouched (instant, no split).
 */
export function splitTextReveal(
  el: HTMLElement,
  vars: gsap.TweenVars = {}
): SplitRevealResult {
  if (prefersReducedMotion()) {
    return { tween: null, revert: () => {} };
  }

  const split = splitText(el);
  const tween = gsap.fromTo(
    split.chars,
    { yPercent: 110, clipPath: "inset(0% 0% 100% 0%)" },
    {
      yPercent: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.7,
      ease: EASE_EXPO,
      stagger: 0.03,
      immediateRender: true,
      ...vars,
      onComplete: () => {
        gsap.set(split.chars, { clearProps: "clipPath,yPercent,transform" });
        if (typeof vars.onComplete === "function") vars.onComplete();
      },
    }
  );

  return {
    tween,
    revert: () => {
      tween.kill();
      split.revert();
    },
  };
}

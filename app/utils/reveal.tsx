import type { ReactNode } from "react";

/**
 * Splits a heading into per-character spans so CSS can stagger them.
 * Words are kept intact (and never broken mid-word) by grouping each
 * word in an inline-block wrapper.
 */
export function splitRevealChars(text: string, startIndex = 0): ReactNode {
  let index = startIndex;

  return text.split(" ").map((word, wordIndex, words) => {
    const chars = Array.from(word).map((char) => {
      const node = (
        <span
          key={`${char}-${index}`}
          className="reveal-char"
          style={{ "--char-index": index } as React.CSSProperties}
        >
          {char}
        </span>
      );
      index += 1;
      return node;
    });

    return (
      <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
        {chars}
        {wordIndex < words.length - 1 ? " " : null}
      </span>
    );
  });
}

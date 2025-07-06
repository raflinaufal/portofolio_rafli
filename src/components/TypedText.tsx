"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  text: string;
}

export default function TypedText({ text }: TypedTextProps) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [text],
      typeSpeed: 40,
      backSpeed: 30,
      showCursor: true,
      loop: false,
    });
    return () => {
      typed.destroy();
    };
  }, [text]);

  return <span ref={el} />;
} 
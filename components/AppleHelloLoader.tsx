"use client";

import React from "react";

export function AppleHelloWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 850 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Corecraft"
      role="img"
    >
      <defs>
        <linearGradient
          id="apple-corecraft-ink"
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="48%" stopColor="#f5f5f7" />
          <stop offset="76%" stopColor="#e6ecff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <path
        className="ah-stroke ah-s1"
        pathLength={1000}
        d="M 158 76 C 148 46, 96 42, 66 84 C 40 120, 52 162, 100 162 C 132 162, 156 138, 174 114"
        stroke="url(#apple-corecraft-ink)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="ah-stroke ah-s2"
        pathLength={1000}
        d="M 174 114 C 160 124, 160 152, 186 154 C 212 156, 226 128, 214 106 C 204 90, 178 96, 174 114 C 190 122, 216 120, 238 104 C 238 122, 236 138, 234 152 C 238 126, 254 102, 272 104 C 282 105, 282 116, 294 116 C 310 116, 338 106, 356 96 C 366 90, 366 106, 354 118 C 340 130, 316 124, 316 110 C 312 144, 340 156, 372 146 C 392 140, 410 120, 428 106 C 440 96, 452 98, 456 106 C 442 94, 410 104, 406 130 C 402 154, 434 158, 462 142 C 478 134, 492 118, 504 104 C 502 122, 500 136, 498 152 C 502 126, 518 102, 536 104 C 546 105, 546 116, 558 116 C 570 116, 586 112, 602 104 C 616 96, 632 98, 636 108 C 622 96, 590 104, 586 130 C 582 152, 614 156, 634 128 C 636 120, 638 112, 638 106 C 636 124, 632 138, 634 148 C 636 154, 650 150, 670 132 C 696 108, 720 66, 718 50 C 716 36, 698 44, 692 86 L 672 204 C 668 224, 688 226, 698 194 C 706 168, 704 146, 734 132 C 756 122, 774 86, 782 58 L 768 134 C 764 154, 786 158, 822 134"
        stroke="url(#apple-corecraft-ink)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="ah-stroke ah-s3"
        pathLength={1000}
        d="M 664 102 C 686 99, 704 97, 724 96"
        stroke="url(#apple-corecraft-ink)"
        strokeWidth="12.5"
        strokeLinecap="round"
      />
      <path
        className="ah-stroke ah-s4"
        pathLength={1000}
        d="M 754 88 C 774 86, 794 84, 810 82"
        stroke="url(#apple-corecraft-ink)"
        strokeWidth="12.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

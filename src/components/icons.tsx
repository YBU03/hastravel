import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconBus = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 16V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10" />
    <path d="M4 11h16M4 16h16v2a1 1 0 0 1-1 1h-1M4 16v2a1 1 0 0 0 1 1h1" />
    <circle cx="7.5" cy="19" r="1.5" />
    <circle cx="16.5" cy="19" r="1.5" />
  </svg>
);
export const IconCalendar = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);
export const IconSwap = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
  </svg>
);
export const IconUser = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);
export const IconSeat = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4v9a2 2 0 0 0 2 2h7" />
    <path d="M9 15v5M16 15l2 5M7 4a1 1 0 0 1 2 0" />
    <path d="M11 11h6" />
  </svg>
);
export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const IconTicket = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z" />
    <path d="M14 6v12" strokeDasharray="2 2" />
  </svg>
);
export const IconHome = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconWallet = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M3 10h18M16 15h2M6 6l9-3 2 3" />
  </svg>
);
export const IconSnow = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
  </svg>
);
export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconChevronLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
export const IconChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const IconSteering = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2" />
    <path d="M3.5 10.5 10 12M20.5 10.5 14 12M12 14v7" />
  </svg>
);
export const IconWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden {...p}>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 12 2.2a9.8 9.8 0 0 1 0 19.6ZM12 0a12 12 0 0 0-10.3 18.1L0 24l6.1-1.6A12 12 0 1 0 12 0Z" />
  </svg>
);
export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

"use client";

import { useEffect, useState } from "react";

const IST_TIMEZONE = "Asia/Kolkata";

function formatIstTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: IST_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export function FooterIstClock() {
  const [time, setTime] = useState(() => formatIstTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatIstTime(new Date()));
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="footer-bar__clock" dateTime={time} suppressHydrationWarning>
      {time}
    </time>
  );
}

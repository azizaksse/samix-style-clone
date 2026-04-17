import { useEffect, useState } from "react";

function calc() {
  // Target: end of today + 1 day
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 2);
  target.setHours(0, 0, 0, 0);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const Item = ({ v, label }: { v: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-[44px] rounded-md bg-brand-dark px-2 py-1 text-center text-xl font-bold text-white tabular-nums">
        {String(v).padStart(2, "0")}
      </div>
      <span className="mt-1 text-[11px] text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3" dir="ltr">
      <Item v={t.days} label="يوم" />
      <span className="text-xl font-bold text-brand-dark">:</span>
      <Item v={t.hours} label="ساعة" />
      <span className="text-xl font-bold text-brand-dark">:</span>
      <Item v={t.minutes} label="دقيقة" />
      <span className="text-xl font-bold text-brand-dark">:</span>
      <Item v={t.seconds} label="ثانية" />
    </div>
  );
}

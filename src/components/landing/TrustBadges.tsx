import { Truck, ShieldCheck, Headphones } from "lucide-react";

export function TrustBadges() {
  const items = [
    { icon: Truck, title: "الدفع عند الاستلام", desc: "ادفع فقط بعد استلام الطلب" },
    { icon: ShieldCheck, title: "ضمانة 100%", desc: "منتج أصلي و مضمون الجودة" },
    { icon: Headphones, title: "خدمة العملاء", desc: "متاحة 7 أيام في الأسبوع" },
  ];
  return (
    <section className="border-y bg-background py-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

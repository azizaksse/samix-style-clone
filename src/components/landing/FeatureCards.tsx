import { Card, CardContent } from "@/components/ui/card";
import { Users, Wallet, MapPin } from "lucide-react";

export function FeatureCards() {
  const items = [
    {
      icon: Users,
      title: "أكثر من 2000 زبون راضي",
      desc: "آلاف العملاء جربوا Samix و حصلوا على نتائج مذهلة.",
    },
    {
      icon: Wallet,
      title: "الدفع عند الاستلام",
      desc: "ادفع فقط عندما يصلك المنتج، بدون أي مخاطرة.",
    },
    {
      icon: MapPin,
      title: "متوفر الآن في الجزائر",
      desc: "توصيل لكل ولايات الجزائر الـ 58 خلال 48 ساعة.",
    },
  ];
  return (
    <section id="features" className="py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="border-primary/20">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

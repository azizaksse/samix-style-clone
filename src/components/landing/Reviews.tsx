import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "أحمد م.", text: "نتيجة رائعة بعد شهر فقط من الاستعمال، اللحية بدأت تنبت في الفراغات.", rating: 5 },
  { name: "ياسين ب.", text: "منتج ممتاز و التوصيل كان سريع، أنصح به بشدة.", rating: 5 },
  { name: "كريم ز.", text: "جربت منتجات كثيرة و هذا الأفضل، شعر أكثف و أقوى.", rating: 5 },
  { name: "سفيان ع.", text: "الدفع عند الاستلام جعلني أثق في الطلب، و النتيجة لم تخيب ظني.", rating: 5 },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold">آراء عملائنا</h2>
          <p className="mt-2 text-muted-foreground">تقييم 4.9/5 من أكثر من 2000 زبون راضي</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <Card key={r.name}>
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

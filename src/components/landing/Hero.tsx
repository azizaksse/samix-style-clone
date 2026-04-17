import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const HERO_IMG =
  "https://assets.lightfunnels.com/account-49036/images_library/bd9e3001-9ccf-4fd5-b3d5-6ac019ae1f87.cbff2868-ebe6-4ee1-859a-a7d3fc81f706.SAMIX-LP_01_new.jpg.webp";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-8">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="mr-2 text-sm font-semibold">4.9/5</span>
        </div>
        <h1 className="text-3xl font-black leading-tight sm:text-4xl">
          <span className="text-primary">Samix</span> — سيروم إنبات الشعر و اللحية
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          تركيبة طبيعية تقوّي البصيلات، تملأ الفراغات و تعطي كثافة في وقت قصير.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border shadow-lg">
          <img
            src={HERO_IMG}
            alt="Samix - سيروم إنبات الشعر و اللحية"
            className="h-auto w-full object-cover"
          />
        </div>
        <Button
          onClick={scrollToForm}
          className="mt-6 h-12 w-full max-w-md bg-primary text-base font-bold hover:bg-primary/90"
        >
          املأ طلبك الآن هنا
        </Button>
      </div>
    </section>
  );
}

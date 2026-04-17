import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Truck, Sparkles } from "lucide-react";

const HERO_IMG =
  "https://assets.lightfunnels.com/account-49036/images_library/bd9e3001-9ccf-4fd5-b3d5-6ac019ae1f87.cbff2868-ebe6-4ee1-859a-a7d3fc81f706.SAMIX-LP_01_new.jpg.webp";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        {/* Text */}
        <div className="text-center md:text-right">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            الأكثر مبيعا في الجزائر
          </div>

          <h1 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-l from-primary to-blue-600 bg-clip-text text-transparent">Samix</span>
            <br />
            <span className="text-foreground">سيروم إنبات الشعر</span>
            <br />
            <span className="text-foreground">و اللحية</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground md:mx-0 md:text-lg">
            تركيبة طبيعية 100% تقوّي البصيلات، تملأ الفراغات و تمنحك كثافة ملحوظة في وقت قصير.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="mr-2 text-sm font-bold">4.9/5</span>
            </div>
            <span className="text-sm text-muted-foreground">+2000 زبون راضي</span>
          </div>

          <Button
            onClick={scrollToForm}
            className="mt-7 h-14 w-full rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:scale-[1.02] sm:w-auto"
            style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
          >
            اطلب الآن - الدفع عند الاستلام
          </Button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-muted-foreground md:justify-start">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              ضمان الجودة
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-primary" />
              توصيل لكل الولايات
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/20 blur-2xl"
            aria-hidden
          />
          <div
            className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-2 backdrop-blur"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <img
              src={HERO_IMG}
              alt="Samix - سيروم إنبات الشعر و اللحية"
              className="h-auto w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border bg-card px-4 py-3 shadow-lg sm:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
                <ShieldCheck className="h-5 w-5" style={{ color: "oklch(0.55 0.17 155)" }} />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">نتائج مضمونة</p>
                <p className="text-sm font-bold">خلال 30 يوم</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

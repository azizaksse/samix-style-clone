import { Leaf, Droplets, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const IMAGES = [
  "/Screen-Shot-2024-08-01-at-12.11.35-PM-1024x557.png",
  "/Screen-Shot-2024-08-01-at-12.11.42-PM-1024x557.png",
  "/2.png",
  "/IMG_20260417_221222_711.PNG",
];

const INGREDIENTS = [
  { icon: Droplets, name: "زيت السعد", desc: "يضعف جذور الشعر ويقلل من نموه تدريجياً" },
  { icon: Leaf, name: "زيت النمل", desc: "يبطئ نمو الشعر الزائد بشكل ملحوظ" },
  { icon: Droplets, name: "زيت شجرة الشاي", desc: "يهدئ البشرة ويمنع التهاب المسام" },
  { icon: Leaf, name: "خلاصة الصبار", desc: "يرطب البشرة بعمق بعد إزالة الشعر" },
  { icon: Sparkles, name: "فيتامين E", desc: "يغذي البشرة ويحافظ على مرونتها" },
];

export function Description() {
  return (
    <section className="bg-accent/30 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            تركيبة طبيعية 100%
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">وصف المنتج</h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-4 text-base leading-loose text-foreground/90">
          <p>
            <strong className="text-primary">Rova</strong> هو زيت طبيعي مصمم خصيصا ليكون بديلاً فعالاً وآمناً لليزر،
            يعمل على إضعاف بصيلات الشعر وتقليل نموه تدريجياً.
          </p>
          <p>
            تركيبته الطبية الغنية تحتوي على زيوت فعّالة تعالج جذور الشعر، و
            تمنحك بشرة ناعمة وخالية من الشعر الزائد المزعج لفترات طويلة.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 text-center text-xl font-extrabold">المكونات الرئيسية</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGES.map((src, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <img
                  src={src}
                  alt={`Rova product ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl border object-cover transition-transform hover:scale-[1.02] cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-1 bg-transparent border-none shadow-none text-white [&>button]:text-white">
                <img
                  src={src}
                  alt={`Rova product ${i + 1} expanded`}
                  className="h-auto w-full rounded-lg object-contain"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

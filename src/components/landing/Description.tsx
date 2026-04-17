import { Leaf, Droplets, Sparkles } from "lucide-react";

const IMAGES = [
  "https://assets.lightfunnels.com/account-49036/images_library/0f4f2fbd-886c-49a5-b981-6a5f5e8dde03.8d0fbe5d-1e0b-49ee-904c-551cfc21646b.SAMIX-LP_06_new.jpg%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/b66af022-fe8a-4bc0-89aa-3f25263394ba.4fa0af0a-1a89-4e14-a93e-8c7c1a2fe5ef.SAMIX-LP_05%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/9daeff43-0418-485b-b51a-16204997e471.78600bbe-ccbf-4688-bfa1-efb0abe3d8f8.SAMIX-LP_04_new.jpg%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/fb56f36c-26ed-4fcf-9873-cd3a3caef6a3.8abb3e1f-61aa-48d9-b82a-81ffa1c031d2.SAMIX-LP_03_neww.jpg%20(1).webp",
];

const INGREDIENTS = [
  { icon: Droplets, name: "زيت الخروع", desc: "يحفّز نمو الشعر و يقوي البصيلات" },
  { icon: Leaf, name: "زيت الأرغان", desc: "يرطّب و يغذي عمق فروة الرأس" },
  { icon: Droplets, name: "زيت الجوجوبا", desc: "يوازن إفراز الزيوت الطبيعية" },
  { icon: Leaf, name: "إكليل الجبل", desc: "ينشّط الدورة الدموية في فروة الرأس" },
  { icon: Sparkles, name: "البيوتين", desc: "فيتامين أساسي لصحة الشعر" },
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
            <strong className="text-primary">Samix</strong> هو سيروم طبيعي مصمم خصيصا لإنبات اللحية و الشعر،
            يعمل على تقوية البصيلات و ملء الفراغات في وقت قصير.
          </p>
          <p>
            تركيبته الغنية تحتوي على زيوت فعّالة و فيتامينات تعالج الضعف و توقف التساقط، و
            تعطي مظهر أكثف و أقوى للحية و الشعر.
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
            <img
              key={i}
              src={src}
              alt={`Samix product ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full rounded-xl border object-cover transition-transform hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

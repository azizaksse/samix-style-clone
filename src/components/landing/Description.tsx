const IMAGES = [
  "https://assets.lightfunnels.com/account-49036/images_library/0f4f2fbd-886c-49a5-b981-6a5f5e8dde03.8d0fbe5d-1e0b-49ee-904c-551cfc21646b.SAMIX-LP_06_new.jpg%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/b66af022-fe8a-4bc0-89aa-3f25263394ba.4fa0af0a-1a89-4e14-a93e-8c7c1a2fe5ef.SAMIX-LP_05%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/9daeff43-0418-485b-b51a-16204997e471.78600bbe-ccbf-4688-bfa1-efb0abe3d8f8.SAMIX-LP_04_new.jpg%20(1).webp",
  "https://assets.lightfunnels.com/account-49036/images_library/fb56f36c-26ed-4fcf-9873-cd3a3caef6a3.8abb3e1f-61aa-48d9-b82a-81ffa1c031d2.SAMIX-LP_03_neww.jpg%20(1).webp",
];

export function Description() {
  return (
    <section className="bg-accent/30 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-primary">وصف المنتج</h2>

        <div className="space-y-4 text-base leading-loose text-foreground/90">
          <p>
            <strong>Samix</strong> هو سيروم طبيعي مصمم خصيصا لإنبات اللحية و الشعر، يعمل على
            تقوية البصيلات و ملء الفراغات في وقت قصير.
          </p>
          <p>
            تركيبته الغنية تحتوي على زيوت فعّالة و فيتامينات تعالج الضعف و توقف التساقط، و
            تعطي مظهر أكثف و أقوى للحية و الشعر.
          </p>
          <p className="font-semibold">المكونات الرئيسية:</p>
          <ul className="list-disc space-y-1 pr-6 text-muted-foreground">
            <li>زيت الخروع — يحفّز نمو الشعر و يقوي البصيلات</li>
            <li>زيت الأرغان — يرطّب و يغذي عمق فروة الرأس</li>
            <li>زيت الجوجوبا — يوازن إفراز الزيوت الطبيعية</li>
            <li>إكليل الجبل (Rosemary) — ينشّط الدورة الدموية في فروة الرأس</li>
            <li>البيوتين — فيتامين أساسي لصحة الشعر</li>
          </ul>
          <p>
            مناسب للرجال الذين يعانون من ضعف نمو اللحية، فراغات في الذقن، أو تساقط الشعر.
            استخدمه يوميا للحصول على نتائج ملحوظة خلال أسابيع.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Samix product ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full rounded-lg border object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

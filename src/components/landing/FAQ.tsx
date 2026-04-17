import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    q: "كيف يستخدم سيروم Samix؟",
    a: "ضع بضع قطرات على المنطقة المراد علاجها (اللحية أو فروة الرأس) و دلّك بلطف لمدة دقيقتين. يستعمل مرة في اليوم، يفضل قبل النوم.",
  },
  {
    q: "متى تظهر النتائج؟",
    a: "أغلب المستخدمين يلاحظون نتائج أولية بعد 2 إلى 4 أسابيع، و نتائج كاملة بعد شهرين من الاستعمال المنتظم.",
  },
  {
    q: "هل له آثار جانبية؟",
    a: "Samix مكون من زيوت طبيعية 100%، و لا يسبب أي آثار جانبية. ينصح بتجربته على مساحة صغيرة من الجلد أولا في حال وجود حساسية.",
  },
  {
    q: "كم تستغرق مدة التوصيل؟",
    a: "التوصيل يستغرق من 24 إلى 72 ساعة حسب الولاية. سيتم التواصل معك هاتفيا لتأكيد الطلب قبل الإرسال.",
  },
  {
    q: "ما هي طريقة الدفع؟",
    a: "الدفع يتم عند الاستلام (Cash on Delivery)، تدفع المبلغ كاملا لعامل التوصيل عندما يصلك المنتج.",
  },
  {
    q: "هل يمكن إرجاع المنتج؟",
    a: "نعم، يمكن إرجاع المنتج خلال 7 أيام من الاستلام إذا كان المنتج معيبا أو غير مطابق للوصف.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-accent/30 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 text-center text-3xl font-extrabold">أسئلة و أجوبة</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {QUESTIONS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="rounded-lg border bg-card px-4"
            >
              <AccordionTrigger className="text-right font-semibold">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

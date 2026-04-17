import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
    <section id="faq" className="bg-accent/30 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">أسئلة و أجوبة</h2>
          <p className="mt-2 text-muted-foreground">كل ما تحتاج معرفته عن منتج Samix</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="rounded-xl border bg-card px-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <AccordionTrigger className="text-right text-base font-bold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { WILAYAS } from "./wilayas";
import { Countdown } from "./Countdown";

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [qty, setQty] = useState(1);
  const unit = 3200;
  const oldUnit = 3900;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!form.get("name") || !form.get("phone") || !form.get("wilaya")) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }
    setSubmitted(true);
    toast.success("تم استلام طلبك بنجاح، سنتصل بك قريبا");
  };

  return (
    <section id="order-form" className="bg-accent/40 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              عرض محدود
            </span>
            <Countdown />
          </div>

          <h2 className="mb-1 text-center text-2xl font-extrabold">
            Samix - سيروم إنبات الشعر و اللحية
          </h2>
          <p className="mb-4 text-center text-sm text-muted-foreground">30مل</p>

          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-3xl font-black text-primary">{unit * qty} دج</span>
            <span className="text-lg text-muted-foreground line-through">{oldUnit * qty} دج</span>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-primary/10 p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">شكرا لطلبك!</h3>
              <p className="text-sm text-muted-foreground">
                سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الطلب.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-center text-lg font-bold">
                للطلب، الرجاء إدخال التفاصيل
              </h3>

              <div className="space-y-1.5">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" name="name" placeholder="الاسم و اللقب" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" name="phone" type="tel" placeholder="0xxxxxxxxx" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="wilaya">الولاية</Label>
                <Select name="wilaya" required>
                  <SelectTrigger id="wilaya">
                    <SelectValue placeholder="اختر الولاية" />
                  </SelectTrigger>
                  <SelectContent>
                    {WILAYAS.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">البلدية / العنوان</Label>
                <Input id="address" name="address" placeholder="البلدية و العنوان الكامل" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qty">الكمية</Label>
                <Select value={String(qty)} onValueChange={(v) => setQty(Number(v))}>
                  <SelectTrigger id="qty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Accordion type="single" collapsible className="rounded-md border bg-background">
                <AccordionItem value="shipping" className="border-b">
                  <AccordionTrigger className="px-4">التوصيل</AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-muted-foreground">
                    التوصيل متوفر إلى جميع ولايات الجزائر الـ 58. سعر التوصيل يحدد حسب الولاية،
                    عند تأكيد الطلب هاتفيا.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="instructions" className="border-0">
                  <AccordionTrigger className="px-4">تعليمات</AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-muted-foreground">
                    تأكد من صحة المعلومات قبل تأكيد الطلب. سيتم الاتصال بك قبل إرسال الطلبية
                    لتأكيد العنوان والكمية.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                type="submit"
                className="h-14 w-full bg-primary text-base font-bold hover:bg-primary/90"
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                إشتري الآن - الدفع عند الاستلام
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

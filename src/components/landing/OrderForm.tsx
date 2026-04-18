import { useState, useRef } from "react";
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
import { CheckCircle2, ShoppingCart, Loader2 } from "lucide-react";
import { WILAYAS } from "./wilayas";
import { Countdown } from "./Countdown";
import { useSettings } from "@/hooks/useSettings";
import { fbEvent, ttEvent } from "@/components/PixelManager";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function OrderForm() {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [checkoutFired, setCheckoutFired] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const unit = settings.unitPrice;
  const oldUnit = settings.oldUnitPrice;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    const wilaya = form.get("wilaya") as string;
    const address = form.get("address") as string;

    if (!name || !phone || !wilaya) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    const orderData = {
      name,
      phone,
      wilaya,
      address,
      qty,
      total: unit * qty,
      date: new Date().toLocaleString("ar-DZ"),
    };

    setLoading(true);

    // Send to Google Sheets if URL is configured
    if (settings.googleSheetUrl) {
      try {
        const params = new URLSearchParams();
        Object.entries(orderData).forEach(([key, value]) => {
          params.append(key, String(value));
        });

        await fetch(`${settings.googleSheetUrl}?${params.toString()}`, {
          method: "GET",
          mode: "no-cors",
        });
      } catch (err) {
        console.error("Google Sheets submission failed:", err);
      }
    }

    setLoading(false);
    setSubmitted(true);
    // Fire Purchase event
    fbEvent("Purchase", { value: unit * qty, currency: "DZD", content_name: "Rova Oil" });
    ttEvent("CompletePayment", { value: unit * qty, currency: "DZD" });
    toast.success("تم استلام طلبك بنجاح، سنتصل بك قريبا");
  };

  return (
    <section id="order-form" className="bg-accent/40 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div
          className="rounded-3xl border bg-card p-5 sm:p-8"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="mb-5 flex flex-col items-center gap-3 text-center">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-extrabold text-primary-foreground"
              style={{ background: "var(--gradient-cta)" }}
            >
              ⚡ عرض محدود
            </span>
            <Countdown />
          </div>

          <h2 className="mb-1 text-center text-2xl font-extrabold sm:text-3xl">
            Rova - زيت بديل الليزر
          </h2>
          <p className="mb-5 text-center text-sm text-muted-foreground">30مل</p>

          <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl bg-primary/5 py-4">
            <span
              className="text-3xl font-black sm:text-4xl"
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {(unit * qty).toLocaleString()} دج
            </span>
            <span className="text-lg text-muted-foreground line-through">{(oldUnit * qty).toLocaleString()} دج</span>
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-bold text-destructive">
              -{Math.round((1 - unit / oldUnit) * 100)}%
            </span>
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4"
            onFocus={() => {
              if (!checkoutFired) {
                setCheckoutFired(true);
                fbEvent("InitiateCheckout", { content_name: "Rova Oil" });
                ttEvent("InitiateCheckout", { content_name: "Rova Oil" });
              }
            }}
          >
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
                disabled={loading}
                className="h-14 w-full rounded-full text-base font-bold text-primary-foreground transition-all hover:scale-[1.01] disabled:opacity-70"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
              >
                {loading ? (
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingCart className="ml-2 h-5 w-5" />
                )}
                {loading ? "جاري الإرسال..." : "إشتري الآن - الدفع عند الاستلام"}
              </Button>
            </form>
          )}
        </div>
        {/* Warning image below form */}
        <div className="mx-auto mt-5 max-w-2xl px-4">
          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/WARNING.webp"
                alt="تحذير هام"
                className="w-full cursor-pointer rounded-2xl border shadow-sm transition-transform hover:scale-[1.01] object-contain"
              />
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-1 bg-transparent border-none shadow-none [&>button]:text-white">
              <img src="/WARNING.webp" alt="تحذير" className="w-full rounded-xl" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
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
import { CheckCircle2, ShoppingCart, Loader2, AlertTriangle } from "lucide-react";
import { WILAYAS } from "./wilayas";
import { Countdown } from "./Countdown";
import { useSettings } from "@/hooks/useSettings";
import { fbEvent, ttEvent } from "@/components/PixelManager";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// ─── Validation helpers ──────────────────────────────────────────────────────

/** Algerian mobile: starts with 05/06/07, exactly 10 digits */
const PHONE_RE = /^(05|06|07)\d{8}$/;

/** Detect obviously fake phones: all same digit or perfectly sequential */
function isFakePhone(phone: string): boolean {
  if (/^(\d)\1{9}$/.test(phone)) return true; // 0555555555
  const digits = phone.split("").map(Number);
  const allSeq = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  const allRevSeq = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  return allSeq || allRevSeq;
}

/** Name must be ≥ 5 chars, no digits, at least one space (first + last name) */
function validateName(name: string): string | null {
  const cleaned = name.trim();
  if (cleaned.length < 5) return "الاسم قصير جداً، الرجاء كتابة الاسم الكامل";
  if (/\d/.test(cleaned)) return "الاسم لا يمكن أن يحتوي على أرقام";
  if (!cleaned.includes(" ")) return "الرجاء إدخال الاسم واللقب (مثال: فاطمة الزهراء)";
  return null;
}

function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s/g, "");
  if (!PHONE_RE.test(cleaned)) return "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05/06/07 ويحتوي 10 أرقام)";
  if (isFakePhone(cleaned)) return "رقم الهاتف يبدو غير حقيقي، الرجاء إدخال رقم صحيح";
  return null;
}

/** Session-level duplicate check */
const SENT_KEY = "rova_sent_phones";
function wasAlreadySent(phone: string): boolean {
  try {
    const raw = sessionStorage.getItem(SENT_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(phone);
  } catch { return false; }
}
function markAsSent(phone: string) {
  try {
    const raw = sessionStorage.getItem(SENT_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(phone)) {
      list.push(phone);
      sessionStorage.setItem(SENT_KEY, JSON.stringify(list));
    }
  } catch {}
}

/** Send data to a Google Apps Script webhook (no-cors fire-and-forget) */
async function sendToSheet(url: string, data: Record<string, string | number>) {
  if (!url) return;
  const params = new URLSearchParams();
  Object.entries(data).forEach(([k, v]) => params.append(k, String(v)));
  try {
    await fetch(`${url}?${params.toString()}`, { method: "GET", mode: "no-cors" });
  } catch (err) {
    console.error("Sheet send failed:", err);
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function OrderForm() {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [qty, setQty] = useState(1);
  const [checkoutFired, setCheckoutFired] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Convex mutations
  const convexCreateOrder = useMutation(api.orders.createOrder);
  const convexCreateLead = useMutation(api.orders.createNotEndedLead);

  // Time-gate: track when user first interacted with the form
  const formFocusedAt = useRef<number | null>(null);
  // Track if we already sent this phone to the "not-ended" sheet
  const notEndedSentRef = useRef(false);

  const unit = settings.unitPrice;
  const oldUnit = settings.oldUnitPrice;

  // ── "Not Ended" capture: fires instantly when valid 10 digits are typed ────
  const triggerLeadCapture = useCallback(
    async (phoneVal: string) => {
      const phone = phoneVal.replace(/\s/g, "");
      if (!phone || notEndedSentRef.current) return;
      if (phone.length !== 10) return; // wait until they finish typing 10 digits
      if (!PHONE_RE.test(phone) || isFakePhone(phone)) return;

      notEndedSentRef.current = true;
      const nameEl = formRef.current?.querySelector<HTMLInputElement>('[name="name"]');
      const name = nameEl?.value?.trim() || "—";

      if (settings.googleSheetNotEndedUrl) {
        sendToSheet(settings.googleSheetNotEndedUrl, {
          التاريخ: new Date().toLocaleString("ar-DZ"),
          الاسم: name,
          الهاتف: phone,
          الحالة: "لم يُكمل الطلب",
        }).catch(console.error);
      }
      // Save lead to Convex
      convexCreateLead({ name, phone }).catch(console.error);
    },
    [settings.googleSheetNotEndedUrl, convexCreateLead]
  );

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // ① Honeypot
    const honeypot = form.get("website") as string;
    if (honeypot) { setSubmitted(true); return; }

    const name    = (form.get("name")    as string).trim();
    const phone   = (form.get("phone")   as string).replace(/\s/g, "");
    const wilaya  =  form.get("wilaya")  as string;
    const address = (form.get("address") as string).trim();

    // ② Required fields
    if (!name || !phone || !wilaya) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    // ③ Validate name
    const nameError = validateName(name);
    if (nameError) {
      setFieldErrors((p) => ({ ...p, name: nameError }));
      toast.error(nameError);
      return;
    }

    // ④ Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setFieldErrors((p) => ({ ...p, phone: phoneError }));
      toast.error(phoneError);
      return;
    }

    // ⑤ Duplicate
    if (wasAlreadySent(phone)) {
      toast.error("لقد أرسلت طلباً بهذا الرقم مسبقاً. تواصل معنا إذا أردت تعديله.");
      return;
    }

    // ⑥ Time-gate
    const elapsed = formFocusedAt.current ? Date.now() - formFocusedAt.current : 99999;
    if (elapsed < 4000) { setSubmitted(true); return; }

    // ── ✅ Validation passed — show success INSTANTLY (no network wait) ───────
    setFieldErrors({});
    markAsSent(phone);
    setSubmitted(true);
    toast.success("تم استلام طلبك بنجاح، سنتصل بك قريباً ✅");

    // Pixel events — in-memory, instant
    fbEvent("Purchase", { value: unit * qty, currency: "DZD", content_name: "Rova Oil" });
    ttEvent("CompletePayment", { value: unit * qty, currency: "DZD" });

    // ── Fire network sends IN THE BACKGROUND — customer never waits ───────────
    const sheetData = {
      name, phone, wilaya,
      address: address || "—",
      qty:   String(qty),
      total: `${(unit * qty).toLocaleString()} دج`,
    };

    sendToSheet(settings.googleSheetUrl, sheetData).catch(console.error);

    convexCreateOrder({
      name, phone, wilaya,
      address: address || undefined,
      qty,
      total: unit * qty,
    }).catch(console.error);
  };

  const clearError = (field: string) =>
    setFieldErrors((p) => { const n = { ...p }; delete n[field]; return n; });

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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              onFocus={() => {
                // Record first interaction time for time-gate
                if (!formFocusedAt.current) formFocusedAt.current = Date.now();
                // Pixel event
                if (!checkoutFired) {
                  setCheckoutFired(true);
                  fbEvent("InitiateCheckout", { content_name: "Rova Oil" });
                  ttEvent("InitiateCheckout", { content_name: "Rova Oil" });
                }
              }}
            >
              {/* ── Honeypot (hidden from real users, bots fill it) ── */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <h3 className="text-center text-lg font-bold">
                للطلب، الرجاء إدخال التفاصيل
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">الاسم الكامل <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="الاسم واللقب (مثال: فاطمة الزهراء)"
                  required
                  onChange={() => clearError("name")}
                  className={fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErrors.name && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">رقم الهاتف <span className="text-destructive">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="05xxxxxxxx / 06xxxxxxxx / 07xxxxxxxx"
                  required
                  maxLength={10}
                  onBlur={(e) => triggerLeadCapture(e.target.value)}
                  onChange={(e) => {
                    clearError("phone");
                    triggerLeadCapture(e.target.value);
                  }}
                  className={fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErrors.phone && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{fieldErrors.phone}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground">يجب أن يبدأ بـ 05 أو 06 أو 07 ويحتوي 10 أرقام</p>
              </div>

              {/* Wilaya */}
              <div className="space-y-1.5">
                <Label htmlFor="wilaya">الولاية <span className="text-destructive">*</span></Label>
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

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="address">البلدية / العنوان</Label>
                <Input id="address" name="address" placeholder="البلدية والعنوان الكامل" />
              </div>

              {/* Qty */}
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
                className="h-14 w-full rounded-full text-base font-bold text-primary-foreground transition-all hover:scale-[1.01]"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                إشتري الآن - الدفع عند الاستلام
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

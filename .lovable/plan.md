
## Clone of Samix landing page (Arabic / RTL)

I'll build a single-route landing page that mirrors the structure, content and visual feel of `beautysspot.shop/samix-tiktok`. Layout is RTL Arabic, mobile-first with a centered max-width column.

### Page sections (top → bottom)

1. **Header** — Beauty Spot logo (left in RTL flow) + nav links: أسئلة و أجوبة، مميزات، مراجعات، تواصل معنا. CTA button "اشتري الآن" scrolls to order form.
2. **Hero banner image** — main SAMIX promotional image (the bottle + "4.9/5" rating + before/after).
3. **Product image carousel/stack** — the 6 SAMIX-LP marketing images shown in sequence.
4. **Limited offer + countdown** — "عرض محدود" with a live countdown (days:hours:minutes:seconds).
5. **Product info block**
   - Title: "Samix - سيروم انبات الشعر و اللحية -- 30مل"
   - Description paragraphs (natural serum, strengthens follicles, fast results…)
   - Price: **DZD 3,200** with old price **DZD 3,900** struck through.
6. **Order form** — "للطلب, الرجاء ادخال التفاصيل":
   - Full name, phone, wilaya (select with all 58 Algerian wilayas), commune/address, quantity.
   - Shipping accordion ("التوصيل") and instructions accordion ("تعليمات") with the warning image.
   - Big CTA: "إشتري الان - الدفع عند الإستلام". Submits to a thank-you state (no backend).
7. **Trust badges row** — three icons: الدفع عند الاستلام، ضمانة 100%، خدمة العملاء.
8. **Reviews section** — 5-star header + a few testimonial cards with avatars, names and Arabic review text (generic placeholders).
9. **Product description section** ("وصف المنتج")
   - Full Arabic copy as on source: what Samix is, ingredients (Castor, Argan, Jojoba, Rosemary, Biotin), who it's for, why it's trending, how to order.
   - Gallery row of all 6 product images.
10. **Three feature cards** — أكثر من ألفين زبون راضي، الدفع عند الاستلام، الان متاح في الجزائر (each with icon + paragraph).
11. **FAQ accordion** ("أسئلة و أجوبة") — 5–6 common questions about usage, results timeline, side effects, delivery, payment, returns.
12. **Footer** — links (تواصل معنا، سياسة الخصوصية، شروط الخدمة، شروط الإسترجاع), payment provider logos, "Copyright © 2025".

### Design / styling
- RTL (`dir="rtl"`, `lang="ar"`) on the root.
- Color palette matched to source: white background, black text, **bright blue accent** (~#1FB6F6 / sky-blue) for headings, buttons and ribbons, dark navy for the dark CTA bar.
- Arabic web font (Cairo or Tajawal via Google Fonts).
- Tailwind for layout; shadcn `Accordion`, `Button`, `Input`, `Select`, `Card`.
- Reuse the original public image URLs from `assets.lightfunnels.com` so the visuals match exactly.
- Sticky/floating "اشتري الآن" button on mobile that scrolls to the order form.

### Routes & files
- `src/routes/index.tsx` — full landing page (replaces placeholder).
- `src/components/landing/` — `Header`, `Hero`, `Countdown`, `OrderForm`, `TrustBadges`, `Reviews`, `Description`, `FeatureCards`, `FAQ`, `Footer`.
- Add Arabic font import + RTL base styles in `src/styles.css`.
- Update `__root.tsx` head: title "Samix - سيروم انبات الشعر و اللحية", Arabic description, set `<html lang="ar" dir="rtl">`.

### Out of scope
- No real checkout / payment processing — order form just shows a success toast.
- No analytics / TikTok pixel.
- Affiliate/tracking links replaced with `#` anchors.

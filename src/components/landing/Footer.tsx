import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t py-12 text-white/90"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-white text-primary-foreground"
              >
                <img src="/LOGO .webp" alt="Rova Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-lg font-extrabold text-white">Rova</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              منتجات العناية الطبيعية الأصلية، توصيل لكل ولايات الجزائر مع الدفع عند الاستلام.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">روابط مفيدة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-white/70 transition-colors hover:text-white">المميزات</a></li>
              <li><a href="#reviews" className="text-white/70 transition-colors hover:text-white">المراجعات</a></li>
              <li><a href="#faq" className="text-white/70 transition-colors hover:text-white">أسئلة و أجوبة</a></li>
              <li><a href="#" className="text-white/70 transition-colors hover:text-white">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-white/70 transition-colors hover:text-white">شروط الإسترجاع</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0xxx-xx-xx-xx</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@beautysspot.shop</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> الجزائر</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/60">
            Copyright © 2025 Rova. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t bg-brand-dark py-10 text-white/90">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a href="#" className="hover:text-white">تواصل معنا</a>
          <span className="text-white/30">·</span>
          <a href="#" className="hover:text-white">سياسة الخصوصية</a>
          <span className="text-white/30">·</span>
          <a href="#" className="hover:text-white">شروط الخدمة</a>
          <span className="text-white/30">·</span>
          <a href="#" className="hover:text-white">شروط الإسترجاع</a>
        </div>
        <p className="text-center text-xs text-white/60">
          Copyright © 2025 Beauty Spot. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}

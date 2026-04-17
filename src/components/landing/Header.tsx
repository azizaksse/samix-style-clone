import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-black">
            BS
          </div>
          <span className="text-lg font-bold">Beauty Spot</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#faq" className="hover:text-primary">أسئلة و أجوبة</a>
          <a href="#features" className="hover:text-primary">مميزات</a>
          <a href="#reviews" className="hover:text-primary">مراجعات</a>
          <a href="#footer" className="hover:text-primary">تواصل معنا</a>
        </nav>
        <Button onClick={scrollToForm} className="bg-primary hover:bg-primary/90">
          اشتري الآن
        </Button>
      </div>
    </header>
  );
}

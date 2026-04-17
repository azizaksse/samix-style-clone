import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function StickyCTA() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
      <Button
        onClick={scrollToForm}
        className="h-12 w-full rounded-full text-base font-bold text-primary-foreground"
        style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
      >
        <ShoppingCart className="ml-2 h-5 w-5" />
        اشتري الآن - الدفع عند الاستلام
      </Button>
    </div>
  );
}

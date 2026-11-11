
import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <button
      onClick={() =>
        openWhatsApp(
          "Hello, I need help regarding school homework and assignments."
        )
      }
      aria-label="Contact school through WhatsApp"
      title="Contact us on WhatsApp"
      className="fixed bottom-6 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition hover:scale-105"
    >
      <MessageCircle size={27} />
    </button>
  );
}

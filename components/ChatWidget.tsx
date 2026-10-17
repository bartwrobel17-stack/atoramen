"use client";

import { useState } from "react";
import { MessageCircle, X, Send, MapPin, Utensils, Clock, Phone } from "lucide-react";
import { DEFAULT_DATA } from "../lib/data";

type Message = { from: "bot" | "user"; text: string };

const address = "Odrzańska 4/5, 50-113 Wrocław";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=Odrza%C5%84ska+4%2F5%2C+50-113+Wroc%C5%82aw";

function answerFor(raw: string): string {
  const q = raw.toLocaleLowerCase("pl");
  if (/menu|cena|ceny|koszt|ile|ramen|miska|danie|jedzen/.test(q)) {
    return "Aktualne pozycje w menu (ceny z tej strony):\n" +
      DEFAULT_DATA.menuItems.map((item) => `• ${item.name} — ${item.price}`).join("\n") +
      "\n\nSzczegóły znajdziesz w sekcji „Menu”. Dostępność pozycji może się zmieniać.";
  }
  if (/adres|gdzie|dojazd|map|lokaliz|trafić/.test(q)) {
    return `Jesteśmy przy ${address}. Kliknij „Pokaż mapę”, aby wyznaczyć trasę.`;
  }
  if (/godzin|otwar|czynni|zamyk|kiedy/.test(q)) {
    return "Na stronie podano, że lokal zamyka się o 22:00, ale godziny mogą się zmieniać. Przed wizytą sprawdź aktualne informacje w profilu lokalu lub skontaktuj się bezpośrednio.";
  }
  if (/rezerw|stolik|miejsce/.test(q)) {
    return "Nie mam potwierdzonych informacji o aktualnych zasadach rezerwacji. Najlepiej sprawdzić bezpośrednio u lokalu przed wizytą.";
  }
  if (/dostaw|dowoz|na wynos|zamów|zamow/.test(q)) {
    return "Nie mam tu potwierdzonych aktualnych opcji dostawy. Sprawdź informacje bezpośrednio u lokalu lub w używanej przez niego aplikacji zamówień.";
  }
  if (/weget|wege|wegan|alerg|gluten|uczulen|skład|sklad/.test(q)) {
    return "Nie mam pełnych informacji o alergenach ani składzie wszystkich dań. W sprawie alergii lub diety koniecznie potwierdź skład bezpośrednio z obsługą.";
  }
  if (/kontakt|telefon|dzwon|email|e-mail/.test(q)) {
    return "Na tej stronie nie podano numeru telefonu ani adresu e-mail. Możesz sprawdzić lokal w mapach i skorzystać z dostępnych tam danych kontaktowych.";
  }
  return "Mogę pomóc znaleźć menu i ceny, adres oraz podstawowe informacje o godzinach. Spróbuj jednego z przycisków poniżej. W sprawie rezerwacji, alergenów lub szczegółów zamówienia najlepiej potwierdzić informacje bezpośrednio z lokalem.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Cześć! 👋 Jestem wirtualnym pomocnikiem ATO Ramen. Mogę pomóc z menu, cenami i dojazdem. O co chcesz zapytać?" }
  ]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { from: "user", text: clean }, { from: "bot", text: answerFor(clean) }]);
    setInput("");
  }

  return (
    <>
      <button className="ato-chat-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? "Zamknij czat" : "Otwórz czat"}>
        {open ? <X size={20} /> : <><MessageCircle size={19} /> <span>Zapytaj ATO</span></>}
      </button>
      {open && (
        <section className="ato-chat-panel" aria-label="Czat ATO Ramen">
          <header className="ato-chat-header">
            <div className="ato-chat-mark">ATO</div>
            <div className="ato-chat-heading"><strong>Pomocnik ATO</strong><span>Menu · ceny · dojazd</span></div>
            <button onClick={() => setOpen(false)} aria-label="Zamknij czat" className="ato-chat-close"><X size={18} /></button>
          </header>
          <div className="ato-chat-messages" aria-live="polite">
            {messages.map((message, index) => <div className={`ato-chat-bubble ${message.from}`} key={index}>{message.text}</div>)}
            <div className="ato-chat-quick">
              <button onClick={() => send("Pokaż menu i ceny")}><Utensils size={13} /> Menu i ceny</button>
              <button onClick={() => send("Gdzie jesteście?")}><MapPin size={13} /> Adres</button>
              <button onClick={() => send("Jakie są godziny otwarcia?")}><Clock size={13} /> Godziny</button>
            </div>
          </div>
          <div className="ato-chat-links">
            <a href="#menu" onClick={() => setOpen(false)}>Zobacz menu</a>
            <a href={mapUrl} target="_blank" rel="noreferrer">Pokaż mapę</a>
          </div>
          <form className="ato-chat-form" onSubmit={(event) => { event.preventDefault(); send(input); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Napisz pytanie…" aria-label="Wpisz pytanie" maxLength={500} />
            <button type="submit" aria-label="Wyślij" disabled={!input.trim()}><Send size={16} /></button>
          </form>
          <p className="ato-chat-disclaimer">Automatyczne odpowiedzi bez AI. Informacje mogą wymagać potwierdzenia przez lokal.</p>
        </section>
      )}
    </>
  );
}

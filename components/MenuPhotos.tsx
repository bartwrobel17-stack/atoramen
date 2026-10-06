import type { MenuPhoto } from "../lib/data";

export function MenuPhotos({ items }: { items: MenuPhoto[] }) {
  return (
    <section id="full-menu" className="full-menu section">
      <div className="section-kicker">04 / PEŁNA KARTA MENU</div>
      <div className="full-menu-title">
        <h2>Cała karta.<br /><em>Bez skrótów.</em></h2>
        <p>Właściciel może podmienić te strony bez dotykania kodu.</p>
      </div>
      {items.length === 0 ? (
        <div className="empty-menu">Pełne zdjęcia karty menu pojawią się tutaj.</div>
      ) : (
        <div className="menu-pages">
          {items.map((item, index) => (
            <img key={item.id} src={item.src} alt={"Strona karty menu " + (index + 1)} />
          ))}
        </div>
      )}
    </section>
  );
}
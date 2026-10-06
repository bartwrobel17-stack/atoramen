# ATO Ramen Wrocław

Premium, editorialowa strona dla ATO Ramen przy Odrzańskiej 4/5 we Wrocławiu. Projekt zbudowany od zera w Next.js, React i TypeScript.

## Stack
Next.js App Router, React, TypeScript, CSS, Vercel.

## Uruchomienie
npm install
npm run dev

## Panel właściciela
Panel: /owner. Pozwala niezależnie zarządzać galerią, pozycjami menu oraz pełnymi zdjęciami karty menu. Upload wielu zdjęć działa bez edycji kodu.

## Ważne: wersja demo
Dane panelu są obecnie zapisywane w localStorage przeglądarki. Zmiany są lokalne dla konkretnej przeglądarki/urządzenia i nie są jeszcze współdzielone między użytkownikami. To przygotowanie UI pod późniejszą migrację.

## Migracja do Supabase
Zachowaj typy z lib/data.ts, przenieś kolekcje gallery, menuItems i menuPhotos do tabel, a obrazy do Supabase Storage. Następnie zastąp odczyt/zapis localStorage repozytorium API lub server actions. Upload plików pozostaje osobnym systemem od danych menu.

## SEO
Dodano metadata, canonical, Open Graph, sitemap i robots. Nie dodano fikcyjnych godzin, cen ani numeru telefonu.

## Vercel
Po podpięciu repo do Vercel projekt powinien zostać wykryty jako Next.js. Build: npm run build.

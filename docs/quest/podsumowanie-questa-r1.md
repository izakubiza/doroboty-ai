# Quest „Rozwiń DoRoboty.ai”: podsumowanie do zaliczenia

Wersja 1 · 8.11.2026

## 1. Checklista questa

| Punkt z checklisty                                                              | Stan                          | Gdzie to widać                                                                                |
| ------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| Wybrałam problem i rozwiązanie na podstawie swojego discovery                   | Zrobione                      | Decyzja z Supersprintu: `3-Projects/doroboty-ai/supersprint/week-2/06-decision.md` (pomysł 3) |
| Opisałam problem użytkownika, jego zadanie i po czym poznam, że prototyp działa | Zrobione w tym pliku          | Punkty 3–4 poniżej, gotowe do wklejenia w post                                                |
| Rozwinęłam projekt DoRoboty.ai i sprawdziłam testowaną ścieżkę                  | Zrobione                      | Punkt 5 poniżej                                                                               |
| Opublikowałam prototyp w AI Prototype Arena na Circle                           | **Do zrobienia przez Ciebie** | Tekst posta: punkt 6                                                                          |
| Wkleiłam screenshot prototypu do questa                                         | **Do zrobienia przez Ciebie** | Który ekran: punkt 7                                                                          |

Kryteria „po czym poznasz, że zadanie jest gotowe”:

- **Związek discovery → problem → prototyp.** Prototyp realizuje dokładnie pomysł 3 z decyzji z 1.11.2026.
- **Zadanie da się wykonać od początku do wyniku.** Rekruterka przegląda listę, filtruje, wchodzi w szczegóły, podejmuje decyzję i wraca na listę.
- **Wcześniejsze funkcje działają.** Wybór osoby, wysłanie aplikacji przez kandydata, decyzje rekrutacyjne i widok kandydata zostały sprawdzone w przeglądarce.
- **Opis wskazuje symulacje.** Opisuje je punkt 6, sekcja „Co działa naprawdę, a co jest symulacją”.

## 2. Związek z discovery

Decyzja z Supersprintu (1.11.2026) brzmiała: przy każdym zgłoszeniu rekruterka widzi trzy zdania (co kandydat zrobił sam, co robił zespół i w jakim projekcie) oraz 2–3 pytania do pierwszej rozmowy.

Sygnały, które za nią stały (dane case'u, czerwiec 2026):

- 4 z 4 rozmówców z firm (F1–F4) mówią, że ze zgłoszenia nie widzą, co kandydat zrobił sam. _Deklaracja_
- Firma przechodziła do kolejnego etapu po 403 z 1 044 rozmów z osobami, które opisały własną pracę (39%). Przy osobach w roli pomocniczej było to 79 z 594 rozmów (13%). _Obserwacja_
- Asystent pisania usuwał zdanie o własnej pracy z 7 414 z 10 686 odpowiedzi. _Obserwacja_
- Żadne z badanych rozwiązań konkurencji (No Fluff Jobs, LinkedIn, TestGorilla) nie pokazuje tego rekruterowi przed rozmową.

## 3. Dla kogo i jaki problem

**Dla pracodawcy, czyli rekruterki.** W scenariuszu jest to Karolina Wiśniewska z BrightLabs, która prowadzi rekrutację na stanowisko AI Product Manager.

Problem: rekruterka nie widzi w zgłoszeniu, co kandydat zrobił sam, a co zrobił jego zespół. Osoby, które opisały własną pracę, giną więc w liście obok osób z podobnym Match Score, które tylko pomagały.

## 4. Zadanie i po czym poznam, że prototyp działa

**Zadanie rekruterki:** z 8 aktualnych zgłoszeń o podobnym Match Score (70–77%) wybrać osoby, które opisały własną pracę, przygotować się do pierwszej rozmowy z jedną z nich i zapisać decyzję.

**Prototyp działa, jeśli rekruterka:**

1. Na liście „Kandydaci” bez otwierania zgłoszeń widzi, które z nich mają różową etykietę „★ Dodany opis własnej pracy”. Ma ją 5 z 8 aktualnych zgłoszeń.
2. Na każdym kaflu czyta trzy zdania: własny wkład, zespół i projekt. Przy osobach w roli pomocniczej widzi pogrubione „Nie opisuje własnej części pracy” albo „Nie opisuje własnych decyzji”.
3. Zaznacza „Pokaż tylko kandydatów z opisem własnej pracy” i lista zawęża się do 5 osób.
4. Klika „Zobacz szczegóły” i widzi to samo podsumowanie oraz 2–3 pytania na pierwszą rozmowę.
5. Klika przycisk decyzji, np. „Wyślij zaproszenie na rozmowę”. Etap zmienia się na liście i w historii, a decyzja zostaje po odświeżeniu strony.
6. Wraca na listę przyciskiem „Wróć na listę kandydatów”.

Prototyp nie mierzy, czy rekruterki zapraszają dzięki temu inne osoby. To sprawdzi dopiero test 1 z discovery, z prawdziwymi rekruterkami.

## 5. Co zbudowałam i co sprawdziłam

Zbudowane w kopii DoRoboty.ai (widok pracodawcy, `/#/app/kandydaci`):

- **8 nowych przykładowych zgłoszeń** do jednego ogłoszenia. 4 osoby opisują własną pracę, a 4 pracowały w roli pomocniczej. Match Score jest podobny (70–77%). Na liście jest też wcześniejszy przykład Marka Nowaka.
- **Kafel kandydata** zawiera:
  - datę zgłoszenia, liczbę dni oczekiwania na decyzję i etykietę „Aktualne” albo „Nieaktualne”,
  - Match Score jako pierścień w prawym górnym rogu,
  - etykietę „Dodany opis własnej pracy”,
  - pasek etapów rekrutacji (6 etapów),
  - blok „Co kandydat zrobił sam”, w którym wiersz „Własny wkład” jest wyróżniony zielonym tłem,
  - przycisk „Zobacz szczegóły”.
- **Filtry i sortowanie.** Dwa filtry: „Pokaż tylko aktualne zgłoszenia” (domyślnie włączony) i „Pokaż tylko kandydatów z opisem własnej pracy”. Sortowanie według Match Score, daty albo nazwiska, z widocznym kierunkiem.
- **Strona kandydata** zawiera:
  - podsumowanie i pytania na pierwszą rozmowę,
  - przyciski decyzji nazwane czynnościami: „Oznacz jako przejrzane”, „Wyślij zaproszenie na rozmowę”, „Potwierdź odbytą rozmowę”, „Zaproś do kolejnego etapu”, „Zatrudnij”, „Odrzuć kandydata”,
  - przycisk „Wróć na listę kandydatów”.
- **Widok kandydata bez zmian.** Kandydat nie widzi podsumowania ani etykiety przy swojej aplikacji.

Sprawdzone 7–8.11.2026:

- W przeglądarce, jako Karolina:
  - lista pokazuje 8 aktualnych zgłoszeń, z czego 5 z etykietą,
  - filtr zawęża listę do 5,
  - po odznaczeniu „tylko aktualne” lista ma 9 zgłoszeń, w tym wycofane zgłoszenie Natalii,
  - „Zobacz szczegóły” otwiera stronę kandydata,
  - „Potwierdź odbytą rozmowę” zmienia etap i dodaje wpis do historii,
  - „Wróć na listę kandydatów” wraca na listę.
- W przeglądarce, jako Anna: wysłana przez nią aplikacja dostaje przygotowane podsumowanie, a w widoku kandydata go nie widać.
- Lista mieści się na ekranie telefonu (375 px).
- Automatyczne sprawdzenia: typy, lint, 40 testów jednostkowych i build przechodzą.
- **Nie uruchomione:**
  - Testy przeglądarkowe (Playwright), bo na komputerze nie ma do nich przeglądarki Chromium. Nazwy przycisków w tych testach są poprawione.
  - 3 sprawdzenia formatu plików całego repozytorium. Nie przechodzą przez końce linii Windows (CRLF) ustawione przy klonowaniu, a nie przez zmiany z tego questa.

Nie zbudowane, świadomie odłożone: warunek po stronie kandydata, czyli to, że asystent pisania nie usuwa zdania o własnej pracy.

## 6. Tekst posta do AI Prototype Arena (do skopiowania)

> **DoRoboty.ai: rekruterka widzi, co kandydat zrobił sam**
>
> **Problem.** W moim discovery 4 z 4 rozmówców z firm mówili, że ze zgłoszenia nie widzą, co kandydat zrobił sam, a co jego zespół. W danych case'u z czerwca 2026 firma szła dalej po 39% rozmów z osobami, które opisały własną pracę (403 z 1 044), i po 13% rozmów z osobami w roli pomocniczej (79 z 594). Asystent pisania usuwał to zdanie z 7 414 z 10 686 odpowiedzi. Takie osoby giną więc na liście obok kandydatów z podobnym Match Score.
>
> **Rozwiązanie (dla pracodawcy).** Przy każdym zgłoszeniu rekruterka widzi trzy zdania: co kandydat zrobił sam, co robił zespół i w jakim projekcie. Zgłoszenia z opisem własnej pracy mają etykietę „Dodany opis własnej pracy” i można je odfiltrować. Na stronie kandydata są 2–3 pytania na pierwszą rozmowę i przyciski decyzji nazwane czynnościami („Wyślij zaproszenie na rozmowę”, „Odrzuć kandydata”).
>
> **Po czym poznam, że prototyp działa.** Rekruterka Karolina ma 8 aktualnych zgłoszeń z Match Score 70–77%. Bez otwierania zgłoszeń widzi, że 5 z nich ma opis własnej pracy, a przy pozostałych czyta „Nie opisuje własnej części pracy”. Filtr zawęża listę do tych 5. Wchodzi w szczegóły, czyta pytania na rozmowę, wysyła zaproszenie i widzi zmieniony etap na liście.
>
> **Co działa naprawdę, a co jest symulacją.**
>
> - Działa naprawdę: lista, etykieta, filtry, sortowanie, strona kandydata, zmiana etapu z historią i zapisem w przeglądarce, wysłanie aplikacji przez kandydata.
> - Symulacja: podsumowania w trzech zdaniach, pytania na rozmowę i Match Score są przygotowane ręcznie w danych scenariusza. Żaden model AI ich nie generuje i prototyp nie mówi nic o tym, jak trafnie zrobiłby to model. Kandydaci i firma są fikcyjni. Dane zapisują się tylko w tej przeglądarce.
> - Nie zbudowane: zmiana asystenta pisania po stronie kandydata.
>
> **Czego jeszcze nie wiem.** Czy podsumowanie zmienia, kogo rekruterka zaprasza, czy tylko skraca wybór. To sprawdzi test z prawdziwymi rekruterkami.

Do posta dołącz 2–3 screenshoty (punkt 7).

## 7. Screenshoty

Przed zrobieniem zrzutów ekranu:

- **Do questa (1 zrzut):** lista „Kandydaci” jako Karolina, przewinięta tak, żeby widać było dwa kafle obok siebie: Jakuba („Nie opisuje własnej części pracy”) i Pawła (etykieta i zielony wiersz „Własny wkład”). Ten kontrast najlepiej pokazuje rozwiązanie.
- **Do posta dodatkowo:**
  - lista z zaznaczonym filtrem „Pokaż tylko kandydatów z opisem własnej pracy”,
  - strona kandydata z blokiem „Co kandydat zrobił sam”, pytaniami na rozmowę i przyciskami decyzji.

Uwaga:

- Liczba dni oczekiwania i ich kolory liczą się od dzisiejszej daty, więc z czasem się zmieniają.
- W tej przeglądarce Michał jest już na etapie „Rozmowa odbyta”, bo testowałam przyciski. Ustawienia → „Resetuj scenariusz” przywraca stan początkowy, potem trzeba ponownie wybrać Karolinę.

## 8. Opcjonalnie

Quest nie wymaga publikacji aplikacji ani wysłania zmian na GitHub. Zmiany są tylko na tym komputerze, nie są zapisane w Gicie. Jeśli chcesz mieć je w swoim forku, zrób commit i wyślij je na GitHub.

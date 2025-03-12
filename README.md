# Kurs RxJS

Repozytorium zawiera materiały do kursu RxJS z TypeScript. Każda lekcja znajduje się w osobnym katalogu w `src/lessons`.

## Struktura projektu 

```
/
├── src/
│   ├── index.html
│   └── index.ts
├── lessons/
│   ├── 1/
│   │   ├── index.html    # Zawiera opis lekcji i przykłady
│   │   └── index.ts      # Implementacja przykładów
│   └── 2/
│       ├── index.html    # Zawiera opis lekcji i przykłady
│       └── index.ts      # Implementacja przykładów
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Zawartość lekcji

Każda lekcja zawiera:
- Szczegółowy opis tematu w pliku `index.html`
- Listę omawianych koncepcji
- Praktyczne przykłady z kodem
- Interaktywne demonstracje
- Implementację przykładów w pliku `index.ts`

Lekcje obejmują:
1. Podstawy Observable i Subskrypcji
2. Zarządzanie subskrypcjami
3. Cykl życia Observable
4. Zimne i gorące Observable
5. Metody tworzenia Observable i operatory łączące
6. Operatory transformacji i filtrowania
7. Operatory wyższego rzędu (Higher Order Mapping)
8. Subjects i BehaviorSubjects

## Wymagania

- Node.js (wersja 14 lub wyższa)
- npm (Node Package Manager)

## Instalacja

1. Sklonuj repozytorium:

`git clone https://github.com/JumbleTron/rxjs-learn.git`


2. Zainstaluj zależności:

`npm install`

## Uruchamianie

1. Tryb developerski (z hot reloadingiem):

`npm start`

Aplikacja będzie dostępna pod adresem `http://localhost:9000`

2. Zbudowanie projektu:

`npm run build`


Zbudowane pliki znajdą się w katalogu `dist/`

## Dodawanie nowej lekcji

1. Utwórz nowy katalog w `src/lessons` z kolejnym numerem
2. Dodaj pliki `index.html` i `index.ts` w nowym katalogu
3. Dodaj informacje o lekcji w `src/index.ts` w tablicy `lessons`

## Technologie

- TypeScript
- RxJS
- Webpack
- HTML5
- Bootstrap (do stylizacji)

## Licencja

MIT



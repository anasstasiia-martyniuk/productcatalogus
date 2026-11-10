# Productbeheer

## Installatie

### Backend (Laravel)

1. Ga naar de backendmap.
2. Installeer de dependencies:
   composer install
3. Kopieer `.env.example` naar `.env`.
4. Genereer de applicatiesleutel:
   php artisan key:generate
5. Maak de database aan en voer de migraties en seeders uit:
   php artisan migrate --seed
6. Start de server:
   php artisan serve

### Frontend (React)

1. Ga naar de frontendmap.
2. Installeer de dependencies:
   npm install
3. Kopieer `.env.example` naar `.env`.
4. Start de applicatie:
   npm start

## Omgevingsvariabelen

- Backend: database-instellingen en APP_KEY.
- Frontend: REACT_APP_API_URL, de URL van de backend-API.

## Functionaliteiten

- Producten bekijken en zoeken op naam en SKU.
- Producten sorteren en filteren op categorie, prijs, voorraad en status.
- Paginering.
- Producten toevoegen en bewerken.
- Producten verwijderen.
- Categorieën bekijken, toevoegen en bewerken.
- Categorieën verwijderen.
- Voorkomen dat een categorie met gekoppelde producten wordt verwijderd.
- Formuliervalidatie en foutmeldingen.

## Ontwerpkeuzes

- Laravel voor de backend en React voor de frontend.
- SQLite als database.
- Axios voor API-verzoeken.
- Bootstrap voor de vormgeving.
- React Router voor de navigatie.

## Wat is af en wat niet?

### Af:
De hierboven beschreven functionaliteiten.

### Nog te controleren:
Alle randgevallen uit de opdracht.
De consistentie van foutmeldingen en API-validatie.

## Randgevallen

Randgevallen die moeten werken:

- Je staat op pagina 4 en kiest een categorie met maar één pagina. Je ziet pagina 1, geen lege pagina.
- De minimumprijs is hoger dan de maximumprijs. Je ziet een melding en er gaat geen verzoek naar de API.
- Je verwijdert een product en gaat met de terugknop naar de detailpagina. Je ziet "Product niet gevonden".
- Je bewerkt een product en laat de SKU staan. Opslaan lukt.

## Bestede tijd

Ongeveer 12 uur 40 minuten
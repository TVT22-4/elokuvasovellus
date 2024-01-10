# Elokuvasovellus

## Käyttäjät TVT22-4
- vilmavuorma: Vilma Vuorma
- tasdemirD: Dicle Tasdemir
- lavia1: Laura Viide


## Esittely

Projekti on tehty Oulun ammattikorkeakoulun toisen vuoden Web-ohjelmoinnin sovellusprojekti (IN00CT06-3005) -kurssilla, jonka aiheena oli tehdä leffaharrastajille sivusto. Sovelluksen tuli hyödyntää ennalta määrättyjä avoimen datan lähteitä. Lisäksi sovellukseen tehtiin oma palvelin ja tietokanta sovelluksen oman datan hallintaan. Sovelluksesta tehtiin käyttäjänhallintaan liittyviin REST-rajapintoihin yksikkötestaukset Mocha and Chai -kirjastolla.

## Toiminnallisuudet

Sovellus mahdollistaa käyttäjän luomisen antamalla käyttäjätunnuksen ja salasanan. Jokaisen käyttäjän käyttäjätunnus on uniikki, ja käyttäjätunnuksella sekä salasanalla kirjaudutaan sisälle sovellukseen. Käyttäjän on mahdollista poistaa omat tunnuksensa. Sovelluksessa on myös mahdollista hakea elokuvia ja sarjoja suodatuksilla. Kirjautunut käyttäjä voi kustomoida oman näkymänsä elokuvien ja sarjojen lisäämisellä omalle sivullensa.

Sovellukseen kirjautunut käyttäjä voi luoda ryhmän haluamallaan nimellä. Ryhmän näkymän saa näkyviin vain ryhmän jäsenet. Ryhmiä voidaan kuitenkin selata kirjautumatta, jolloin vain ryhmien nimet ja kuvaukset näkyvät. Kirjautuneet käyttäjät voivat lähettää ryhmiin liittymispyyntöjä, joita vain ryhmän omistaja voi hyväksyä. Lisäksi vain ryhmän omistaja voi poistaa ryhmän jäseniä. Ryhmän jäsenillä on mahdollisuus lisätä Finnkinon XML -palvelusta uutisia ryhmän sivulle.
Kirjautunut käyttäjä voi lisätä sovellukseen elokuva-arvostelun. Arvostelussa näkyy käyttäjän nimimerkki, arvostelu, elokuvan ID ja arvosana. Elokuva-arvosteluja on mahdollista selata kirjautumatta.

## Teknologiat

Projektia on kehitetty Visual Studio Code -kehitysympäristössä. Projektin backend on luotu Node.js:llä. Frontend on luotu Reactilla. Tietokanta toteutettiin PostgreSQL-ohjelmalla. REST API:n dokumentaatio on luotu Postman-sovelluksella ja UI-suunnitelma sekä ER-kaavio on luotu draw.io-sovelluksella. Versiohallinta toteutettiin GitHub-ympäristöllä, jossa käytimme myös projektisuunnitteluun Kanban-taulukkoa.

## Vastuualueet

Vilma Vuorma: Vastasin projektissa kaikesta mitä ryhmän toteutukseen sisältyy, eli ryhmän sivujen backendin ja frontendin toteuttamisesta sekä REST API:n dokumentaatiosta. Lisäksi vastasin käyttäjän backendistä ja frontendistä sekä REST API:n dokumentaatiosta. Sivuston käyttöliittymän ulkoasun suunnittelusta kaikki ryhmän jäsenet olivat vastuussa. Lisäksi osallistuin esittelytekstin kirjoittamiseen ja testikoodin tekemiseen.

Dicle Tasdemir: Vastuualueisiini kuului arvostelujen lisääminen ja selaaminen sekä backendin että frontendin puolella. Tämän lisäksi loin Postgre -yhteyden, minkä avulla lähdettiin työstämään tietokantaa. Lisäksi tein arvosteluikkunan ulkonäköä ja sen asettelua. Teimme kaikki myös testikoodia, sivuston ulkoasua sekä esittelytekstiä.

Laura Viide: Vastuualueeni kohdistuivat käyttäjän henkilökohtaisen sivun luomiseen, johon kuuluvat elokuvat ja sarjat sekä katselulistan toimivuus. Tein myös haun, jota kautta käyttäjä voi hakea eri elokuvia ja sarjoja. Backendin puolella hain elokuvat ja sarjat The Movie Database -sivustolta. Tein myös Stoplight REST-dokumentaation Postman -sovelluksella ja osallistuin muiden ryhmän jäsenten kanssa sivuston muun ulkoasun luomiseen, testikoodin sekä esittelytekstin tekemiseen.


## Tietokantarakenne

<img width="707" alt="er" src="https://github.com/TVT22-4/elokuvasovellus/assets/112632790/00f38d46-91fa-4c7e-a548-92880767b24b">

 
*Kuva 1. ER-kaavio*


## Sovelluksen ulkoasu


<img width="859" alt="register" src="https://github.com/TVT22-4/elokuvasovellus/assets/112632790/641ac574-b386-42a4-81af-f330f7ded14a">

*Kuva 2. Rekisteröinnin näkymä*


<img width="953" alt="Näyttökuva 2023-12-18 132333" src="https://github.com/TVT22-4/elokuvasovellus/assets/112632790/ea181118-115e-4d0a-a959-a0c9b0ad813f">

*Kuva 3. Arvosteluiden näkymä*


<img width="947" alt="Näyttökuva 2023-12-18 132223" src="https://github.com/TVT22-4/elokuvasovellus/assets/112632790/9f3ee1e8-b899-42ca-83f6-3670526613ee">


*Kuva 4. Katselulistan näkymä*


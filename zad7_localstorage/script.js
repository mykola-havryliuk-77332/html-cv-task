// Pobieranie przycisków i elementów ze strony za pomocą ich ID
let przyciskMotyw = document.getElementById("btn-theme");
let przyciskProjekty = document.getElementById("btn-toggle");
let stylStrony = document.getElementById("theme-link");
let sekcjaProjekty = document.getElementById("projects-section");

// Obsługa zmiany motywu kolorystycznego
przyciskMotyw.onclick = function() {
    if (stylStrony.getAttribute("href") === "red.css") {
        stylStrony.setAttribute("href", "green.css");
    } else {
        stylStrony.setAttribute("href", "red.css");
    }
};

// Obsługa ukrywania i pokazywania sekcji "Projekty"
przyciskProjekty.onclick = function() {
    if (sekcjaProjekty.style.display === "none") {
        sekcjaProjekty.style.display = "block";
    } else {
        sekcjaProjekty.style.display = "none";
    }
};

const form = document.getElementById('contact-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    const imie = document.getElementById('imie').value.trim();
    const nazwisko = document.getElementById('nazwisko').value.trim();
    const email = document.getElementById('email').value.trim();
    const wiadomosc = document.getElementById('wiadomosc').value.trim();

    document.getElementById('error-imie').innerText = '';
    document.getElementById('error-nazwisko').innerText = '';
    document.getElementById('error-email').innerText = '';
    document.getElementById('error-wiadomosc').innerText = '';

    const zawieraCyfry = /\d/; 
    const poprawnyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (imie === '') {
        document.getElementById('error-imie').innerText = 'Pole Imię jest wymagane.';
        isValid = false;
    } else if (zawieraCyfry.test(imie)) {
        document.getElementById('error-imie').innerText = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }

    if (nazwisko === '') {
        document.getElementById('error-nazwisko').innerText = 'Pole Nazwisko jest wymagane.';
        isValid = false;
    } else if (zawieraCyfry.test(nazwisko)) {
        document.getElementById('error-nazwisko').innerText = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

    if (email === '') {
        document.getElementById('error-email').innerText = 'Pole E-mail jest wymagane.';
        isValid = false;
    } else if (!poprawnyEmail.test(email)) {
        document.getElementById('error-email').innerText = 'Podaj poprawny adres e-mail (np. jan@domena.pl).';
        isValid = false;
    }

    if (wiadomosc === '') {
        document.getElementById('error-wiadomosc').innerText = 'Pole Wiadomość jest wymagane.';
        isValid = false;
    }

    if (isValid) {
        alert('Sukces! Formularz został wypełniony poprawnie (walidacja frontendowa).');
        form.reset(); 
    }
});

function ladowanieDanychZJSON() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd ładowania pliku JSON');
            }
            return response.json();
        })
        .then(dane => {
            console.log("Dane pobrane z JSON: ", dane);

            const umiejetnosciLista = document.getElementById('umiejetnosci-lista');
            dane.umiejetnosci.forEach(umiejetnosc => {
                let li = document.createElement('li');
                li.textContent = umiejetnosc;
                umiejetnosciLista.appendChild(li);
            });

            const projektyLista = document.getElementById('projekty-lista');
            dane.projekty.forEach(projekt => {
                let li = document.createElement('li');
                li.innerHTML = `<strong>${projekt.tytul}:</strong> ${projekt.opis}`;
                projektyLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Problem z fetch:', error);
            document.getElementById('umiejetnosci-lista').innerHTML = "<li class='error-msg'>Błąd ładowania danych. Uruchom przez Live Server lub GitHub Pages.</li>";
            document.getElementById('projekty-lista').innerHTML = "<li class='error-msg'>Błąd ładowania danych.</li>";
        });
}

ladowanieDanychZJSON();

const wejscieNotatka = document.getElementById('nowa-notatka');
const przyciskDodajNotatke = document.getElementById('btn-dodaj-notatke');
const listaNotatek = document.getElementById('lista-notatek');

// Odczyt z Local Storage
function pobierzNotatki() {
    const zapisaneNotatki = localStorage.getItem('mojeNotatkiCV');
    return zapisaneNotatki ? JSON.parse(zapisaneNotatki) : [];
}

// Zapis do Local Storage
function zapiszNotatki(notatki) {
    localStorage.setItem('mojeNotatkiCV', JSON.stringify(notatki));
}

// Renderowanie listy notatek
function wyswietlNotatki() {
    const notatki = pobierzNotatki();
    listaNotatek.innerHTML = ''; // Czyszczenie starej listy

    notatki.forEach((notatka, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';
        li.style.borderBottom = '1px dashed #555';
        li.style.paddingBottom = '5px';

        const tekstSpan = document.createElement('span');
        tekstSpan.textContent = notatka;

        const przyciskUsun = document.createElement('button');
        przyciskUsun.textContent = 'Usuń';
        przyciskUsun.style.padding = '5px 10px';
        przyciskUsun.style.margin = '0';
        przyciskUsun.style.fontSize = '0.8em';
        
        // Zdarzenie usuwania
        przyciskUsun.onclick = function() {
            usunNotatke(index);
        };

        li.appendChild(tekstSpan);
        li.appendChild(przyciskUsun);
        listaNotatek.appendChild(li);
    });
}

// Dodawanie notatki
function dodajNotatke() {
    const tekstNotatki = wejscieNotatka.value.trim();
    if (tekstNotatki !== '') {
        const notatki = pobierzNotatki();
        notatki.push(tekstNotatki); // Dodanie nowej
        zapiszNotatki(notatki);     // Zapisanie zmian
        wejscieNotatka.value = '';  // Wyczyszczenie pola
        wyswietlNotatki();          // Odświeżenie widoku
    } else {
        alert('Proszę wpisać tekst notatki!');
    }
}

// 5. Usuwanie notatki
function usunNotatke(index) {
    const notatki = pobierzNotatki();
    notatki.splice(index, 1); // Usunięcie 1 elementu na danej pozycji
    zapiszNotatki(notatki);   // Aktualizacja pamięci
    wyswietlNotatki();        // Odświeżenie widoku
}

// Podpięcie zdarzeń
przyciskDodajNotatke.addEventListener('click', dodajNotatke);
wejscieNotatka.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Zapobiega ewentualnemu odświeżeniu formy
        dodajNotatke();
    }
});

// Startowe renderowanie
wyswietlNotatki();

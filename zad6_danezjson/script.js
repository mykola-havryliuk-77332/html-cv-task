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
    // Użycie fetch do pobrania pliku data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd ładowania pliku JSON');
            }
            return response.json(); // Zamiana na obiekt JavaScript
        })
        .then(dane => {
            // Dynamiczne budowanie listy umiejętności
            const umiejetnosciLista = document.getElementById('umiejetnosci-lista');
            dane.umiejetnosci.forEach(umiejetnosc => {
                let li = document.createElement('li');
                li.textContent = umiejetnosc;
                umiejetnosciLista.appendChild(li);
            });

            // Dynamiczne budowanie listy projektów
            const projektyLista = document.getElementById('projekty-lista');
            dane.projekty.forEach(projekt => {
                let li = document.createElement('li');
                li.innerHTML = `<strong>${projekt.tytul}:</strong> ${projekt.opis}`;
                projektyLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Problem z fetch:', error);
            // Wyświetlenie błędu, jeśli plik JSON się nie załaduje
            document.getElementById('umiejetnosci-lista').innerHTML = "<li class='error-msg'>Błąd ładowania danych. Uruchom przez Live Server lub GitHub Pages.</li>";
            document.getElementById('projekty-lista').innerHTML = "<li class='error-msg'>Błąd ładowania danych.</li>";
        });
}

// Uruchamiamy funkcję od razu po załadowaniu skryptu
ladowanieDanychZJSON();

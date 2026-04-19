// Pobieranie przycisków i elementów ze strony za pomocą ich ID
let przyciskMotyw = document.getElementById("btn-theme");
let przyciskProjekty = document.getElementById("btn-toggle");

let stylStrony = document.getElementById("theme-link");
let sekcjaProjekty = document.getElementById("projects-section");

// Obsługa zmiany motywu kolorystycznego
przyciskMotyw.onclick = function() {
    // Jeśli aktualnie wybrany jest styl czerwony, zmień na zielony
    if (stylStrony.getAttribute("href") === "red.css") {
        stylStrony.setAttribute("href", "green.css");
    } else {
        // W przeciwnym razie przywróć styl czerwony
        stylStrony.setAttribute("href", "red.css");
    }
};

// Obsługa ukrywania i pokazywania sekcji "Projekty"
przyciskProjekty.onclick = function() {
    // Jeśli sekcja jest ukryta, pokaż ją (display: block)
    if (sekcjaProjekty.style.display === "none") {
        sekcjaProjekty.style.display = "block";
    } else {
        // W przeciwnym razie ukryj sekcję (display: none)
        sekcjaProjekty.style.display = "none";
    }
};
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    // Zatrzymujemy przeładowanie strony (Brak użycia backendu)
    event.preventDefault();

    let isValid = true;

    // Pobieranie wartości z pól i usuwanie spacji po bokach
    const imie = document.getElementById('imie').value.trim();
    const nazwisko = document.getElementById('nazwisko').value.trim();
    const email = document.getElementById('email').value.trim();
    const wiadomosc = document.getElementById('wiadomosc').value.trim();

    // Czyszczenie starych błędów
    document.getElementById('error-imie').innerText = '';
    document.getElementById('error-nazwisko').innerText = '';
    document.getElementById('error-email').innerText = '';
    document.getElementById('error-wiadomosc').innerText = '';

    // Wyrażenia regularne
    const zawieraCyfry = /\d/; 
    const poprawnyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Walidacja pola "Imię"
    if (imie === '') {
        document.getElementById('error-imie').innerText = 'Pole Imię jest wymagane.';
        isValid = false;
    } else if (zawieraCyfry.test(imie)) {
        document.getElementById('error-imie').innerText = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }

    // Walidacja pola "Nazwisko"
    if (nazwisko === '') {
        document.getElementById('error-nazwisko').innerText = 'Pole Nazwisko jest wymagane.';
        isValid = false;
    } else if (zawieraCyfry.test(nazwisko)) {
        document.getElementById('error-nazwisko').innerText = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

    // Walidacja pola "E-mail"
    if (email === '') {
        document.getElementById('error-email').innerText = 'Pole E-mail jest wymagane.';
        isValid = false;
    } else if (!poprawnyEmail.test(email)) {
        document.getElementById('error-email').innerText = 'Podaj poprawny adres e-mail (np. jan@domena.pl).';
        isValid = false;
    }

    // Walidacja pola "Wiadomość"
    if (wiadomosc === '') {
        document.getElementById('error-wiadomosc').innerText = 'Pole Wiadomość jest wymagane.';
        isValid = false;
    }

    // Sukces
    if (isValid) {
        alert('Sukces! Formularz został wypełniony poprawnie (walidacja frontendowa).');
        form.reset(); // Czyszczenie formularza po wysłaniu
    }
});

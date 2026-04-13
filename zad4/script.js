// Numer Indeksu: 77332

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

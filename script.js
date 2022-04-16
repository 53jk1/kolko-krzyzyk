const stanWyswietlacz = document.querySelector('.gra--stan');

let graAktywna = true;
let biezacyGracz = "X";
let stanGry = ["", "", "", "", "", "", "", "", ""];

const zwycieskaWiadomosc = () => `Gracz ${biezacyGracz} wygrał!`;
const rysowanieKomunikatu = () => `Remis!`;
const biezacaTuraGracza = () => `Teraz rusza ${biezacyGracz}`;

stanWyswietlacz.innerHTML = biezacaTuraGracza();

const warunkiWygranej = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function obslugaKomorkiZagranej(kliknietaKomorka, klinknietaKomorkaIndex) {
    stanGry[klinknietaKomorkaIndex] = biezacyGracz;
    kliknietaKomorka.innerHTML = biezacyGracz;
}

function uchwytZmianaGracza() {
    biezacyGracz = biezacyGracz === "X" ? "O" : "X";
    stanWyswietlacz.innerHTML = biezacaTuraGracza();
}

function uchwytWalidacjaWynikow() {
    let rundaWygrana = false;
    for (let i = 0; i <= 7; i++) {
        const warunekWygranej = warunkiWygranej[i];
        let a = stanGry[warunekWygranej[0]];
        let b = stanGry[warunekWygranej[1]];
        let c = stanGry[warunekWygranej[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            rundaWygrana = true;
            break
        }
    }

    if (rundaWygrana) {
        stanWyswietlacz.innerHTML = zwycieskaWiadomosc();
        graAktywna = false;
        return;
    }

    let remisRundy = !stanGry.includes("");
    if (remisRundy) {
        stanWyswietlacz.innerHTML = rysowanieKomunikatu();
        graAktywna = false;
        return;
    }

    uchwytZmianaGracza();
}

function obslugaKliknieciaKomorki(kliknietaKomorkaZdarzenie) {
    const kliknietaKomorka = kliknietaKomorkaZdarzenie.target;
    const kliknietaKomorkaIndex = parseInt(kliknietaKomorka.getAttribute('data-cell-index'));

    if (stanGry[kliknietaKomorkaIndex] !== "" || !graAktywna) {
        return;
    }

    obslugaKomorkiZagranej(kliknietaKomorka, kliknietaKomorkaIndex);
    uchwytWalidacjaWynikow();
}

function uchwytUruchomPonownieGre() {
    graAktywna = true;
    biezacyGracz = "X";
    stanGry = ["", "", "", "", "", "", "", "", ""];
    stanWyswietlacz.innerHTML = biezacaTuraGracza();
    document.querySelectorAll('.komorka').forEach(komorka => komorka.innerHTML = "");
}


document.querySelectorAll('.komorka').forEach(komorka => komorka.addEventListener('click', obslugaKliknieciaKomorki));
document.querySelector('.gra--restart').addEventListener('click', uchwytUruchomPonownieGre);
 
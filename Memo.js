
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    
    let hasFlippedCard = false;
    let lockBoard = false; // Empêche de cliquer pendant le délai d'une seconde
    let firstCard = null;
    let secondCard = null;

    // On écoute le clic sur chaque carte
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // 1. Sécurités : on bloque si le plateau est verrouillé, 
            // si on clique sur la même carte, ou si elle est déjà trouvée
            

            // 2. On retourne la carte cliquée
            card.classList.add("flipped");

            if (!hasFlippedCard) {
                // --- PREMIÈRE CARTE CLIQUÉE ---
                hasFlippedCard = true;
                firstCard = card;
            } else {
                // --- DEUXIÈME CARTE CLIQUÉE ---
                secondCard = card;

                // On compare les sources des images des deux cartes
                const img1 = firstCard.querySelector("img").src;
                const img2 = secondCard.querySelector("img").src;

                if (img1 === img2) {
                    // --- CAS A : C'EST UN MATCH ---
                    // On marque les cartes comme trouvées pour ne plus pouvoir cliquer dessus
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");

                    // On réinitialise directement les variables pour le tour suivant
                    hasFlippedCard = false;
                    lockBoard = false;
                    firstCard = null;
                    secondCard = null;

                } else {
                    // --- CAS B : CE N'EST PAS UN MATCH ---
                    lockBoard = true; // On bloque le plateau pour empêcher de cliquer partout

                    // On attend 1 seconde (1000 ms) avant de cacher les cartes
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");

                        // On remet tout à zéro pour autoriser de nouveaux clics
                        hasFlippedCard = false;
                        lockBoard = false;
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        });
    });
});



/*
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return; // Empêche de double-cliquer sur la même carte

        this.classList.add("flipped");

        if (!hasFlippedCard) {
            // Première carte cliquée
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Deuxième carte cliquée
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        // On récupère le chemin de l'image (src) pour comparer les deux cartes
        const img1 = firstCard.querySelector("img").src;
        const img2 = secondCard.querySelector("img").src;

        if (img1 === img2) {
            // C'est un match ! On désactive les clics sur ces cartes
            disableCards();
        } else {
            // Ce n'est pas un match : on déclenche le TIMEOUT pour les cacher
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true; // On bloque le plateau pendant le délai

        // TIMEOUT : Attend 1000 millisecondes (1 seconde) avant de retourner les cartes
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000); // Vous pouvez modifier 1000 par le nombre de millisecondes souhaité (ex: 1500 pour 1.5s)
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // On écoute le clic sur chaque carte
    cards.forEach(card => card.addEventListener("click", flipCard));
});*/
function handleAnswer(choice) {
    const textElement = document.getElementById('question-text');
    const imgElement = document.getElementById('img-1');
    const noBtn = document.querySelector('button[onclick*="no"]');
    const yesBtn = document.querySelector('button[onclick*="yes"]');
    const currentText = textElement.innerText.toLowerCase();

    if (choice === 'no') {

        if (currentText.includes("hmm... i was told to give this gift to the prettiest girl. is that u?")) {
            imgElement.src = "huh.png";
            textElement.innerHTML = "r u sure? it's a very, very special gift.. 🥺";
        }

        else if (currentText.includes("r u sure? it's a very, very special gift.. 🥺")) {
            imgElement.src = "mos.png";
            textElement.innerHTML = "my heart... it's literally breaking into pieces 💔";
        }

        else if (currentText.includes("my heart... it's literally breaking into pieces 💔")) {
            imgElement.src = "gift.png";
            textElement.innerHTML = "JUST KIDDING, u have no choice! pick a gift hhh ❤️";
            noBtn.style.display = "none";
        }
    }

    else if (choice === 'yes') {

        noBtn.style.display = "none";
        yesBtn.style.display = "none";

        textElement.innerHTML =
            "Good girl! I knew you couldn't say no to me... Now pick a Magic Ticket to reveal your surprise! ✨";

        imgElement.style.display = "none";

        popHearts();

        setTimeout(() => {

            const grid = document.getElementById('ticket-container');
            grid.style.display = "flex";

            const prizes = [
                { front: 'ticket01.png', back: 'back01.png' },
                { front: 'ticket02.png', back: 'back02.png' },
                { front: 'ticket03.png', back: 'back03.png' }
            ];

            // shuffle tickets
            prizes.sort(() => Math.random() - 0.5);

            grid.innerHTML = prizes.map(p => `
                <div class="ticket-card">
                    <div class="ticket-inner">
                        <div class="ticket-front" style="background-image:url('${p.front}')"></div>
                        <div class="ticket-back" style="background-image:url('${p.back}')"></div>
                    </div>
                </div>
            `).join('');

            // attach click listeners
            document.querySelectorAll('.ticket-card').forEach(card => {
                card.addEventListener('click', () => flipTicket(card));
            });

        }, 2000);
    }
}



function flipTicket(card) {

    if (card.classList.contains('flipped')) return;

    const textElement = document.getElementById('question-text');

    card.classList.add('flipped');

    textElement.innerHTML =
        "Aww, you picked the best one! I can't wait to give this to you... ❤️ Excellent choice, princess! Counting down the days until I can redeem this for you. ✨ My heart skipped a beat... you deserve all the kisses and hugs in the world. 🥺 Yay! You won! I'm the luckiest guy to have a girl like you. hhh ❤️";

        popHearts();

    // fade other tickets
    document.querySelectorAll('.ticket-card').forEach(t => {
        if (t !== card) {
            t.style.opacity = "0.2";
            t.style.pointerEvents = "none";
        }
    });
}



function popHearts() {

    const container = document.querySelector('.white-background');

    const heartInterval = setInterval(() => {

        for (let i = 0; i < 5; i++) {

            const heart = document.createElement('div');
            heart.innerHTML = "❤️";
            heart.className = 'heart-sticker';

            const startX = Math.random() * 100;
            heart.style.left = `${startX}%`;
            heart.style.bottom = "0px";

            const sizeMult = Math.random() * (2 - 0.5) + 0.5;
            heart.style.setProperty('--size-mult', sizeMult);
            heart.style.fontSize = "20px";

            const sway = (Math.random() - 0.5) * 200;
            heart.style.setProperty('--x', `${sway}px`);

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }

    }, 150);


    setTimeout(() => {
        clearInterval(heartInterval);
    }, 4000);
}

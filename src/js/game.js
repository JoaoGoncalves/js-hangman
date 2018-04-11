(function () {
    'use strict';

    let output;
    let man;
    let guessButton;
    let guessInput;
    let letter;
    let letters;

    const availableLetters = "abcdefghijklmnopqrstuvwxyz";
    const words = ['cat', 'dog', 'cow', 'robot'];
    const messages = {
        win: 'You win!',
        lose: 'Game over!',
        guessed: 'already guessed, please try again...',
        validLetter: 'Please enter a letter from A-Z'
    };

    let lives;
    let lettersGuessed = '';
    let lettersMatched = '';
    let numLettersMatched = 0;
    let currentWord;

    function setup() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        lives = 5;

        output = document.querySelector('#output');
        man = document.querySelector('#man');
        guessInput = document.querySelector('#letter');
        guessButton = document.querySelector('#guess');
        letters = document.querySelector('#letters');

        document.querySelector('#letter').value = '';
        man.innerHTML = `You have ${lives} lives remaining`;
        output.innerHTML = '';

        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';


        for (let i = 0; i < currentWord.length; i++) {
            const letter = `<li class="letter letter${currentWord.charAt(i).toUpperCase()}">${currentWord.charAt(i).toUpperCase()}</li>`;
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    function play(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        
        const guess = guessInput.value;

        if (guess && availableLetters.indexOf(guess) > -1) {
            if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                output.innerHTML = `"${guess.toUpperCase()}" ${messages.guessed}`;
                output.classList.add("warning");

                return;
            }
            
            if (currentWord.indexOf(guess) > -1) {
                const lettersToShow = document.querySelectorAll(`.letter${guess.toUpperCase()}`);
                lettersToShow.forEach(letter => letter.classList.add("correct"));

                for (let i = 0; i < currentWord.length; i++) {
                    if (currentWord.charAt(i) === guess) {
                        numLettersMatched += 1;
                    }
                }

                lettersMatched += guess;
                if (numLettersMatched === currentWord.length) {
                    gameOver(true);
                }

                return;
            }

            lettersGuessed += guess;
            lives--;
            man.innerHTML = `You have ${lives} lives remaining`;
            
            if (lives === 0) { 
                gameOver();
            }
        }
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }

        return false;
    }

    document.querySelector('#restart').addEventListener('click', setup, false);
    document.querySelector('#hangman').addEventListener('submit', play, false);
    window.addEventListener('load', setup, false);
}());
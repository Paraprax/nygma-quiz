/* J A V A S C R I P T*/

// array of potential secret words to be guessed in the game:
var wordBank = ["riddle","bruce","enigma","fortune","brainwaves","bobblehead","laundromat","mystery","curtains","vowels","cryptic","circus","xylophone","shareholder","battleship","bonus","query","box","profit","zeppelin"];
// current secret word, to be set by function later:
var secretWord = "";
// marquee of initially-blank spaces indicating the number of letters in the secret word, to be set by function later:
var marquee = [];
// array to keep track of each wrong letter guessed in a round:
var wrongAnswers = [];
// keeps track of the unguessed letters remaining in the secret word, to be set by function later: 
var lettersLeft = 0;

//function to choose a word from the bank at random and set it as the secret word:
function wordGenerator() {
    var wordIndex = Math.floor(Math.random() * 20);
    secretWord = wordBank[wordIndex];
}

//function to generate the initially-blank marquee:
function marqueeBuilder(word) {
    for (var i = 0; i < word.length; i++) {
        marquee[i] = "_";
    }
}

// function to reprint the 'marquee' span element, with based on the ever-updated marquee array:
function printMarquee() {
    document.getElementById('marquee').innerHTML = (marquee);
}

// function to reprint the 'wrong answers' element, based on the ever-updated wrongAnswers array:
function printWrongos() {
    document.getElementById('wrongos').innerHTML = (wrongAnswers);
}


//function to reset everything for a new game:
function newRoundReset() {
    marqueeBuilder(secretWord);
    lettersLeft = secretWord.length;
    wrongAnswers = [];
    //printMarquee();
    //printWrongos();

    //console logs for posterity:
    console.log(marquee);
    console.log(`${lettersLeft} letters left to guess`);
};

//main game logic:
function hangman() {
    var strikes = 6;
    console.log(secretWord);

    //allow guesses until strikes run out:
    while (strikes > 0) {
        //program asks for player input:
        var guess = prompt("Enter a letter");

        //compare player's guess with each letter in the secret word:
        if (secretWord.indexOf(guess) == -1) {
            strikes--;
            alert(`Wrong! ${strikes} strikes left!`);
        } else {
            alert(`Right!`);
            document.write(guess);
        }
    }
    //loss message fires if while-condition is exhausted:
    alert(`You lose!`);
}

//function can run whole program on command without refreshing the page:
function playGame() {
    wordGenerator();
    console.log(secretWord);
    newRoundReset();
    //hangman();
}

playGame();
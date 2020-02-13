/* J A V A S C R I P T*/

// initial data -----------------------------------------------------------------------------------------------------------
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

// how many wrong letters the player is allowed to guess:
var strikes = 0;

// ------------------------------------------------------------------------------------------------------------------------

//function definitions = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

//choose a word from the bank at random and set it as the secret word:
function wordGenerator() {
    var wordIndex = Math.floor(Math.random() * 20);
    secretWord = wordBank[wordIndex];
}

//generate the initially-blank marquee:
function marqueeBuilder(word) {
    for (var i = 0; i < word.length; i++) {
        marquee[i] = "_";
    }
}

//reprint the 'marquee' span element, with based on the ever-updated marquee array:
function printMarquee() {
    for (var m = 0; m < marquee.length; m++) {
        document.getElementById("marquee").innerHTML = (marquee);
    }
}

//reprint the 'wrong answers' element, based on the ever-updated wrongAnswers array:
function printWrongos() {
    document.getElementById('wrongos').innerHTML = (wrongAnswers);
}

//reset everything for a new game:
function newRoundReset() {
    console.log(`NEW ROUND:`);
    marqueeBuilder(secretWord);
    lettersLeft = secretWord.length;
    strikes = 6;
    wrongAnswers = [];
    printMarquee();
    printWrongos();
};

//main game logic:
function hangman() {

    //reset everything:
    newRoundReset();

    //console logs for posterity:
    console.log(`secret word: ${secretWord}`);
    console.log(`initial marquee: ${marquee}`);
    console.log(`${lettersLeft} letters left to guess`);
    console.log(`${strikes} strikes remaining`);

    //allow guesses until strikes run out || whole secretWord is guessed:
    // while (strikes > 0 || lettersLeft > 0) {
    //     //program asks for player input:
    //     var guess = prompt("Enter a letter");

    //     //compare player's guess with each letter in the secret word:
    //     if (secretWord.indexOf(guess) == -1) {
    //         strikes--;
    //         alert(`Wrong! ${strikes} strikes left!`);
    //     } else {
    //         alert(`Right!`);
    //         lettersLeft--;
    //         document.write(guess);
    //     }
    // }
    // //loss message fires if while-condition is exhausted:
    // alert(`You lose!`);
}

//function can run whole program on command without refreshing the page:
function playGame() {
    wordGenerator();
    console.log(secretWord);
    hangman();
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

playGame();
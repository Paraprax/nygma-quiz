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

// finding a letter will switch this to 'true' for the duration of that turn:
var foundLetter = false;

//state determines win or loss message at end of game:
var gameWon = false;

// ------------------------------------------------------------------------------------------------------------------------

//function definitions = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

//choose a word from the bank at random and set it as the secret word:
function wordGenerator() {
    var wordIndex = Math.floor(Math.random() * 20);
    secretWord = wordBank[wordIndex];
}

//generate the initially-blank marquee:
function marqueeBuilder(word) {
    marquee = [];
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
    wordGenerator();
    console.log(`NEW ROUND:`);
    marqueeBuilder(secretWord);
    lettersLeft = secretWord.length;
    strikes = 6;
    wrongAnswers = [];
    gameWon = false;
    printMarquee();
    printWrongos();

    //console logs for posterity:
    console.log(`secret word: ${secretWord}`);
    console.log(`initial marquee: ${marquee}`);
    console.log(`${lettersLeft} letters left to guess`);
    console.log(`${strikes} strikes remaining`);
};

function resultsMessage(won) {
    if (won === true) {
        alert('You Win!');
    }
    else {
        alert('You lose!');
    }
}

//main game logic:
function playGame() {

    console.log(wrongAnswers);

    //reset everything:
    newRoundReset();

    //every time a key is pressed:
    document.onkeyup = function(event) {

        //game actions will only work if the player hasn't found all the letters or used up their strikes:
        if (strikes > 0 && lettersLeft > 0) {

            //the key's letter is saved in the 'guess' var:
            var guess = String.fromCharCode(event.keyCode).toLowerCase();

            console.log('2 ' + wrongAnswers);
            
            //re-declare this as false before evaluating each guess
            foundLetter = false;
            console.log('boolean before loop:' + foundLetter);
            
            //then, for every letter in the secret word:
            for (var i = 0; i < secretWord.length; i++) {
                /*if the guess is the same letter as the one being checked in the word, 
                && the marquee space in that position hasn't already been filled by a duplicate letter:*/
                if (guess == secretWord[i] && marquee[i] == "_") {
                    marquee[i] = guess; //update the marquee with the letter replacing the appropriate blank space
                    printMarquee(); //reprint the marquee in the DOM, now with the found letters filled in
                    lettersLeft--;
                    foundLetter = true;
                    console.log('foundletter inside loop:' + foundLetter);
                    console.log("letters left: " + lettersLeft);
                } else if (guess == secretWord[i]) {
                    foundLetter = true;
                    console.log("letter already found!")
                }
            }

            console.log('boolean after loop:' + foundLetter)

            //check the boolean after every letter in the word has been evaluated; if no letter was found, execute penalty logic:
            if (foundLetter === false) {
                console.log(wrongAnswers);
                console.log('index of guess = ' + wrongAnswers.indexOf("p"));
                console.log("no letter found");
                wrongAnswers.push(guess + ' '); //add the guessed letter to the wrongAnswers array
                printWrongos(); //reprint updated array in the DOM
                strikes--; 
                console.log(`Wrong! ${strikes} strikes left!`); ////<- TODO add to update the DOM && score data
            }
        }

        if (strikes == 0) {
            resultsMessage(gameWon);
        }

        if (lettersLeft == 0) {
            printMarquee()
            gameWon = true;
            resultsMessage(gameWon);
        }
    }
}

//Next-up:
//TODO: add WIN and LOSS messages that appear on-screen!
//Future:
//TODO: add more responsiveness and functionality with jQuery

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

//functions can run whole program on command without refreshing the page:
document.getElementById("play").addEventListener('click', function() {
    playGame();
});
document.getElementById("reset").addEventListener('click', function() {
    newRoundReset();
});
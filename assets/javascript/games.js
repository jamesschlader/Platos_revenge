var plato = {

    words: ["philosophy","socrates","metaphysics","epistemology","moral","universals","plato","aristotle","aesthetics","knowledge","truth","wisdom"],
    word: [],
    used: [],
    shown: [],
    progress: ["Head", "Body", "Arms", "Right leg", "Left leg"],
    wins: 0,
    losses: 0,
    message: messages,
    chooseWord() {
        this.word[0] = this.words[Math.floor(Math.random() * this.words.length - 1)];
               
    },
    buildWordArea() {

    },
    acceptInput() {
        
    },
    shownLetters(){

    },
    usedLetters() {

    },
    showProgress() {

    },
    gameOver() {

    }
}; //end plato object declaration

var messages = {
    rules: "Your challenge is to spell out a Philosophical Vocabulary Word before your entire body hangs. If you succeed, you will have proven your worth. If you fail, you hang.",
    alpha: "Input only one letter at a time.",
    guessed: "That letter has already been guessed. Try another.",
    success: "You got one right! Keep going. You could save your neck yet!",
    fail: "Wrong! I bet you'll hang!",
    win: "You solved the word before hanging. Looks like you're a friend of Plato after all...",
    lose: "Ha! I knew it! Hang for your sins against Wisdom!",
    billboard() {

    },
    feedback() { //asks the player whether to play again or not. Returns true if yes, otherwise returns false.
        
    }
}; //end messages object declaration
 

/* if (plato.feedback()) {

while (plato.word.length !== plato.shown.length && plato.used < 5) {

}
} else {/* quits game */ 


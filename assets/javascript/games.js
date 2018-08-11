var plato = {

    words: ["philosophy","socrates","metaphysics","epistemology","moral","universals","plato","aristotle","aesthetics","knowledge","truth","wisdom"],
    word: "",
    used: [],
    guesses: 0,
    progress: ["Head", "Body", "Arms", "Right leg", "Left leg"],
    wins: 0,
    losses: 0,
    guess: "",
    message: messages,
    chooseWord() {
        this.word = this.words[Math.ceil(Math.random() * this.words.length)].toString();
           console.log(this.word);  
           console.log(this.word.length); 
    },
    buildWordArea() {
        for (i = 0; i < this.word.length; i++) {
        var letterBox = document.createElement("li");
        letterBox.id = "letterBox" + i;
        letterBox.style.display = "inline-block";
        letterBox.style.borderBottom = "solid 3px black";
        letterBox.style.padding = "15px";
        letterBox.style.margin = "10px";
        var ul = document.getElementById("theWord");
        ul.appendChild(letterBox);
        console.log(ul);

        var element = document.getElementById("letterBox" + i);
            console.log(element);
        var letter = document.createElement("p");
        letter.style.fontSize = "1.4rem";
        letter.style.visibility = "hidden";
        console.log(letter);
        var node = document.createTextNode(this.word[i]);
        letter.appendChild(node);
        
        element.appendChild(letter);
        console.log(node);
        console.log("from buildWordlArea: " + this.word[i]);
        };
    },
    getGuess() {
        console.log("from getGuess: " + this.word);
        var target = this.word;
        function check(letter) {
            
            console.log("from inside check: " + this.word);
            var r = document.getElementById("letter");
            if (r) {
                r.remove();
            };
            var x = document.getElementById("dropTarget");
           var y = document.createElement("h1");
            y.id = "letter";
            
            var z = document.createTextNode(letter.key.toUpperCase());
            y.appendChild(z);
            x.appendChild(y);  
            
            var test = letter.key;
      
        
        
            
            console.log("from inside the forEach in getGuess " + letter);
            if (target.match(/test/g)) {
                console.log("what's the index of the found letter? "+ test.indexOf());
                plato.showLetters(test.indexOf());
            } else {
                plato.usedLetters(test);
                plato.showProgress(test);                
            }
        this.guesses++;
        
    };
        document.addEventListener("keyup", check);
    },

    showLetters(index){
        var x = document.getElementById("letterBox" + index);
        x.style.visibility = "show";
        this.used.unshift(this.word[index]);
    },
    usedLetters(letter) {
        
        this.used.unshift(letter);
        var x = document.getElementById("guessInputArea");
        var letterBox = document.createElement("h1");
        letterBox.id = "letterBox" + this.used.indexOf(letter);
        letterBox.style.display = "inline-block";
        letterBox.style.padding = "15px";
        letterBox.style.margin = "10px";

        console.log("from usedLetters " + letter);
        var y = document.createTextNode(letter);
        
        letterBox.appendChild(y);
        x.appendChild(letterBox);
    },
    showProgress(letter) {
        x = document.getElementById("progressArea");
        var announce = document.createElement("h3");
        var node = document.createTextNode(plato.progress[plato.guesses]);
        x.appendChild(announce);
        announce.appendChild(node);
        this.used.unshift(letter);
    },
    gameOver() {
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("li");
        var z = document.getElementById("showProgress");
        var t = z.getElementsByTagName("h3");
            var death = t.filter(part => part.innerText === "Left Leg");
            var alive = y.filter(letter => letter.style.visibility === "show");
            if (death.length > 0) {
                    // you lose
                    this.losses++;
                    message.billboard(lose);
                    message.feedback();
            } else if (alive.length === word.length) {
                    //you win
                    this.wins++;
                    this.message.billboard(win);
                    message.feedback();
            }
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
    billboard(text) {
        alert("text");
    },
    feedback() { //asks the player whether to play again or not. Returns true if yes, otherwise returns false.
    
        if (confirm("Do you want another game?")) {
            plato.guesses = 0;
            plato.chooseWord();
            plato.buildWordArea();
            plato.getGuess();
        } else { return false;}
    }
}; //end messages object declaration

messages.feedback();

/* if (plato.feedback()) {

while (plato.word.length !== plato.shown.length && plato.used < 5) {

}
} else {/* quits game */ 


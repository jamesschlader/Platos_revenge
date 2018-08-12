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
        
        plato.word = plato.words[Math.floor(Math.random() * plato.words.length)].toString();

           console.log("plato.word " + plato.word);  
           console.log("plato.guesses " + plato.guesses); 
           console.log("plato.wins" + plato.wins); 
           console.log("plato.losses" + plato.losses); 
           console.log("plato.guess" + plato.guess); 
           console.log("plato.guesses" + plato.guesses); 
          // console.log(getElementById("theWord").getElementsByTagName("li").getElementsByTagName("p").length); 


    },
    buildWordArea() {
        plato.removeParagraph("theWord");
        for (i = 0; i < plato.word.length; i++) {
        var letterBox = document.createElement("li");
        letterBox.id = "letterBox" + i;
        letterBox.style.display = "inline-block";
        letterBox.style.borderBottom = "solid 3px black";
        letterBox.style.padding = "15px";
        letterBox.style.margin = "10px";

        var letter = document.createElement("p");
       
        letter.style.fontSize = "1.4rem";
        letter.style.visibility = "hidden";

        var ul = document.getElementById("theWord");
        var node = document.createTextNode(plato.word[i]);

        letter.appendChild(node);
        letterBox.appendChild(letter);
        ul.appendChild(letterBox);
        console.log(ul);    
        console.log(letterBox);
        console.log(letter); 
        console.log(node);
        console.log("from buildWordlArea: " + plato.word[i]);
        };
    },
    getGuess() {
        console.log("from getGuess, this shows what this.word is: " + this.word);
        var target = this.word;
       // console.log("this is the length of this.word: " + target.length)
        console.log("from getGuess, this shows what target is after it has been set to equal this.word is: " + target);

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
            console.log("from getGuess, letter.key is " + letter.key);
            console.log("from getGuess, letter is " + letter);           
            if (target.includes(letter.key)) {
                messages.billboard(messages.success);
                plato.showLetters(letter.key);
            } else {
                plato.usedLetters(letter.key);
                plato.showProgress(letter.key);  
                plato.guesses++;
                messages.billboard(messages.fail);
            };  
    }; //end check function
        document.addEventListener("keyup", check);
    },

    showLetters(letter){
        console.log(letter);
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("p");
        console.log(y);
        
            for (i = 0; i < y.length; i++) {
                if (y[i].innerHTML === letter) {y[i].style.visibility = "visible";}
                console.log("from inside myFunction, here is the value of y[i].innerHTML: " + y[i].innerHTML);
                console.log("from inside myFunction, here is the value of y[i]: " + y[i]);
                console.log("from inside myFunction, here is the value of y[i].style.visibility: " + y[i].style.visibility);
            }
            plato.gameOver();
    },
    usedLetters(letter) {
        
        if (plato.used.includes(letter.toUpperCase())) {
            messages.billboard(messages.guessed);
        } else {
        this.used.unshift(letter.toUpperCase());
        var x = document.getElementById("guessInputArea");
        var letterBox = document.createElement("h1");
        letterBox.id = "letterBox" + this.used.indexOf(letter);
        letterBox.style.display = "inline-block";
        letterBox.style.padding = "15px";
        letterBox.style.margin = "10px";

        console.log("from usedLetters " + letter);
        var y = document.createTextNode(letter.toUpperCase());
        
        letterBox.appendChild(y);
        x.appendChild(letterBox);
        };
    },
    showProgress(letter) {
        x = document.getElementById("progressArea");
        var announce = document.createElement("h1");
        var node = document.createTextNode(plato.progress[plato.guesses]);
        x.appendChild(announce);
        announce.appendChild(node);
        plato.gameOver();
    },

    removeParagraph(id) {
    
        var parentToClear = document.getElementById(id);      
    
        while (parentToClear.lastElementChild) {
            var kid = parentToClear.lastElementChild;
            parentToClear.removeChild(kid);
        }
    },
    
    
    gameOver() {
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("p");
        var z = document.getElementById("progressArea");
        var t = z.getElementsByTagName("h1");
        // console.log("this is the value of the t variable in gameOver: " + t);
        // console.log("this is the length of the y variable: " + y.length);
        // console.log("this is the length of the z variable: " + z.length);
        // console.log("this is the length of the x variable: " + x.length);
        // console.log("this is the length of the t variable: " + t.length);
        

        //you win if all the <p>'s in theWord have style.visibility = plato.word.length.
        //you lose if the number of <h3>'s in progressArea === 5.

        //losing condition check:
            if (z.childElementCount == 5) {
                //you lose
                plato.guesses = 0;
                plato.losses++;
                console.log(plato.losses);
                messages.billboard(messages.lose);
                
                plato.restart();
                plato.removeParagraph("guessInputArea");
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                
            } else if (z.childElementCount < 5) {

        //winning condition check
            var counter = 0;
            console.log("y.length before for loop: " + y.length);
            for (i = 0; i < y.length; i++) {
                console.log("visibilty property of letters: " + y[i].style.visibility);
                if (y[i].style.visibility === "visible") {counter++}
                console.log("counter: " + counter);
            };

            if (counter == plato.word.length) {

                console.log((plato.word.length));
                console.log(counter === (plato.word.length));
                //you win
                plato.guesses = 0;
                plato.wins++;
                console.log(plato.wins);
                messages.billboard(messages.win);
                
                plato.restart();                    
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                plato.removeParagraph("guessInputArea");
            }
        }
    },
    
    restart() {
        plato.score();
        plato.guesses = 0;
        plato.chooseWord();
        plato.buildWordArea();
        plato.getGuess();
    },

    score() {
        plato.removeParagraph("wins");
        plato.removeParagraph("losses");

        var x = document.getElementById("wins");
        var y = document.getElementById("losses");
        var text1 = document.createElement("h1");
        var text2 = document.createElement("h1");
        var node1 = document.createTextNode("Wins: " + plato.wins);
        var node2 = document.createTextNode("Losses: " + plato.losses);
        text1.appendChild(node1);
        text2.appendChild(node2);
        x.appendChild(text1);
        y.appendChild(text2);
        x.style.visibility = "visible";
        y.style.visibility = "visible";
        
    }
        

}; //end plato object declaration

var messages = {
    rules: "Your challenge is to spell out a Philosophical Vocabulary Word before your entire body hangs. If you succeed, you will have proven your worth. If you fail, you hang.",
    alpha: "Input only one letter at a time.",
    guessed: "That letter has already been guessed. Try another.",
    success: "You got one right! Keep going. You could save your neck yet!",
    fail: "Wrong! I bet you'll hang!",
    win: "You solved the word before hanging. Looks like you're a friend of Socrates after all...",
    lose: "Ha! I knew it! Hang for your sins against Wisdom!",
    
    billboard(text) {
        
        plato.removeParagraph("alert");
        var broadcast = document.getElementById("alert");
        
        var bill = document.getElementById("billboard-main");
        bill.style.visibility = "hidden";
        broadcast.style.visibility = "visible";
        var announcement = document.createElement("h1");
        var copy = document.createTextNode(text);
        broadcast.appendChild(announcement);
        announcement.appendChild(copy);
        
        
    },

    feedback() { //asks the player whether to play again or not. Returns true if yes, otherwise returns false.
    
        if (confirm("Do you want another game?")) {
            plato.score();
            plato.guesses = 0;
            plato.chooseWord();
            plato.buildWordArea();
            plato.getGuess();
        } else { return false;}
    }
}; //end messages object declaration

messages.feedback();
plato.score();

/* if (plato.feedback()) {

while (plato.word.length !== plato.shown.length && plato.used < 5) {

}
} else {/* quits game */ 


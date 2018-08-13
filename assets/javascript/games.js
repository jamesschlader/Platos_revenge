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

        console.log("from inside chooseWord plato.guess: " + plato.guesses);
        
        plato.word = plato.words[Math.floor(Math.random() * plato.words.length)].toString();

        //    console.log("plato.word " + plato.word);  
        //    console.log("plato.guesses " + plato.guesses); 
        //    console.log("plato.wins" + plato.wins); 
        //    console.log("plato.losses" + plato.losses); 
        //    console.log("plato.guess" + plato.guess); 
        //    console.log("plato.guesses" + plato.guesses); 
          // console.log(getElementById("theWord").getElementsByTagName("li").getElementsByTagName("p").length); 


    },
    buildWordArea() {
        plato.removeParagraph("theWord");
        for (i = 0; i < plato.word.length; i++) {
        var letterBox = document.createElement("li");
        letterBox.className = "letterBox";  
        letterBox.id = "letterBox" + [i];     

        var letter = document.createElement("h1");

       
        letter.className = "toggleLetter";

        var ul = document.getElementById("theWord");
        var node = document.createTextNode(plato.word[i]);

        letter.appendChild(node);
        letterBox.appendChild(letter);
        ul.appendChild(letterBox);
        
        };
    },
    
    affixLetter (letter) {
        var r = document.getElementById("letter");
        if (r) {
        r.remove(r);
        };
        var x = document.getElementById("dropTarget");
        var y = document.createElement("h1");
                 
         y.id = "letter";
         var z = document.createTextNode(letter.key.toUpperCase());
        y.appendChild(z);
        x.appendChild(y);  
    },
    
    getGuess() {

        function check(letter) {
        var target = plato.word;
        // console.log("from getGuess, letter.key is " + letter.key);
         //console.log("from getGuess, letter is " + letter);     
         var regEx = /[^a-z]/i;
         
         if (regEx.test(letter.key)) {
             messages.billboard(messages.alpha);
         } else if (plato.used.includes(letter.key)) {
             messages.billboard(messages.guessed);
         } else if (target.includes(letter.key)) {
             messages.billboard(messages.success);
             plato.used.unshift(letter.key);
             plato.showLetters(letter.key);
         } else {
             messages.billboard(messages.fail);
             plato.used.unshift(letter.key);
             plato.usedLetters(letter.key);
             plato.showProgress(letter.key);   
             plato.affixLetter(letter);
         };  

        };
       
       document.addEventListener("keyup", check);
       
    },

    showLetters(letter){
        //console.log(letter);
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("h1");
        var z = document.getElementsByClassName("letterBox");
        //console.log(y);
        
            for (i = 0; i < y.length; i++) {
                if (y[i].innerHTML === letter) {
                    y[i].style.visibility = "visible";
                   // y[i].className = "fancyLetter";
                    
                    z.className = "letterBox2";
                }
               
            }
            plato.gameOver();
    },
    usedLetters(letter) {
            
        var x = document.getElementById("guessInputArea");
        var box = document.createElement("h1");
        box.className = "fancyLetter";
        var y = document.createTextNode(letter.toUpperCase());
        box.appendChild(y);
        x.appendChild(box);
        
    },
    showProgress(letter) {
        plato.guesses++;
        console.log("from inside showProgress plato.guess: " + plato.guesses);
        console.log("from inside showProgress plato.used: " + plato.used);
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
        var y = x.getElementsByTagName("h1");
        var z = document.getElementById("progressArea");
        var t = z.getElementsByTagName("h1");

        //you win if all the <p>'s in theWord have style.visibility = plato.word.length.
        //you lose if the number of <h3>'s in progressArea === 5.

        //losing condition check:
            if ( plato.guesses === 5 ) {
                //you lose
            
                plato.losses++;
                //console.log(plato.losses);
                messages.billboard(messages.lose);
                plato.removeParagraph("guessInputArea");
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                plato.restart();

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
                plato.wins++;
                console.log(plato.wins);
                messages.billboard(messages.win);                   
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                plato.removeParagraph("guessInputArea");
                plato.restart(); 
            }
        }
    },
    
    restart() {
        plato.score();
        plato.guesses = 0;
        plato.used = [];
        plato.chooseWord();
        plato.buildWordArea();
        plato.getGuess();
        console.log("from inside restart plato.guess: " + plato.guesses);
        console.log("from inside restart plato.used: " + plato.used);
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
    alpha: "Please only select letters.",
    guessed: "That letter has already been guessed. Try another.",
    success: "You got one right! Keep going. You could save your neck yet!",
    fail: "Wrong! I bet you'll hang!",
    win: "You solved the word before hanging. Looks like you're a friend of Socrates after all...",
    lose: "Ha! I knew it! Hang for your sins against Wisdom!",
    
    billboard(text) {
        
        plato.removeParagraph("alert");    
        plato.removeParagraph("billboard-main");  
        var bill = document.getElementById("billboard-main");
        bill.style.visibility = "hidden";
        var broadcast = document.getElementById("alert");
        broadcast.style.visibility = "visible";
        var announcement = document.createElement("h1");
        var copy = document.createTextNode(text);
        announcement.appendChild(copy);

        if (text === messages.win) {
            bill.appendChild(announcement);
            bill.style.visibility = "visible";
            console.log("The win billboard fired");
        } else if ( text === messages.lose) {
            bill.appendChild(announcement);
            bill.style.visibility = "visible";
            console.log("The lose billboard fired");
        } else {
           broadcast.appendChild(announcement);
        };
    },

    feedback() { //asks the player whether to play again or not. Returns true if yes, otherwise returns false.
            plato.score();
            plato.guesses = 0;
            plato.chooseWord();
            plato.buildWordArea();
            plato.getGuess();
    }
}; //end messages object declaration

messages.feedback();



/* if (plato.feedback()) {

while (plato.word.length !== plato.shown.length && plato.used < 5) {

}
} else {/* quits game */ 


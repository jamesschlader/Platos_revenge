var plato = {//Here's the start of the game object.

    words: ["philosophy","socrates","metaphysics","epistemology","moral","universals","plato","aristotle","aesthetics","knowledge","truth","wisdom","justice","argument","conclusion","theory"], //small list of words. In the future, I'd like this to be populated by a data base that also includes the definitions. That way, hints can be offered and the word can be properly explained at the end of the game.
    word: "",
    used: [],
    guesses: 0,
    progress: ["Head", "Body", "Arms", "Right leg", "Left leg"],
    wins: 0,
    losses: 0,
    guess: "",
    message: messages, //Object within an object?? WTF? Yep yep.

    
    chooseWord() { //This method uses a random number to pick a word from the plato.word array for the player to guess.   
        plato.word = plato.words[Math.floor(Math.random() * plato.words.length)].toString();
    },

    buildWordArea() { //This method constructs the word chosen for guessing into the content area of the screen so that the player can track their progress toward victory.
        //Step 1: Remove any existing content  from the display area.
        plato.removeParagraph("theWord");
        //Step 2: Create an li element that will hold the each letter of the chosen word. This element will be styled with a visible "___" and given a unique id in case any need to be singled out later on.
        for (i = 0; i < plato.word.length; i++) {
        var letterBox = document.createElement("li");
        letterBox.className = "letterBox";  
        letterBox.id = "letterBox" + [i];     
        //Step 3: Create an h1 element to actually display inside the already created li's. These will be style with a css class set to visibility: hidden.
        var letter = document.createElement("h1");      
        letter.className = "toggleLetter";
        //Step 4: Put the text of the each letter from the chosen word into the h1 element, then put that h1 inside the li, and then the li into the display area "theWord".
        var ul = document.getElementById("theWord");
        var node = document.createTextNode(plato.word[i]);
        letter.appendChild(node);
        letterBox.appendChild(letter);
        ul.appendChild(letterBox);
        };
    },
    
    affixLetter (letter) { //This method places the player's letter guess into the designated area of the screen.
        // Step 1: Empty the area if it is already holding a letter.
        var r = document.getElementById("letter");
        if (r) {
        r.remove(r);
        };
        // Step 2: Round up the element that the letter will go into.
        var x = document.getElementById("dropTarget");
        // Step 3: Create an h1 element to put into the display area.
        var y = document.createElement("h1");       
         y.id = "letter";
         // Step 4: Affix the text from the user to the h1 and put it into the display space.
         var z = document.createTextNode(letter.key.toUpperCase());
        y.appendChild(z);
        x.appendChild(y);  
    },
    
    getGuess() { // This method is the heart of the object. It holds the eventListener, checks its value, and sends the letter to the appropriate method(s) for display.

        function check(letter) { //This is the callback function for the eventListener.
        //This function checks the user's input letter in three ways:
         var target = plato.word;  
         var regEx = /[^a-z]/i;
         //Test 1: Is the input an actual letter? If not, it doesn't count as a guess and the user is prompted to guess a letter.
         if (regEx.test(letter.key)) {
             messages.billboard(messages.alpha);
        //Test 2: Has the letter already been tried? If so, the user is prompted to guess another and is does not suffer a penalty otherwise.
         } else if (plato.used.includes(letter.key)) {
             messages.billboard(messages.guessed);
        //Test 3: Is the letter in the target word? If so, 3 methods are called: (1) a message will provide feedback of success (2) the letter will be added to the used letter array so that it can be checked in Test 2 and (3) the letter is sent to showLetters for further processing.   
         } else if (target.includes(letter.key)) {//The antecedent condition merely finds out whether the guessed letter is in the word or not. Actual processing of how many letter matches there are is left for the showLetters method.
             messages.billboard(messages.success);
             plato.used.unshift(letter.key);
             plato.showLetters(letter.key);
        //Fallback position: If the letter is an alpha and not already used and not in the word, then it's a failure. The appropriate methods for that case are called here.
         } else {
             messages.billboard(messages.fail);
             plato.used.unshift(letter.key);
             plato.usedLetters(letter.key);
             plato.showProgress(letter.key);   
             plato.affixLetter(letter);
         };  

        };
       //Here's the eventListener.
       document.addEventListener("keyup", check);
       
    },

    showLetters(letter){ //This method reveals a success guess by changing the style of the h1 holding the letter from hidden to visible.
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("h1");
        var z = document.getElementsByClassName("letterBox");
          // This for loop goes through the word letter by letter and matches it to the success guess. If they match, it changes the visibility property of the h1.
            for (i = 0; i < y.length; i++) {
                if (y[i].innerHTML === letter) {
                    y[i].style.visibility = "visible";
                     //I was initially making the letter appear with an animation, but gave up on that because it was messing too much with the auto sizing property of the display space. Could be something I come back to address later.       
                    z.className = "letterBox2";
                }
               
            }
            //After the letter is displayed, the method to see if the game is over is called.
            plato.gameOver();
    },
    usedLetters(letter) {//This method displays any unsucessful alpha guesses in the appropriate display space.
            
        var x = document.getElementById("guessInputArea");
        var box = document.createElement("h1");
        //This style contains an animation that fires when the letter is initially displayed.
        box.className = "fancyLetter";
        var y = document.createTextNode(letter.toUpperCase());
        box.appendChild(y);
        x.appendChild(box);
        
    },
    showProgress(letter) {//This method displays how close to losing the user is.
        //Increment the number of failed guesses.
        plato.guesses++;
        x = document.getElementById("progressArea");
        var announce = document.createElement("h1");
        //Grabs the apprpriate "body part" from the progress array based on how many failed guesses have been made.
        //I fully intend to update this in the future so that instead of words being displayed, it will be actual stick figure body parts.
        var node = document.createTextNode(plato.progress[plato.guesses]);
        x.appendChild(announce);
        announce.appendChild(node);
        plato.gameOver();
    },

    removeParagraph(id) {//This method cleans out a display area of all its created elements.
    
        var parentToClear = document.getElementById(id);      
        //This loop says that as long as there are still elements of the parent left, remove the last one on the list.
        while (parentToClear.lastElementChild) {
            var kid = parentToClear.lastElementChild;
            parentToClear.removeChild(kid);
        }
    },
    
    
    gameOver() {//This method determines whether the game is over or not.
        //We bring in the relavent elements to track here.
        var x = document.getElementById("theWord");
        var y = x.getElementsByTagName("h1");
        var z = document.getElementById("progressArea");
        var t = z.getElementsByTagName("h1");

        //you win if all the <h1>'s in theWord have style.visibility === plato.word.length.
        //you lose if the number of <h1>'s in progressArea === 5.
        //Eventually, I plan of allowing the user to decide the level of difficulty in which case the losing condition will have a different test number.
        //losing condition check:
            if ( plato.guesses === 5 ) {
                //you lose
                //Increment the number lossees...
                plato.losses++;
                //Tell the user he lost...
                messages.billboard(messages.lose);
                //Reset the game board for the next game.
                plato.removeParagraph("guessInputArea");
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                plato.restart();

            } else if (z.childElementCount < 5) {

        //winning condition check
            var counter = 0;
            //Have to check every h1 in the word for the visibility property. If they're all showing, you win!
            for (i = 0; i < y.length; i++) {
                if (y[i].style.visibility === "visible") {counter++}
            };

            if (counter == plato.word.length) {
                //you win
                plato.wins++;
                //Tell the user about the victory...
                messages.billboard(messages.win);   
                //Reset for the next game.                
                plato.removeParagraph("theWord");
                plato.removeParagraph("progressArea");
                plato.removeParagraph("guessInputArea");
                plato.restart(); 
            }
        }
    },
    
    restart() {//This method resets the values of the global variables used throughout the game and calls the methods that drive the game.
        plato.score();
        plato.guesses = 0;
        plato.used = [];
        plato.chooseWord();
        plato.buildWordArea();
        plato.getGuess();
    },

    score() {//This method updates the scoreboard after each game.
        //Clear out the old scores...
        plato.removeParagraph("wins");
        plato.removeParagraph("losses");
        //Get the current scores...
        var x = document.getElementById("wins");
        var y = document.getElementById("losses");
        //Build the elements that will display the text of the score...
        var text1 = document.createElement("h1");
        var text2 = document.createElement("h1");
        //Build the text that will go on the elements...
        var node1 = document.createTextNode("Wins: " + plato.wins);
        var node2 = document.createTextNode("Losses: " + plato.losses);
        //Put the text on the elements...
        text1.appendChild(node1);
        text2.appendChild(node2);
        //Put the elements onto the home locations...
        x.appendChild(text1);
        y.appendChild(text2);
        //Show the home locations.
        x.style.visibility = "visible";
        y.style.visibility = "visible";
        
    }
        

}; //end plato object declaration

var messages = { //This method holds the various message that will give feedback to the user during the game. That way, I don't have to use alerts or prompts.
    rules: "Your challenge is to spell out a Philosophical Vocabulary Word before your entire body hangs. If you succeed, you will have proven your worth. If you fail, you hang.",
    alpha: "Please only select letters.",
    guessed: "That letter has already been guessed. Try another.",
    success: "You got one right! Keep going. You could save your neck yet!",
    fail: "Wrong! I bet you'll hang!",
    win: "You solved the word before hanging. Looks like you're a friend of Socrates after all...",
    lose: "Ha! I knew it! Hang for your sins against Wisdom!",
    
    billboard(text) { //This method actually does the business of showing the messages to the screen.
        //If a message has been called, must clean out the old ones first.
        plato.removeParagraph("alert");    
        plato.removeParagraph("billboard-main");  
        //Here is where the messages are built.
        var bill = document.getElementById("billboard-main");
        bill.style.visibility = "hidden";
        var broadcast = document.getElementById("alert");
        broadcast.style.visibility = "visible";
        var announcement = document.createElement("h1");
        var copy = document.createTextNode(text);
        announcement.appendChild(copy);
        //This conditional decides where to put the message based on the css style of the element holding the message.
        //If the message communicates a won or lost game, it covers the entire game board (this feature is only working once. It's broken. Needs fixing.)
        if (text === messages.win) {
            bill.appendChild(announcement);
            bill.style.visibility = "visible";
            console.log("The win billboard fired");
        } else if ( text === messages.lose) {
            bill.appendChild(announcement);
            bill.style.visibility = "visible";
            console.log("The lose billboard fired");
        } else { //Otherwise, the messasge lives in the upper left quadrant of the game board.
           broadcast.appendChild(announcement);
        };
    },

    feedback() { //Calls the appropriate methods to start the game over again. In the future, this method will be used to allow the user to exit the game.As it is now, it is only called once at the time the page loads.
            plato.score();
            plato.guesses = 0;
            plato.chooseWord();
            plato.buildWordArea();
            plato.getGuess();
    }
}; //end messages object declaration

//This is the one and only code call for the entire game after the page loads.
messages.feedback();

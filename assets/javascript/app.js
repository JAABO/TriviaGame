var startScreen;
var addHTML;
var number = 30; //30 seconds for each question 
var questions = ['Who created Bitcoin?', 'What is a blockchain?', 'One hundred millionth of a Bitcoin is called?', 'What is the term for when a blockchain splits?', 'How many BitCoin could be mined?', 'When will all the BitCoin be mined?'];
var answers = [['Satoshi Nakamoto', 'Samsung', 'China', 'John Mcafee'],
                ['A type of cryptocurrency', 'An exchange', 'A centralized ledger', 'A distributed ledger on a peer to peer network'],
                ['coin', 'satoshi', 'millicoin', 'bit'],
                ['A fork', 'A merger', 'A sidechain', 'A division'],
                ['10 million', '21 million', '11 million', '31 million'],
                ['2050', '2140', '2100', '2090']
            ];
var correctAnswers = ['Satoshi Nakamoto', 'A distributed ledger on a peer to peer network', 'satoshi', 'A fork', '21 million', '2140'];

var images = ["<img src='assets/images/satoshi-nakamoto.jpg'>", "<img src='assets/images/blockchain.png'>", "<img src='assets/images/satoshi.png'>", "<img src='assets/images/bitcoinFork.jpg'>", "<img src='assets/images/21-million.jpg'>", "<img src='assets/images/2140.jpg'>"];
var questionIndex = 0;
var selectedAnswer;

var theClock;

var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;


//Start point.
//Only Header and Start button show!
$(document).ready(function () {
    function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainSlide").html(startScreen);
}

    initialScreen();


//After pressing Start button, directs to next slide <function?>
$("body").on("click", ".start-button", function (event) {
    event.preventDefault();
//Start button disappear and Timer counts down til 0 or answer is given
    generateHTML();

    timerFunction();

});


//Filter to whether answer is correct or no? Also Image!
    $("body").on("click", ".answer", function (event) {
        

        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionIndex]) {
            

            clearInterval(theClock);
            generateWin();
        }
        else {
           
            clearInterval(theClock);
            generateLoss();
        }
    }); 

    $("body").on("click", ".reset-button", function (event) {

        resetGame();
    }); 
});

//Timer stops and Pops image with correct answer after pressing any of 4 answer-buttons
//Track the answer!

    function generateLossDueToTimeOut() {
        unansweredTally++;
        addHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + number + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionIndex] + "</p>" + images[questionIndex];
        $(".mainSlide").html(addHTML);
        setTimeout(wait, 3000);  
    }

    function generateWin() {
        correctTally++;
        addHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + number + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionIndex] + "</p>" + images[questionIndex];
        $(".mainSlide").html(addHTML);
        setTimeout(wait, 3000);  
    }

    function generateLoss() {
        incorrectTally++;
        addHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + number + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionIndex] + "</p>" + images[questionIndex];
        $(".mainSlide").html(addHTML);
        setTimeout(wait, 3000); 

    }


//First Page -- Timer, Questions, Answer buttons //Question -- Pulled from Array?//Answers -- interactive buttons, pulled from Array?
    function generateHTML() {
        addHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionIndex] + "</p><p class='first-answer answer'>A. " + answers[questionIndex][0] + "</p><p class='answer'>B. " + answers[questionIndex][1] + "</p><p class='answer'>C. " + answers[questionIndex][2] + "</p><p class='answer'>D. " + answers[questionIndex][3] + "</p>";
        $(".mainSlide").html(addHTML);
    }

    function wait() {
        if (questionIndex < 5) {
            questionIndex++;
            generateHTML();
            number = 30;
            timerFunction();
        }
        else {
            finalSlide();
        }
    }


    function timerFunction() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (number === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (number > 0) {
                number--;
            }
            $(".timer").html(number);
        }
    }
    //Last Page RESULTS.
    //Reports the track of answers
    function finalSlide() {
        addHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + number + "</span></p>" + "<p class='text-center'>The End! You Result:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset!</a></p>";
        $(".mainSlide").html(addHTML);
    }

    function resetGame() {
        questionIndex = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        number = 30;
        generateHTML();
        timerFunction();
    }

















//How does it slide to next Slide?
//Timer stops and timeout function runs 
//Slides to next slide and timer counts down again





//How do we track answers???
//Correct answers
//Incorrect answers
//Unanswered

//Reset page -- Resets to First page.





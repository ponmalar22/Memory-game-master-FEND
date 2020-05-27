//variable to get all cards 
let card = document.getElementsByClassName("card");
let cards = [...card];

//variable to hold the deck of cards
var deck = document.querySelector('.deck');
//variable for star 
const stars = document.querySelectorAll(".fa-star");

//initial setting of openCard,matchCount and moves  
var openCard = [];
var matchCount = 0;
var moves = 0;

//declare popup
var popup = document.getElementById('popup1');

//declare timer
var timer = document.querySelector(".timer");

//declaring matchCard,relod and cardDeck
var matchCard = document.getElementsByClassName("match");
var reload = document.getElementsByClassName('fa-repeat');
var cardDeck = document.querySelectorAll('.card');

//declare closeicon
var closeIcon = document.querySelector(".close");


//shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


document.body.onload = startGame();

//function to remove all unwanted class from card
function startGame(){
    
    openCards = [];
    
    cards = shuffle(cards);
    
     for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match");
    }
    
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
}

// addEvenetListener on click for each card
cardDeck.forEach(function(card){
    card.addEventListener('click',function(){
     
       card.classList.add('open','show');
          open(card);
          moves += 1;
        console.log(moves);
        moveCount(moves);
        if (moves == 1)
            startTimer();
        if (moves > 10){
            rating(moves);
        }
    
    });
});

//function to check card match or not
   function open(card){
    openCard.push(card);
        console.log("open card:" , openCard.length);
        
        if(openCard.length == 2 )
            {  
             if(openCard[0].dataset.class == openCard[1].dataset.class)
                 {
                     openCard[0].classList.add('match');
                     openCard[0].classList.add('open','show');
                     
                     openCard[1].classList.add('match');
                     openCard[1].classList.add('open','show');
                     
                     openCard = [];
                     matchCount += 2;
                     console.log(matchCard.length);
                     if (matchCard.length == 16)
                        {
                            scoreBoard();
    
                        }
                         
                 }
                else{
                   setTimeout(function(){    
                      openCard.forEach(function(card){
                         card.classList.remove('open','show');
                     });
                       openCard = [];
                   },1000);
                    
                }
                
    }
   }

//function for congratulations popup
function scoreBoard(){
    if(matchCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        
        popup.classList.add('show');
        
        var star = document.querySelector(".stars").innerHTML;
        
        var movesCount = document.querySelector(".moves").innerHTML;
        
        document.getElementById("starRating").innerHTML = star;
        
        document.getElementById("finalMove").innerHTML = movesCount;
        
        document.getElementById("totalTime").innerHTML = finalTime;

        closePopup();  
   }
    
}

function closePopup(){
  closeIcon.addEventListener('click',function(){
      popup.classList.remove('show');
      startGame();
  })
}

//play game again logic
function playAgain(){
    popup.classList.remove("show");
    location.reload(true);
    startGame();
    moves = 0;
    
}

//starRating based on move count
function rating(moves){
    if (moves > 10 && moves < 14){
        
       document.getElementById('one').style.visibility ="collapse"; 
    }
    else if (moves > 14){
        
        document.getElementById('two').style.visibility ="collapse";}
    }
   
//scorePanel moves count 
function moveCount(moves){
    document.getElementsByClassName('moves')[0].innerHTML= moves;
}
 
//scorePanel reload button
reload[0].addEventListener('click',function restart(){
     location.reload(true);
});

//function for game timer
var second = 0, minute = 0; hour = 0;
var mins = 00; var secs = 00;
var timer = document.querySelector(".timer");
var interval;

//scorePanel timer display
function startTimer(){
    interval = setInterval(function(){
        second++;
        secs = ( second < 10 ) ? ( '0' + second ) : ( second ); 
        if(second == 60){
            minute++;
            mins = ( minute < 10 ) ? ( '0' + minute  ) : ( minute + ': ' ); 
            second=0;
        }
    
        if(minute == 60){
            hour++;
            var gethours = ( hours < 10 ) ? ( '0' + hours + ': ' ) : ( hours + ': ' ); 
            minute = 0;
        }
        timer.innerHTML = mins+" : "+secs;
    },1000);
}

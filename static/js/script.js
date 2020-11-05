// AgeCalculator


function ageInDays(){
    var birthYear = prompt("What is your year of birth:");
    var ageInDay = (2020-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDay + ' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1)
}

function reset(){
    document.getElementById('ageInDays').remove()
}

// Cat Generator

function generateCat(){
    var image = document.createElement("img");
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"
    image.setAttribute('id','cat-gif');
    div.appendChild(image)
}

function remove(){
    document.getElementById('cat-gif').remove()
}

// Rock Paper Scissors

function rpsGame(yourChoice){
    var humanChoice,botChoice;
    humanChoice=yourChoice.id
    botChoice= numberToChoice(randToRpsInt())
    results = decideWinner(humanChoice,botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message)
    rpsFrontEnd(yourChoice.id,botChoice,message);

}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}
function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(choice_1,choice_2){
    var rpsDatabase = {
        'rock':{'rock':0.5,'paper':0,'scissors':1},
        'paper':{'paper':0.5,'rock':1,'scissors':0},
        'scissors':{'scissors':0.5,'rock':0,'paper':1},

    }
    var yourScore = rpsDatabase[choice_1][choice_2];
    var botScore = rpsDatabase[choice_2][choice_1];

    return [yourScore,botScore];


}

function finalMessage([result_human,result_bot]){
    if (result_human===0 && result_bot===1){
        return {'message':'You Lost!', 'color':'red'};
    }else if (result_human===0.5 && result_bot===0.5){
        return {'message':'You Tied!', 'color':'yellow'};
    }else {
        return {'message':'You Won!','color':'green'};
    }

}

function rpsFrontEnd(human_choice,bot_choice,message){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    // removing the images before
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()


    var human_div = document.createElement('div');
    var bot_div = document.createElement('div');
    var message_div = document.createElement('div');

    human_div.innerHTML = "<img src='" + imageDatabase[human_choice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"
    message_div.innerHTML = "<h1 style='color:" + message['color'] + " ;font-size:60px ; padding:30px;'>" + message['message'] + "</h1>"
    bot_div.innerHTML = "<img src='" + imageDatabase[bot_choice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>"


    document.getElementById('flex-box-rps-div').appendChild(human_div);
    document.getElementById('flex-box-rps-div').appendChild(message_div);
    document.getElementById('flex-box-rps-div').appendChild(bot_div);
}

// changing colors of buttons

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(button_this){
    if (button_this.value==='red'){
        buttonRed();
    }else if(button_this.value==='green'){
        buttonGreen();
    }else if(button_this.value==='reset'){
        buttonColorReset();
    }else if(button_this.value==='random'){
        randomColors();
    }
}

function buttonRed(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonGreen(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}


function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
    for (let i=0;i<all_buttons.length;i++){
        var random_number = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random_number]);
    }

}


// BLackjack Game

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','A','K','Q','J'],
    'cardValueMapping': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'ties':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/hitSound.mp3');
const winSound = new Audio('static/sounds/win-sound.mp3');
const lossSound = new Audio('static/sounds/loss-sound.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',BlackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerSide);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function BlackjackHit(){
    if (blackjackGame["isStand"]===false){
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if (activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.jpg`;    // string templating ${} to choose variable
        cardImage.height = 150;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver']===true) {

        blackjackGame['isStand'] = false;

        //showResult(computeWinner());
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();

        }
        for (let i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Begin";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;

    }

}
function updateScore(card,activePlayer){
    // for value of ace i.e either 1 or 11
    // if adding 11 keeps it below 21 the ace=11 else ace=1
    if (card==='A'){
        if (activePlayer['score'] + blackjackGame['cardValueMapping'][card][1]<=21 ){
            activePlayer['score'] = activePlayer['score'] + blackjackGame['cardValueMapping'][card][1];
        }else{
            activePlayer['score'] = activePlayer['score'] + blackjackGame['cardValueMapping'][card][0];
        }
    }else {
                activePlayer['score'] = activePlayer['score'] + blackjackGame['cardValueMapping'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerSide(){
    blackjackGame['isStand'] = true;

    while(DEALER['score']<16 && blackjackGame['isStand']===true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }


    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);

}

function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if (YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins'] +=1;
            winner = YOU;
        }else if (YOU['score']<DEALER['score']){
            blackjackGame['losses']+=1;
            winner = DEALER;
        }else if (YOU['score']===DEALER['score']){
            blackjackGame['ties']+=1;
        }
    }else if (YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']+=1;
        winner = DEALER;
    }else if (YOU['score']>21 && DEALER['score']>21){
        blackjackGame['ties']+=1;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    if(blackjackGame['turnsOver']===true) {
        let message, messageColor;
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#ties').textContent = blackjackGame['ties'];
            message = 'You Tied!!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
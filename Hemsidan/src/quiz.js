//Sätter upp firebase realtime database
const firebaseConfig = ({
    apiKey: "AIzaSyAOg8Ma1XMFjOqOZAh-GEC3vDPMkUbk_4Q",
    authDomain: "vadret-pa-finnslatten.firebaseapp.com",
    databaseURL: "https://vadret-pa-finnslatten-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "vadret-pa-finnslatten",
    storageBucket: "vadret-pa-finnslatten.appspot.com",
    messagingSenderId: "1087920021265",
    appId: "1:1087920021265:web:5ee2a26547bd354e58b6b0",
    measurementId: "G-16D38JTNKS"
}); 

//Startar firebase och "förkortar" namnet

firebase.initializeApp(firebaseConfig);

db = firebase.database();

//Deklarerar svar till quizet
let answers = []
for(i = 1; i <= 5; i++){
    temp_path = db.ref(`Room${i}/Temp`)
    temp_path.once("value", function(snapshot){
        answers.push(snapshot.val())
    })
}

//Funktion för att ge felmarginal till gissningen och svaret
function eval_guess(r, g){
    return (r -0.5 <= g && g <= r+0.5)
}

//Funktionen för att gissa
function guess() {
    //Get the guessInput
    let guessInput = document.getElementsByClassName("guessInput");
    amountOfCorrect = 0;
    //Loopa genom alla inputs med klassen guessInput
    for(let i = 0; i < guessInput.length; i++) {
        //Kolla om svaret är rätt/fel och ändra färgen på inputen
        if(eval_guess(answers[i],guessInput[i].value)) {
            guessInput[i].classList = "guessInput rightAnswer";
            amountOfCorrect++;

        } else {
            guessInput[i].classList = "guessInput wrongAnswer";
        }
    } if (amountOfCorrect == 5) {
        document.getElementById("clear").innerHTML = "";
        let winnerText = document.createElement("h1");
        winnerText.innerHTML = "Grattis! Du har gissat rätt på alla rum!";
        document.getElementById("clear").appendChild(winnerText);
    }
}

let guesses = 0;
document.getElementById("button").addEventListener("click", () => {
    guesses++;
    if(guesses == 1){
        document.getElementById("guesses").innerHTML = `Du har gissat ${guesses} gång!`;
    } else {
        document.getElementById("guesses").innerHTML = `Du har gissat ${guesses} gånger!`;
    }
})
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

//Funktionen för att gissa
function guess() {
    //Get the guessInput
    let guessInput = document.getElementsByClassName("guessInput");
    //Loopa genom alla inputs med klassen guessInput
    for(let i = 0; i < guessInput.length; i++) {
        //Kolla om svaret är rätt/fel och ändra färgen på inputen
        if(guessInput[i].value == answers[i]) {
            guessInput[i].style.backgroundColor = "green";
        } else {
            guessInput[i].style.backgroundColor = "red";
        }
    }
}


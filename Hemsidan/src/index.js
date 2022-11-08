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

firebase.initializeApp(firebaseConfig);

db = firebase.database();

path = "Room1"

var temp_src = db.ref(path + "/Temp");
var hum_src = db.ref(path + "/Hum");

var hum = 0;
var temp = 0;

temp_src.on("value", (snapshot) => {
    temp = snapshot.val();
});

hum_src.on("value", (snapshot) => {
    hum = snapshot.val();
});

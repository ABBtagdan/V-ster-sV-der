//Sätter upp för användning av firebase real time database.

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

//startar firebase

firebase.initializeApp(firebaseConfig);

db = firebase.database();

//definierar några variablar som används av flera olika funktioner (därför är de globala)

var path = "Room1"

var temp_src = db.ref(path + "/Temp");
var hum_src = db.ref(path + "/Hum");
var some_src = db.ref(path + "/old");
var date = [new Date().getMonth()*100 + new Date().getDate(), new Date().getMonth()*100 + new Date().getDate()];

var hum = 0;
var temp = 0;


//SMHI

let url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.55276/lat/59.61617/data.json";

//hämtar alla DOM-element

write_hum = document.getElementById("ml-water");
temp_box = document.getElementById("temp-box");
temp_text = document.getElementById("C-temp");
water_col = document.getElementById("water-col");
vår_temp = document.getElementById("våran_temperatur");
SMHI_temp = document.getElementById("SMHI's_temperatur");
room_select = document.getElementById("room");
chart1 = document.getElementById("myChart1");
chart2 = document.getElementById("myChart2");


//function för att beräkna absolute humidity från relative humidity och temperatur (g elr ml).
function calculate_abs_hum(t,h){
    const p = 6.112*(2.71**(17.67*t/(t+243.5)))
    return p*h*2.1674/(273.15+t)
}

// (lerp och interp är funktioner för att fylla i saknande värden, men dom används inte i den färdiga koden)

  function interp(d) {

    let o_d = d;
    for(i = 2; i < d.length -2;i++){
        o_d[i] = (d[i-2]+d[i-1]+d[i]+d[i+1]+d[i+2])/5
    }
    return o_d;

  }

//funktion för att hämta och visa relatidsvärden från firebase.

function display_realtimes(temp_ref, hum_ref){
hum_ref.on("value", (snapshot) => {
    hum = snapshot.val();
    write_hum.innerHTML = `${hum}%`;
    water_col.style.width = `${hum}%`;
});

temp_ref.on("value", (snapshot) => {
    temp = snapshot.val();
    temp_text.innerHTML = `${temp}`
    temp_box.style.backgroundColor = `rgb(${255*(temp+5)/30}, 100, ${255-(255*(temp+5)/30)})`;

});
}

//funktion för att hämta historiska värden och skapa en graf.
function plot_graph(day, ref){
ref.once('value', (snapshot) => {
    let x = []
    let Temp = []
    let Hum = []
    let abshum = []
    snapshot.forEach((childSnapshot) => {
        var string = childSnapshot.val();
        var values = string.split(" ");

        var DateTime = new Date(values[0]*1000);
        if(day[0] <= parseInt(DateTime.getMonth()* 100 + DateTime.getDate()) && parseInt(DateTime.getMonth()* 100 + DateTime.getDate()) <= parseInt(day[1])){
        if(parseFloat(values[1]) != 0){
        Temp.push(parseFloat(values[1]));
        Hum.push(parseFloat(values[2])); 
        x.push(DateTime);        
        abshum.push(calculate_abs_hum(parseFloat(values[1]), parseFloat(values[2])));
    }  
    }});
    Temp = interp(Temp);
    Hum = interp(Hum);
    abshum = interp(abshum);


    fetch(url)
  .then(response => response.json())
  .then(json => {
    //Temperaturen, luftfuktigheten och tiden föregående timme 
    
    humidity = json.timeSeries[0].parameters[15].values[0];
    time = new Date(json.timeSeries[0].validTime);
    SMHI_temp.innerHTML = `SMHI (${time.getHours()}:00): ${json.timeSeries[0].parameters[10].values[0]} C°`;
    db.ref("Room2/Temp").once("value", (snapshot) => {
        var e = snapshot.val();
    vår_temp.innerHTML = `Just nu: ${e} C°`;
    })
  });

    var trace1 = {
        x: x,
        y: Temp,
        type: 'scatter', 
        line: {shape: "spline"},
        name: "Temperature (C°)",
    }

    var trace2 = {
        x: x,
        y: Hum,
        type: 'scatter',
        line: {shape: "spline"},
        name: "Humidity (%)",
    }

    var trace3 = {
        x: x,
        y: abshum,
        yaxis: "y2",
        type: 'scatter',
        line: {shape: "spline"},
        name: "Absolute Humidity (ml)"
        }


    Plotly.newPlot('myChart1', [trace1], {
        title: {
            text: "Temperatur (C°)"
        },
        xaxis: {
            title: {
                text: "Tid"
            }
        }
    });
    Plotly.newPlot('myChart2', [trace2, trace3], {
        title: {
            text: "Fuktighet"
        },
        xaxis: {
            title: {
                text: "Tid"
            }
        }, 
        yaxis: {
            title: {
                text: "Relativ fuktighet"
            }
        },
        yaxis2: {
        
            tickfont: {color: 'rgb(148, 103, 189)'},
        
            overlaying: 'y',
        
            side: 'right'
        
          }
    });
})};

//Kör funktionerna en gång när vi laddar sidan.

plot_graph(date, some_src);
display_realtimes(temp_src, hum_src);


//Väntar på att sidan har laddats och är redo för att modifieras med jquery. (för uppdatering utan reloading)

//Resize graphs on window resize.


  
window.onresize = function(){
    var update = {
        width: document.innerWidth / 2,  // or any new width
        height: document.innerHeight / 3  // " "
      };
    chart1.width = update.width;
    chart2.width = update.width;
    chart1.height = update.width;
}

  

$(document).ready(function() {

    //Kollar om värdet på inputen room ändras och kör functionen om så är fallet.

    $("#room").change(function() {

        //switch statment för att kolla vilket rum vi tittar på och byter ut firebase-pathen därefter (default: Room1).
        //Sedan körs functionerna för grafen och realtidsvärdena igen för med den nya pathen.

        switch($(this).val()){
            case "rum1": 
            path = "Room1";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src);
            
            display_realtimes(temp_src, hum_src);
            break;
            case "rum2": 
            path = "Room2";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src);

            display_realtimes(temp_src, hum_src);
            break;
            case "rum3": 
            path = "Room3";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src)

            display_realtimes(temp_src, hum_src);
            break;
            case "rum4": 
            path = "Room4";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src)

            display_realtimes(temp_src, hum_src);
            break;
            case "rum5": 
            path = "Room5";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src)

            display_realtimes(temp_src, hum_src);
            break;
            default:
            path = "Room1";
            temp_src = db.ref(path + "/Temp");
            hum_src = db.ref(path + "/Hum");
            some_src = db.ref(path + "/old");

            plot_graph(date, some_src)

            display_realtimes(temp_src, hum_src);
            break;
        };
    })

    //kollar om de valda datumen ändras och ändrar grafen därefter.

    $("#date-box").flatpickr({
        mode: 'range',
        onChange: function(dates) {
            if (dates.length == 2) {
                date[0] = dates[0].getMonth()*100 + dates[0].getDate();
                date[1] = dates[1].getMonth()*100 + dates[1].getDate();
                plot_graph(date, some_src)
            }
        }
    })

});

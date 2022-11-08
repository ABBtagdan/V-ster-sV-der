//Hämta data från SMHI's API
let url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.55276/lat/59.61617/data.json";
fetch(url)
  .then(response => response.json())
  .then(json => {
    //Temperaturen, luftfuktigheten och tiden föregående timme 
    let temperature = json.timeSeries[0].parameters[10].values[0];
    let humidity = json.timeSeries[0].parameters[15].values[0];
    let time = new Date(json.timeSeries[0].validTime);
  });

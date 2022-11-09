let chart1 = document.querySelector("#myChart1")
let chart2 = document.querySelector("#myChart2")
let insteadGraphText = document.querySelector(".instead-graph")

function showGraph(e) {
    chart1.classList.toggle("hide-graph")
    chart2.classList.toggle("hide-graph")
    if(e.innerHTML == "Visa graf ändå") {
        e.innerHTML = "Göm grafer"
        insteadGraphText.style.display = "none"

    } else {
        e.innerHTML = "Visa graf ändå"
        insteadGraphText.style.display = "inherit"

    }

}
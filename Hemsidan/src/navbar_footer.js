let allContent = document.querySelector(".all-content")
let navbar = document.createElement("nav")
let footer = document.createElement("footer")
let body = document.getElementsByTagName("body")[0]
footer.classList = "c-primary bg-half-trans-dark f-ew-center-center"
footer.innerHTML = "Basgrupp 2 © 2022"
navbar.classList = "font-lexend bg-exp-light upper mobile-nav-all"
navbar.innerHTML = '<a class="nav-item c-black" href="index.html"><span class="material-symbols-outlined">home<span></a><a class="nav-item c-black" href="Statistik.html"><div>Data och statistik</div></a><a class="nav-item c-black" href="quiz.html" ><div>Quiz</div></a><a class="nav-item c-black" href="index.html#about-us"><div>Om oss</div></a><div class="mobile-nav"><span id="mobile-menu"><span class="material-symbols-outlined c-black" onclick="navbarClicked()">menu</span></span><div class="nav-logo"><span class="c-black">Väder Västerås</span><span class="material-symbols-outlined c-black">sunny</span></div></div><div id="opened-mobile-menu" class="bg-exp-light"><a class="c-black" href="index.html"><div>Hem</div></a><a class="c-black" href="Statistik.html"><div>Data och statistik</div></a><a class="c-black" href="quiz.html" ><div>Quiz</div></a><a class="c-black" href="index.html#about-us"><div onclick="hideNavbar()">Om oss</div></a></div>'
let navitems = document.getElementsByClassName("nav-item")
body.insertBefore(navbar, body.firstChild);
let hamMenu = document.querySelector('[onclick = "navbarClicked()"]')
let hamMenuParent = document.getElementById("mobile-menu")
let hamContent = document.querySelector("#opened-mobile-menu")
let aboutUs = document.querySelector('[onclick="hideNavbar()"]')
let navbarParent = document.getElementById("navbarParent");



function navbarClicked() {
    if(hamMenu.innerText == "menu") {
        hamMenu.innerText = "menu_open"
        hamContent.style.display = "flex"
        if(window.scrollY>0) {
            navbar.classList.remove("add-shadow")
        }
   

    } else if(hamMenu.innerText == "menu_open") {
        hamMenu.innerText = "menu"
        hamContent.style.display = "none"
        if(window.scrollY>0) {
            navbar.classList.add("add-shadow")
        }
    }
}


function hideNavbar() {
    hamMenu.innerText = "menu"
    hamContent.style.display = "none"

}



for(let i = 0; i<navitems.length; i++) {
   
    navitems[i].addEventListener("mouseover", function(e) {
        navitems[i].firstChild.classList.add("highlighted")
    } )
    navitems[i].addEventListener("mouseout", function(e) {
        navitems[i].firstChild.classList.remove("highlighted")
    } )
}


window.addEventListener('scroll',(e)=>{
    if(window.scrollY>0){
      navbar.classList.add("add-shadow");
    }else{
      navbar.classList.remove("add-shadow");
    }
  });


allContent.append(footer)


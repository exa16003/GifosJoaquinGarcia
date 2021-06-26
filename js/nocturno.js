const MODONOCT=document.querySelector(".ModoNoct");
var logo = document.querySelector(".Logo")
var crearGif = document.querySelector(".ImgCrear")
var bntDerecha = document.querySelector(".btnDerecha")
var btnIzquierda = document.querySelector(".btnIzquierda")
var cam = document.getElementById("cam")
var film = document.querySelector(".film-img")
var body = document.querySelector("body")



MODONOCT.addEventListener("click", (e) => {
    e.preventDefault();

    if (body.classList == "") {
        body.classList.add("Nocturno");
        crearGif.src = "assets/CTA-crear-gifo-modo-noc.svg";
        logo.src = "assets/Logo-modo-noc.svg";
        cam.src = "assets/camara-modo-noc.svg";
        film.src = "assets/pelicula-modo-noc.svg";
        bntDerecha.src = "assets/button-slider-right-md-noct.svg"
        btnIzquierda.src = "assets/button-slider-left-md-noct.svg"
        MODONOCT.innerHTML="MODO DIURNO"
    } else {
        body.classList.remove("Nocturno");
        crearGif.src = "assets/button-crear-gifo.svg";
        logo.src = "assets/logo-desktop.svg";
        cam.src = "assets/camara.svg";
        film.src = "assets/pelicula.svg";
        bntDerecha.src = "assets/Button-Slider-right.svg"
        btnIzquierda.src = "assets/button-slider-left.svg"
        MODONOCT.innerHTML==="MODO NOCTURNO"
        
    }
});


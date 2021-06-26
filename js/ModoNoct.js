/*secciones de Dom*/

const Fav=document.querySelector(".fav")
const MisGifos=document.querySelector(".MisGifos")
const CrearGifo=document.querySelector(".CrearGifo")
const Home=document.querySelector(".home")
const Trending=document.querySelector(".trending")

/*botones de menu*/
const MenuMisGifos=document.getElementById("MenuMisGifos")
const MenuFavoritos=document.getElementById("MenuFavoritos")
const MenuHome=document.querySelector(".Logo")
const MenuCreargif=document.querySelector(".BtmCrearGif")

    Fav.classList.add("hide")
    MisGifos.classList.add("hide") 
    CrearGifo.classList.add("hide")
    Home.classList.remove("hide")
    

MenuHome.addEventListener("click", () => {
    Fav.classList.add("hide")
    MisGifos.classList.add("hide")
    CrearGifo.classList.add("hide")
    Home.classList.remove("hide")
    Trending.classList.remove("hide")
});

MenuFavoritos.addEventListener("click", () => {
    Fav.classList.remove("hide")
    MisGifos.classList.add("hide")
    CrearGifo.classList.add("hide")
    Home.classList.add("hide")
    Trending.classList.remove("hide")
    });

MenuMisGifos.addEventListener("click", () => {
    MisGifos.classList.remove("hide")
    Fav.classList.add("hide")
    CrearGifo.classList.add("hide")
    Home.classList.add("hide")
    Trending.classList.remove("hide")
    
});

MenuCreargif.addEventListener("click", () => {
    MisGifos.classList.add("hide")
    Fav.classList.add("hide")
    CrearGifo.classList.remove("hide")
    Home.classList.add("hide")
    Trending.classList.add("hide")
});


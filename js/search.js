const favVa =document.querySelectorAll(".favImg")
const MyGifimpresion = document.querySelector(".ImpresionMigif")
const Formulario= document.querySelector(".Formulario")
const Busqueda= document.querySelector(".Busqueda")
const impresionBusqu = document.querySelector(".impresionBusq")
const VerMas = document.querySelector(".VerMas")
const ULlist =document.querySelector(".UlList")
const Ver = document.querySelector(".VerMas")
const DivLine = document.querySelector(".div-line")
const NoBusqueda = document.querySelector(".NoBusqueda")
const Lupa1 =document.getElementById("Lupa1")
const Lupa2 =document.getElementById("Lupa2")
const BtnX =document.getElementById("BtnX")
var BusquedaH2 = document.querySelector(".busquedah2")
var ImpresionFav = document.querySelector(".ImpresionFav")
var OffsetBusqueda = 0
var limit = 12
var favs = localStorage.getItem("favs")? localStorage.getItem("favs").split(","):[]
var H2 
/*fetch*/
TraerBusqueda = async (query) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${OffsetBusqueda}`)
  const json = await response.json()

  return json.data
}

SugerenciasBusqueda = async (query) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${query}`)
  const json = await response.json()

  return json.data
}

TraerFavs= async ()=>{
  var gifs = await fetch(`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${favs.join(",")}`)
  let json= await gifs.json()
  return json.data
}



/*funciones*/




/*trae y muestra favs*/
const MostrarFavs = gifs =>{ 
  if(favs.length !== 0){
    favVa.forEach(element=>{
      element.classList.add ("hide")
    })
  }
  gifs.forEach(gif=>{      
  let div = document.createElement('div')
  let img = document.createElement('img')
  img.setAttribute("src",gif.images.downsized.url)    
  
  ImpresionFav.appendChild(div)
  ImpresionFav.classList.add("impresion")
  
  div.classList.add("divcontenedor")

  img.classList.add("ImpresionImg")
  mostarBotones(gif,div,img)
})
}

TraerFavs().then(response => MostrarFavs(response))


/*muestra gif, crea li y auto completa*/
const MostrarGifs = (gifs) => {
  NoBusqueda.classList.add("hide")
  if (gifs.length === 0 ){
      BusquedaH2.innerHTML= ""
      NoBusqueda.classList.remove("hide")
      return;
  }

  
  BusquedaH2.innerHTML= ""
  let texto = document.createElement("h2")
  texto.textContent = H2
  BusquedaH2.appendChild(texto)
  DivLine.classList.remove("hide")

  gifs.forEach(gif =>{
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute("src",gif.images.downsized.url)    
    
    Ver.classList.remove("hide")
    impresionBusqu.appendChild(div)
    
    div.classList.add("divcontenedor")
  
    img.classList.add("ImpresionImg")
    mostarBotones(gif,div,img)
    
  })
}

/*agrega botones a gif + hover agregar addv*/
let mostarBotones=(gif,div,img)=>{
    let corazon = document.createElement("img")
    let descarga = document.createElement("img")
    let agrandar = document.createElement("img")

    let name = document.createElement("p")
    let Usuario = document.createElement("h5")
    let contenedorBoton = document.createElement ("div")
    let contenedortexto =document.createElement ("div")
    let MascaraDiv = document.createElement("div")
    
    Usuario.textContent = gif.username    
    name.textContent= gif.title
    if(favs.indexOf(gif.id)>-1){
      corazon.setAttribute("src","/assets/icon-fav-active.svg")
    }else{
      corazon.setAttribute("src","/assets/icon-fav.svg")
    }
    
    descarga.setAttribute("src","/assets/icon-download.svg")

    agrandar.setAttribute("src","/assets/icon-max-normal.svg")
    
    MascaraDiv.classList.add("MascaraDiv")
    contenedortexto.classList.add("ContenedorTexto")
    contenedorBoton.classList.add("ContenedorBoton")

    MascaraDiv.appendChild(contenedorBoton)
    MascaraDiv.appendChild(contenedortexto)
    MascaraDiv.appendChild(img)

    contenedorBoton.appendChild(corazon)    
    contenedorBoton.appendChild(descarga)
    contenedorBoton.appendChild(agrandar)
    contenedortexto.appendChild(Usuario)

    contenedortexto.appendChild(name)
    div.appendChild(MascaraDiv)

    /*eventos a los botones*/
    /*agrandar gif*/
    agrandar.addEventListener('click', () => {
    let FullGif = document.createElement("div")
      FullGif.classList.add("fullgif");
    FullGif.innerHTML = ` 
    <div class="Fullgif-contenedor">
            <button class="BotonX onclick="${gif.images.original.url}"><i class="fas fa-times fa-2x"></i></button>
            <img src="${gif.images.original.url}" alt="${gif.id} class="Fullgif-img">
            <div class="info">
                <div class="textos">
                    <p class="usuario">${gif.username}</p>
                    <p class="Titulo">${gif.title}</p>
                </div>
                <div>
                    <button class="fav_btn"><img src="/assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-${gif.id}"></button>
                    <button class="download_btn" ><img src="/assets/icon-download.svg" alt="download-gif" onclick="descargarGifo('${gif.images.original.url}','${gif.slug}')"></button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(FullGif);

      let botonx = document.querySelector(".BotonX")
      botonx.addEventListener("click", () =>{
        document.body.removeChild(FullGif)
      })

  })
  
  /*agregar a fav*/
    corazon.addEventListener('click', () => {
      let  index=favs.indexOf(gif.id);
      if(index===-1){
        corazon.setAttribute("src","/assets/icon-fav-active.svg")
        let gifid = gif.id
        favs.push(gifid);
      }else{
        corazon.setAttribute("src","/assets/icon-fav.svg")
        favs.splice(index,1)
      }
      localStorage.setItem("favs",favs)    
    })


  /*descargar*/
  descarga.addEventListener('click', () => {
    descargarGifo(gif.images.original.url,gif.slug)
  })
}

descargarGifo= async(gifImg,slug)=>{
  let blob = await fetch(gifImg).then((img) => img.blob())
    const gifFile = await URL.createObjectURL(blob) 
    const saveGif = document.createElement("a") 
    saveGif.href = gifFile 
    saveGif.download =slug 
    document.body.appendChild(saveGif)
    saveGif.click()
    document.body.removeChild(saveGif)
}

/*muestra sugerencia*/
let MostrarSugerencias = sugerencias =>{
  ULlist.innerHTML = ""
  sugerencias.forEach(sugerencia => {
    const Lupa = document.createElement("i")
    const item = document.createElement("li")
    
    item.textContent = sugerencia.name
    
    Lupa.classList.add("fas")
    Lupa.classList.add("fa-search")
    item.classList.add("item")
    

  
    item.appendChild(Lupa)
    ULlist.appendChild(item)
    

    item.addEventListener("click",async() =>{
      ULlist.innerHTML = ""
      Busqueda.value=item.innerText
      H2 = Busqueda.value
      mostrarYTraer(item.innerText)
      Lupa1.classList.add("hide")
      Busqueda.value = ""
      Busqueda.placeholder = "Busca GIFOS y más"
      Lupa2.classList.add("fa-search")
      BtnX.classList.add('hide')
    })
  
  })
}


let mostrarYTraer=async (value,offset)=>{
  const gifs= await TraerBusqueda(value,offset)
  impresionBusqu.innerHTML = ""
  MostrarGifs(gifs)
  
  OffsetBusqueda += limit
}

/*busca gif */
Formulario.addEventListener("submit", async (e)=>{
  e.preventDefault()
  mostrarYTraer(Busqueda.value, OffsetBusqueda);
  ULlist.innerHTML = ""
  Busqueda.value = ""

  
})

/*sugiere*/

Formulario.addEventListener("keyup", async (e) => {
  e.preventDefault()
  const sugerencias = await SugerenciasBusqueda(Busqueda.value)
  MostrarSugerencias(sugerencias)
  Lupa1.classList.remove("hide")
  Lupa2.classList.remove("fa-search")
  Lupa2.classList.add("hide")
  BtnX.classList.remove("hide")

  if(Busqueda.value ===""){
    Lupa1.classList.add("hide")
  } else {
    Lupa2.classList.add("hide")
  }
  })

BtnX.addEventListener("click" , (e) => {
  e.preventDefault()
  ULlist.innerHTML = ""
  impresionBusqu.innerHTML = ""
  Lupa1.classList.add("hide")
  Busqueda.value = ""
  Busqueda.placeholder = "Busca GIFOS y más"
  VerMas.classList.add("hide")  
  BusquedaH2.innerHTML = ""
  Lupa2.classList.add("fa-search")
  BtnX.classList.add('hide')
    
    
  })

/*ver más*/
VerMas.addEventListener("click", async ()=>{
  const gifs= await TraerBusqueda(Busqueda.value, OffsetBusqueda)
  MostrarGifs(gifs)  
  OffsetBusqueda += limit

})
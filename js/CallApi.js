const API_KEY= "RQS6yCsmkrn4SRa3wsrXtHDskj1qRhoM"
const TRENDING= document.querySelector(".trendingContenedor")
var CategoriaContenedor = document.querySelector(".TexTrending")

TraerTrendings = async () => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=4`)
  const json = await response.json()

  return json.data
}

TraerCategoria = async() => {
  const response = await fetch (`https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
  const json = await response.json()

  return json.data
}

MostrarTrendings = trendings => {
  trendings.forEach(trending => {
    let div=document.createElement('div')
    div.classList.add("limiteTrending")
    div.classList.add("limiteDiv")
    let img=document.createElement('img')
    img.setAttribute("src",trending.images.downsized.url)
    img.classList.add("ImpresionImg")
    div.appendChild(img)
  
    TRENDING.appendChild(div)
    mostarBotones(trending,div,img)
  })
}

TraerTrendings()
  .then(response => MostrarTrendings(response))


TraerCategoria()
  .then(response => MostrarCategoria(response))

  MostrarCategoria = Categorias => {
    CategoriaContenedor.innerHTML = `
    <p class="trending__links">${Categorias[0]}</p>, 
    <p class="trending__links">${Categorias[1]}</p>, 
    <p class="trending__links">${Categorias[2]}</p>, 
    <p class="trending__links">${Categorias[3]}</p>, 
    <p class="trending__links">${Categorias[4]}</p>`
    let botonCategoria = document.getElementsByClassName("trending__links")
    for(let i = 0; i < botonCategoria.length; i++){
      botonCategoria[i].addEventListener("click", async ()=>{
      
        Busqueda.value=botonCategoria[i].innerHTML
        mostrarYTraer(botonCategoria[i].innerHTML)

      })
    }
  }
    

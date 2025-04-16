//interface que representa um filme
interface Movie{
    title:string,
    plot:string,
    poster:string,
    imdbRating:string
}
//este é o tipo que indica se é um filme ou se é falso, para tratamento de erro
type MovieBool = Movie | boolean

//funcao que faz o contato com a api e retorna o filme se a conexao for bem sucedida ou false se o filme nao for encontrado ou a api nao estiver disponivel 
async function movie(title:string): Promise<MovieBool>{
    try{
        //chamada da api pelo nome do filme
        const request = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=64023a29&t=${title}`)
        //se a requisicao nao estiver ok lanca erro 
        if(!request.ok) throw new Error("Failed HTTP request")
        //transforma a requisicao no formato json para manipulacao
        const response = await request.json()

        //caso o atributo response for false, indica que ele nao encontrou o filme pelo titulo e retorna false
        if(response.Response === "False"){
            return false
        }

        //cria uma variavel do tipo movie e retorna 
        const movie:Movie = {
            title: response.Title,
            plot: response.Plot,
            poster: response.Poster,
            imdbRating: response.imdbRating
        }
        return movie
    }catch(error){
        //indica no console o erro e retorna false
        console.error("Failed fetch situation",error)
        return false
    }
}

//funcao que cria a section dos dados obtidos e adiciona a tela
function createMovieSection(movie:MovieBool):void{
    //se o tupo da viariavel nao for boleana, significa que ele é do tipo movie e possui as propriedades desejadas
    if(typeof movie !== "boolean"){
        
        //cria a section onde sera adicionado os dados do filme
        let section = document.createElement("section")

        //cria elemento de imagem do poster 
        let poster = document.createElement("img")
        poster.classList.add("poster") //adiciona a classe poster para usar no css
        poster.src = movie.poster

        //Cria o elemento de titulo do filme 
        let title = document.createElement("h2")
        title.classList.add("title")// adiciona a classe title para usar no css
        title.innerText = movie.title

        //Cria o elemento de plot do filme
        let plot = document.createElement("p")
        plot.classList.add("plot")//adiciona a classe plot para usar no css
        plot.innerText = movie.plot

        //Cria o elemento da nota do imdb do filme 
        let imdbRating = document.createElement("p")
        imdbRating.classList.add("imdbRating")//Adiiona a classe imdbRating para usar no css
        imdbRating.innerText = movie.imdbRating

        document.getElementById("teste").appendChild(poster)
        document.getElementById("teste").appendChild(title)
        document.getElementById("teste").appendChild(plot)
        document.getElementById("teste").appendChild(imdbRating)
    }
}


document.getElementById("botao").addEventListener("click",async (ev)=>{
    ev.preventDefault()

    const miranha:MovieBool = await movie("Spider Man 3")
    if(miranha){
        console.log(miranha)
        createMovieSection(miranha)
    }else{
        console.log('Filme nao encontrado')
    }   
})
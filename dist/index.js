//funcao que faz o contato com a api e retorna o filme se a conexao for bem sucedida ou false se o filme nao for encontrado ou a api nao estiver disponivel 
async function movie(title) {
    try {
        //chamada da api pelo nome do filme
        const request = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=64023a29&t=${title}`);
        //se a requisicao nao estiver ok lanca erro 
        if (!request.ok)
            throw new Error("Failed HTTP request");
        //transforma a requisicao no formato json para manipulacao
        const response = await request.json();
        //caso o atributo response for false, indica que ele nao encontrou o filme pelo titulo e retorna false
        if (response.Response === "False") {
            return false;
        }
        //cria uma variavel do tipo movie e retorna 
        const movie = {
            title: response.Title,
            plot: response.Plot,
            poster: response.Poster,
            imdbRating: response.imdbRating
        };
        return movie;
    }
    catch (error) {
        //indica no console o erro e retorna false
        console.error("Failed fetch situation", error);
        return false;
    }
}
//funcao que cria a Div dos dados obtidos e adiciona a tela
function createMovieDiv(movie) {
    //se o tupo da viariavel nao for boleana, significa que ele é do tipo movie e possui as propriedades desejadas
    if (typeof movie !== "boolean") {
        //cria a Div onde sera adicionado os dados do filme
        let div = document.createElement("div");
        div.classList.add("divMovie");
        let posterCard = document.createElement("div");
        posterCard.classList.add("cardPoster");
        //cria elemento de imagem do poster 
        let poster = document.createElement("img");
        poster.classList.add("poster"); //adiciona a classe poster para usar no css
        poster.src = movie.poster;
        posterCard.appendChild(poster);
        //cria o card que o plot vai ficar
        let plotCard = document.createElement("div");
        plotCard.classList.add("cardPlot");
        //Cria o elemento de plot do filme que contem apenas escrita
        let plot = document.createElement("p");
        plot.classList.add("plot"); //adiciona a classe plot para usar no css
        plot.innerText = movie.plot;
        plotCard.appendChild(plot);
        //Cria o elemento da nota do imdb do filme 
        let imdbRating = document.createElement("p");
        imdbRating.classList.add("imdbRating"); //Adiiona a classe imdbRating para usar no css
        imdbRating.innerText = movie.imdbRating;
        div.append(posterCard, imdbRating, plotCard);
        document.getElementById("data").appendChild(div);
    }
}
//funcao responsavel para limpar a section 
function restartSection() {
    //seleciona a section que contem os dados do filme
    const section = document.getElementById(`data`);
    //limpa o html da section para que tire o filme da tela
    section.innerHTML = ``;
}
//Funcao que sera chamado ao clicar no botao 
document.getElementById("botao").addEventListener("click", async (ev) => {
    ev.preventDefault();
    //pega o elemento de input do html 
    const inputElement = document.getElementById("movieTitle");
    //pega o titulo do filme dado pelo usuario no input 
    let movieTitle = inputElement.value;
    //Procura o filme na api 
    const movieData = await movie(movieTitle);
    //se o filme existir 
    if (movieData) {
        document.body.style.height = `20vh`;
        restartSection();
        console.log(movieData);
        createMovieDiv(movieData);
    }
    else {
        console.log('Filme nao encontrado');
    }
});

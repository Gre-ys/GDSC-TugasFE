const movieContainer = document.getElementById("movie");
const keyword = document.getElementById("keyword");
const header = document.getElementById("header");
const search = document.getElementById("search");

function makeCard(movie) {
  return `
  <div class="cards">
    <img src="${movie.Poster}" alt="${movie.Title}" heigth="5px" />
        <ul type="none">
          <li>Title: ${movie.Title}</li>
          <li>Year: ${movie.Year}</li>
          <li>Type: ${movie.Type}</li>
          <button type="button" class="btn" onclick="detailMovie('${movie.imdbID}')">Detail</button>
        </ul>
  </div>
            `;
}

function detailMovie(imdbID) {
  header.innerText = "Detail Movie";
  movieContainer.style.width = "65%";
  movieContainer.style.backgroundColor = "rgb(26, 21, 21)";
  movieContainer.style.color = "white";
  fetch("http://www.omdbapi.com/?apikey=ef76f349&i=" + imdbID)
    .then((response) => response.json())
    .then((movie) => {
      console.log(movie);
      movieContainer.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}" heigth="5px" />
                <ul>
                    <li>Title: ${movie.Title}</li>
                    <li>Year: ${movie.Year}</li>
                    <li>Type: ${movie.Type}</li>
                    <li>Genre: ${movie.Genre}</li>
                    <li>Actor: ${movie.Actor}</li>
                    <li>Language: ${movie.Language}</li>
                    <li>Rated: ${movie.Rated}</li>
                    <li>Writer: ${movie.Writer}</li>
                    <li>imdbRating: ${movie.imdbRating}</li>
                    <li>Plot: ${movie.Plot}</li>
                </ul>
                `;
    });
}

if (keyword.value == "") {
  fetch("http://www.omdbapi.com/?apikey=ef76f349&s=iron man")
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cardMovies = "";
      movies.forEach((movie) => (cardMovies += makeCard(movie)));
      movieContainer.innerHTML = cardMovies;
    });
}

search.addEventListener("click", function () {
  header.innerText = "List Movie";
  movieContainer.style.width = "";
  movieContainer.style.backgroundColor = "";
  movieContainer.style.color = "";
  fetch("http://www.omdbapi.com/?apikey=ef76f349&s=" + keyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cardMovies = "";
      movies.forEach((movie) => (cardMovies += makeCard(movie)));
      movieContainer.innerHTML = cardMovies;
    });
});

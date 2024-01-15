const movieChoice = async (event) => {
  event.preventDefault();
  const movieInput = event.target.elements["movieSearch"];
  let movieList = movieInput.value;

  movieInput.value = "";

  const spinner = document.querySelector(".hero__movies--loading");
  spinner.style.display = "block";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=897b61cc&s=${movieList}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if movies are found
    if (!data.Search || data.Search.length === 0) {
      const movieWrapper = document.querySelector(".hero__movies--wrapper");
      movieWrapper.innerHTML = "<p>Sorry, no movies with this title found.</p>";
      spinner.style.display = "none";
      return;
    }

    let movieTitles = data.Search.map((movie) => movie.Title);
    let movieYears = data.Search.map((movie) => movie.Year);
    let moviePoster = data.Search.map((movie) => movie.Poster);

    const movieWrapper = document.querySelector(".hero__movies--wrapper");
    movieWrapper.innerHTML = "";

    for (let i = 0; i < Math.min(movieTitles.length, 6); i++) {
      movieWrapper.innerHTML += `<div class="hero__movies--movie">
                  <figure class="hero__movies--movie--poster--img--wrapper">
                      <img src="${moviePoster[i]}" alt="movie poster" class="hero__movies--movie--poster--img" />
                  </figure>
                  <h2 class="hero__movies--title">${movieTitles[i]}</h2>
                  <h3 class="hero__movies--year">${movieYears[i]}</h3>
              </div>`;
    }

    spinner.style.display = "none";

    return data;
  } catch (error) {
    console.error("Error fetching data from OMDB API:", error);
    spinner.style.display = "none";
  }
};

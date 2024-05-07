const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results-container");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value;
  const apiKey = "167f6853af0b445ab03734080c884ee4";
  const apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${query}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.results;
      resultsContainer.innerHTML = "";
      recipes.forEach((recipe) => {
        const recipeCard = createRecipeCard(recipe);
        resultsContainer.appendChild(recipeCard);
      });
    })
    .catch((error) => console.log(error));
});

function createRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");

  const title = document.createElement("h2");
  title.textContent = recipe.title;
  recipeCard.appendChild(title);

  if (recipe.image) {
    const image = document.createElement("img");
    image.src = `https://spoonacular.com/recipeImages/${recipe.image}`;
    image.alt = recipe.title;
    recipeCard.appendChild(image);
  } else {
    const noImage = document.createElement("div");
    noImage.classList.add("no-image");
    noImage.textContent = "No Image Available";
    recipeCard.appendChild(noImage);
  }

  const url = document.createElement("a");
  url.href = `https://spoonacular.com/recipes/${recipe.id}`;
  url.textContent = "View Recipe";
  url.target = "_blank";
  recipeCard.appendChild(url);

  return recipeCard;
}
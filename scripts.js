// The Recipe Puppy API used in the course is broken
// Please use this replacement API URL "https://recipes.beginnerjavascript.com/api"

const baseUrl = 'https://recipes.beginnerjavascript.com/api';

const proxy = `https://corsproxy.io/?`;

const form = document.querySelector('form.search');

const div = document.querySelector('.recipes');

// fetch the receipe with recipe api
async function fetchReceipe(query) {
  const response = await fetch(`${proxy}${baseUrl}?q=${query}`);
  const data = await response.json();
  return data;
}

// handle the submit event
async function handleSubmit(e) {
  e.preventDefault();
  loading();
  fetchAndDisplay(form.query.value);
}

function loading() {
  const html = `<h2>Loading...</h2>`;
  div.innerHTML = html;
}

async function fetchAndDisplay(query) {
  form.submit.disabled = true;
  const recipes = await fetchReceipe(query);
  console.log(recipes);
  form.submit.disabled = false;

  displayResult(recipes.results);
}

function displayResult(recipes) {
  console.log('this is result');
  console.log(recipes);
  const myHtml = recipes.map(
    recipe => `
  <div class="recipe">
  <h2>${recipe.title}</h2>
  <p>${recipe.ingredients}</p>
  ${
    recipe.thumbnail &&
    `<img  src="${recipe.thumbnail}" alt="${recipe.title}"/>`
  }
    <a class="link" href="${recipe.href}" target="_blank">View More</a>
  </div>
  `
  );

  div.innerHTML = myHtml.join(' ');
}

function handleError(err) {
  console.log(err);
  const html = `
  <h2>Error:404 connect to a server</h2>
  `;
  div.innerHTML = html;
}

form.addEventListener('submit', handleSubmit);
loading();
fetchAndDisplay('pizza').catch(handleError);

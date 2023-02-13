// The Recipe Puppy API used in the course is broken
// Please use this replacement API URL "https://recipes.beginnerjavascript.com/api"

const baseUrl = 'https://recipes.beginnerjavascript.com/api';

const proxy = `https://api.codetabs.com/v1/proxy?quest=`;

const form = document.querySelector('form.search');

const div = document.querySelector('.recipes');

//fetch the receipe with recipe api
async function fetchReceipe(query) {
	const response = await fetch(`${proxy}${baseUrl}?q=${query}`);
	const data = await response.json();
	return data;
}

//handle the submit event
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
	const result = await fetchReceipe(query);
	form.submit.disabled = false;
	displayResult(result.results);
}

function displayResult(result) {
	console.log('this is result');
	const myHtml = result.map(
		result => `
  <div class="recipe">
  <h2>${result.title}</h2>
  <p>${result.ingredients}</p>
  ${
		result.thumbnail &&
		`<img  src="${result.thumbnail}" alt="${result.title}"/>`
	}
    <a class="link" href="${result.href}" target="_blank">View More</a>
  </div>
  `
	);
	console.log(result);
	console.log(myHtml);
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

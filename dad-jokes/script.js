const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');

getRandomJoke();

async function getRandomJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const res = await fetch('https://icanhazdadjoke.com/', config);
  const data = await res.json();

  jokeEl.innerHTML = data.joke;
}

jokeBtn.addEventListener('click', getRandomJoke);

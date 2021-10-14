/* eslint-disable import/no-extraneous-dependencies */
import './style.css';
import 'babel-polyfill';

const refresh = document.getElementById('refreshbtn');
const submit = document.getElementById('submit');
const user1 = document.getElementById('user');
const score1 = document.getElementById('score');
const ul = document.getElementById('list');
const id = 'myleaderboard1234';
const fetchURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`;

const postData = async () => {
  if (user1.value === '' || score1.value === '') {
    // empty
  } else {
    try {
      await fetch(fetchURL, {
        method: 'post',
        body: JSON.stringify({
          user: user1.value,
          score: score1.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      getScores();
    } catch (error) {
      // empty
    }
  }
};

const getScores = async () => {
  ul.innerHTML = '';
  const response = await fetch(fetchURL);
  const scoreData = await response.json();
  const { result } = scoreData;
  localStorage.setItem('data', JSON.stringify(result));
  let scoreArray = JSON.parse(localStorage.getItem('data'));
  if (scoreArray === null) {
    scoreArray = [];
  }
  if (scoreArray.length > 0) {
    scoreArray.forEach((e) => {
      const text = `${e.user} : ${e.score}`;
      const liTag = document.createElement('li');
      liTag.innerHTML = text.trim();
      liTag.className = 'row';
      liTag.className = 'col-md-12';
      liTag.className = 'border border-secondary';
      ul.appendChild(liTag);
    });
  }
};

refresh.addEventListener('click', () => {
  getScores();
});

submit.addEventListener('click', postData);
getScores();

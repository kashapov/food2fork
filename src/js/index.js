import axios from 'axios';

// API Key: 274516562a23b68f84740042ed4a7c16
// http://food2fork.com/api/search

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '274516562a23b68f84740042ed4a7c16';

  try {
    const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes
  } catch (error) {
    alert(error);
  }

  console.log(recipes);
}

getResults('pizza');
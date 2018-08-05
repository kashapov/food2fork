import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. get query from view
  const query = searchView.getInput();
  //console.log(query);

  if (query) {
    // 2. new search object and add state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recepies
      await state.search.getResults();

      // 5. Render results on UI
      //console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something wrong with the search...');
    }

  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  //console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    //console.log(goToPage);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/** 
 * RECIPE CONTROLLER
 */
//const r = new Recipe(47746);
//r.getRecipe();
//console.log(r);
const controlRecipe = async () => {
  // get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // prepare UI for changes

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data
      await state.recipe.getRecipe();

      // calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // render recipe
      console.log(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
    
  }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

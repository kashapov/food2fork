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


    // 4. Search for recepies
    await state.search.getResults();

    // 5. Render results on UI
    //console.log(state.search.result);
    clearLoader();
    searchView.renderResults(state.search.result);

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
const r = new Recipe(47746);
r.getRecipe();
console.log(r);

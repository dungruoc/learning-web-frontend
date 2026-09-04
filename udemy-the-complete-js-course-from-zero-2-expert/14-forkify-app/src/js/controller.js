
import 'core-js';
import 'regenerator-runtime/runtime';

import { 
    state,
    loadRecipe,
    searchResults,
    getPageData,
    changeServings,
    addBookmark
} from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import pagingView from './views/pagingView';
import bookmarksView from './views/bookmarksView';

const recipeChangeController = async function() {
    try {
        const recipeId = window.location.hash.slice(1);
        console.log(recipeId);
        if (recipeId) {
            recipeView.viewHelper.renderSpinner();
            await loadRecipe(recipeId);
            recipeView.render(state.recipe);
        } else {
            recipeView.renderMessage();
        }
    } catch (err) {
        console.error(err);
        recipeView.renderError();
    }
}


const searchController = async function() {
    try {
        const query = searchView.getQuery();        
        if (!query) return;
        resultsView.renderSpinner();
        await searchResults(query);
        resultsView.renderSearchResults(getPageData());
        pagingView.render(state.search);
    } catch (err) {
        console.error(err);
        recipeView.renderError();
    }
}

const prevPageControler = function() {
    console.log('prevPageControler');
    state.search.currentPage--;
    resultsView.renderSearchResults(getPageData());
    pagingView.render(state.search);
}

const nextPageControler = function() {
    console.log('nextPageControler');
    state.search.currentPage++;
    resultsView.renderSearchResults(getPageData());
    pagingView.render(state.search);
}

const decreaseServingsController = function() {
    changeServings(false);
    recipeView.update();
}
const increaseServingsController = function() {
    changeServings(true);
    recipeView.update();
}

const bookmarkController = function() {
    addBookmark();
    recipeView.update();
    bookmarksView.update();
}

const init = function() {
    recipeView.addHandlerRender(recipeChangeController);
    searchView.addHandlerSearch(searchController);
    pagingView.addHandlerPaging(prevPageControler, nextPageControler);
    recipeView.addHandlerChangeServings(decreaseServingsController, increaseServingsController);
    recipeView.addHandlerBookmark(bookmarkController);
    bookmarksView.render(state.bookmarks);
};

init();
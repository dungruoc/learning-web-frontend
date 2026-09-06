import {
    RECIPES_API_URL, 
    API_TIMEOUT_SECONDS,
    RESULT_PAGE_SIZE,
    MAX_SERVINGS,
    BOOKMARK_LOCAL_KEY
} from "./config";
import { fetchJson } from "./helpers";
import { cloneDeep } from "lodash-es";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        totalPages: 0,
        currentPage: 0
    },
    bookmarks: {}
};


export const loadRecipe = async function(recipeId) {
    if (Object.hasOwn(state.bookmarks, recipeId)) {
        state.recipe = cloneDeep(state.bookmarks[recipeId]);
        return;
    }
    const data = await fetchJson(`${RECIPES_API_URL}/recipes/${recipeId}`, API_TIMEOUT_SECONDS);
    const recipe = data.data.recipe;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings
    };    
};

export const searchResults = async function(query) {
    state.search.query = query;
    const data = await fetchJson(`${RECIPES_API_URL}/recipes?search=${query}`, API_TIMEOUT_SECONDS);
    state.search.results = data.data.recipes.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            imageUrl: recipe.image_url
        };
    });
    state.search.totalPages = Math.trunc((state.search.results.length + RESULT_PAGE_SIZE - 1) / RESULT_PAGE_SIZE);
    state.search.currentPage = 0;

    console.log(state);
}

export const getPageData = function() {
    return state.search.results.slice(state.search.currentPage * RESULT_PAGE_SIZE,
        state.search.currentPage * RESULT_PAGE_SIZE + RESULT_PAGE_SIZE);
}

export const changeServings = function(incre = true) {
    const newServings = incre ? (state.recipe.servings + 1) : (state.recipe.servings - 1);
    if (newServings <= 0 || newServings > MAX_SERVINGS)
        return;
    state.recipe.ingredients.forEach(el => {el.quantity = el.quantity * newServings / state.recipe.servings});
    state.recipe.servings = newServings;
}

export const addBookmark = function() {
    if (!state.recipe.bookmarked) {
        state.recipe.bookmarked = true;
        state.bookmarks[state.recipe.id] = cloneDeep(state.recipe);
    } else {
        state.recipe.bookmarked = false;
        delete state.bookmarks[state.recipe.id];
    }

    console.log(state.bookmarks);
    localStorage.setItem(BOOKMARK_LOCAL_KEY, JSON.stringify(state.bookmarks));
}

export const loadState = function() {
    const storedBookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LOCAL_KEY));
    state.bookmarks = storedBookmarks ? storedBookmarks : {};
}
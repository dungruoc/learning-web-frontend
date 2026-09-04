import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import { isEqual } from 'lodash-es';

import ViewHelper from './viewHelper';


class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #errorMessage = 'No recipes found for your query. Please try again!';
    #message = 'Start by searching for a recipe or an ingredient. Have fun!';

    constructor() {
        this.viewHelper = new ViewHelper(this.#parentElement);
    }

    #renderRecipeHtml() {
        const recipe = this.#data;

        const htmlTemplate = `
            <figure class="recipe__fig">
              <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${recipe.title}</span>
              </h1>
            </figure>
    
            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--decrease-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${recipe.bookmarked ? '-fill' : ''}"></use>
                </svg>
              </button>
            </div>
    
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(ingr => {
                    return `
                    <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ingr.quantity ? fracty(ingr.quantity).toString() : ''}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ingr.unit}</span>
                        ${ingr.description}
                    </div>
                    </li>
                    `;
                }).join('')}
              </ul>
            </div>
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
        `;
        return htmlTemplate;
    }

    render(recipe) {
        this.#data = recipe;
        const recipeHtml = this.#renderRecipeHtml();
        this.viewHelper.clearView();
        this.#parentElement.insertAdjacentHTML('afterbegin', recipeHtml)
    }

    update() {
        const newElements = Array.from(
            document.createRange().
                createContextualFragment(this.#renderRecipeHtml()).
                querySelectorAll('*')
        );
        const oldElements = Array.from(this.#parentElement.querySelectorAll('*'));
        newElements.forEach((newEl, i) => {
            const oldEl = oldElements.at(i);
            if (!oldEl.isEqualNode(newEl) &&
                newEl.firstChild?.nodeValue.trim() !== '') {
                oldEl.textContent = newEl.textContent;
            }
            if (!oldEl.isEqualNode(newEl) &&
                !isEqual(newEl.attributes, oldEl.attributes)) {
                // console.log(newEl.attributes, oldEl.attributes);
                oldEl.getAttributeNames().forEach(att => {
                    oldEl.setAttribute(att, newEl.getAttribute(att));
                }) 
            }
        })
    }

    addHandlerRender(handler) {
        Array.from(['hashchange', 'load']).forEach(ev => {
            window.addEventListener(ev, handler);
        });
    }

    renderError(message = this.#errorMessage) {
        this.viewHelper.renderError(message);
    }

    renderMessage(message = this.#message) {
        this.viewHelper.renderMessage(message);
    }

    addHandlerChangeServings(decreaseHdl, increaseHdl) {
        this.#parentElement.
            addEventListener('click', function(e) {
                if (e.target.closest('.btn--decrease-servings')) {
                    e.preventDefault();
                    decreaseHdl();
                }
                if (e.target.closest('.btn--increase-servings')) {
                    e.preventDefault();
                    increaseHdl();
                }
            });
    }

    addHandlerBookmark(handler) {
        this.#parentElement.addEventListener('click', function(e) {
            if (e.target.closest('.btn--bookmark')) {
                e.preventDefault();
                handler();
            }
        });
    }
}

export default new RecipeView();


import ViewHelper from './viewHelper';


class ResultsView {
    #parentElement = document.querySelector('.results');
    #viewHelper = new ViewHelper(this.#parentElement);

    constructor() {
        this.#parentElement.addEventListener('click', this.#viewHelper.handlePreviewActive);
    }
    
    renderSpinner() {
        this.#viewHelper.renderSpinner();
    }

    renderSearchResults(recipes) {
        const htmlTemplate = recipes.map(recipe => this.#viewHelper.renderPreview(recipe)).
            reduce((acc, el) => acc + el, '');

        this.#viewHelper.clearView();
        this.#parentElement.insertAdjacentHTML('afterbegin', htmlTemplate);
    }
}

export default new ResultsView();

class AddRecipeForm {
    #parentElement = document.querySelector('.add-recipe-window');
    #formElement = this.#parentElement.querySelector('.upload');
    #btnOpen = document.querySelector('.nav__btn--add-recipe');
    #btnClose = this.#parentElement.querySelector('.btn--close-modal');
    #overlay = this.#parentElement.parentElement.querySelector('.overlay');

    constructor() {
        this.#btnOpen.addEventListener('click', this.#toggleForm.bind(this));
        this.#btnClose.addEventListener('click', this.#toggleForm.bind(this));
        this.#overlay.addEventListener('click', this.#toggleForm.bind(this));
        this.#formElement.view = this;
    }

    #toggleForm() {
        this.#parentElement.classList.toggle('hidden');
        this.#overlay.classList.toggle('hidden');
    }

    addHandlerSubmit(handler) {
        this.#formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries([...new FormData(this)]);
            handler(data);
            this.view.#toggleForm();
        });
    }
}

export default new AddRecipeForm();
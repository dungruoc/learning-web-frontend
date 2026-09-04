import ViewHelper from './viewHelper';
import { isEmpty } from "lodash-es";


class BookmarksView {
    #parentElement = document.querySelector('.bookmarks__list');
    #viewHelper = new ViewHelper(this.#parentElement);
    #emptyBookmark = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    #data;

    constructor() {
        this.#parentElement.addEventListener('click', this.#viewHelper.handlePreviewActive);
    }

    update() {
        if (!this.#data || isEmpty(this.#data)) {
            this.#viewHelper.renderMessage(this.#emptyBookmark);
            return;
        }

        const htmlTemplate = Object.entries(this.#data).
                map(([key, recipe]) => this.#viewHelper.renderPreview(recipe)).
                reduce((acc, el) => acc + el, '');
        this.#viewHelper.clearView();
        this.#parentElement.insertAdjacentHTML("afterbegin", htmlTemplate);
    }

    render(bookmarks) {
        this.#data = bookmarks;
        this.update();
    }
}

export default new BookmarksView();
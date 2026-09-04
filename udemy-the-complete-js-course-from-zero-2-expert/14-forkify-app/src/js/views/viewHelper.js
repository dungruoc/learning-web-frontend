import icons from 'url:../../img/icons.svg';

export default class ViewHelper {
    constructor(parrentEl) {
        this.parentElement = parrentEl;
    }

    renderSpinner() {
        const htmlTemplate = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;
        this.clearView();
        this.parentElement.insertAdjacentHTML('afterbegin', htmlTemplate);
    }

    clearView() {
        this.parentElement.innerHTML = '';
    }

    renderError(message) {
        const htmlTemplate = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>`;
        this.clearView();
        this.parentElement.insertAdjacentHTML('afterbegin', htmlTemplate);
    }

    renderMessage(message) {
        const htmlTemplate = `
            <div class="message">
                <div>
                    <svg>
                    <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;
        this.clearView();
        this.parentElement.insertAdjacentHTML('afterbegin', htmlTemplate);
    }

    renderPreview(recipe) {
        const currentId = window.location.hash.slice(1);
        return `<li class="preview">
                <a class="preview__link${recipe.id !== currentId ? ' preview__link--active' : ''}" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__name">
                            ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    }

    handlePreviewActive(e) {
        const preview = e.target.closest('.preview');
        if (!preview)
            return;
        const link = preview.querySelector('.preview__link');
        if (link) {
            const href = link.getAttribute('href');
            document.querySelectorAll('.preview__link').
                forEach(el => {
                    if (el.getAttribute('href') === href) {
                        el.classList.add('preview__link--active');
                    } else {
                        el.classList.remove('preview__link--active');

                    }
                });
            link
        }
    }
}
import icons from 'url:../../img/icons.svg';

class PagingView {
    #parentElement = document.querySelector('.pagination');

    #cleanNext() {
        const nextEl = this.#parentElement.querySelector('.pagination__btn--next');
        if (nextEl)
            nextEl.remove();
    }

    #cleanPrev() {
        const prevEl = this.#parentElement.querySelector('.pagination__btn--prev');
        if (prevEl)
            prevEl.remove();
    }

    renderPrevPage(searchData) {
        this.#cleanPrev();
        const prevPage = searchData.currentPage - 1;
        if (prevPage >= 0) {
            const prevPageHtml = `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${prevPage + 1}</span>
                </button>`;
            this.#parentElement.insertAdjacentHTML('afterbegin', prevPageHtml);
        }
    }

    renderNextPage(searchData) {
        this.#cleanNext();
        const nextPage = searchData.currentPage + 1;
        if (nextPage < searchData.totalPages) {
            const nextPageHtml = `
                <button class="btn--inline pagination__btn--next">
                    <span>Page ${nextPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
            this.#parentElement.insertAdjacentHTML('beforeend', nextPageHtml);
        }
    }

    render(searchData) {
        this.renderPrevPage(searchData);
        this.renderNextPage(searchData);
    }

    addHandlerPaging(prevHdl, nextHdl) {
        this.#parentElement.addEventListener('click', function(e) {
            const prevEl = this.#parentElement.querySelector('.pagination__btn--prev');
            const nextEl = this.#parentElement.querySelector('.pagination__btn--next');
            const targetBtn = e.target.closest('.btn--inline');
            console.log(targetBtn);
            if (prevEl && targetBtn && targetBtn === prevEl) {
                e.preventDefault();
                prevHdl();
            }
            if (nextEl && targetBtn && targetBtn === nextEl) {
                e.preventDefault();
                nextHdl();
            }
        }.bind(this));
    }

}

export default new PagingView();
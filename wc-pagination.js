import { LitElement, html } from 'lit';

class WCPagination extends LitElement {
  static get properties() {
    return {
      page: Number,
      pages: Number,
      story: String,
    };
  }

  render() {
    const { story, page, pages } = this;

    let currentPage = parseInt(page, 10);
    let nextPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    let prevPage = currentPage !== pages ? currentPage + 1 : currentPage;

    return html`
      <style>
        .pagination {
          text-align: center;
          display: block;
        }
      </style>

      <div class="pagination">
        ${currentPage !== 1 ? html`<a href="/${story}/${nextPage}">&lt; prev</a>` : ''}
        <span>${currentPage}/${pages}</span>
        ${currentPage !== pages ? html`<a href="/${story}/${prevPage}">next &gt;</a>` : ''}
      </div>
    `;
  }
}
window.customElements.define('wc-pagination', WCPagination);

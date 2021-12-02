import { LitElement, html } from 'lit';

class WCPagination extends LitElement {
  static get properties() {
    return {
      // You're going to need to add some properties
      // { story, page, pages }
    };
  }

  render() {
    const { story, page, pages } = this;
    // Add some logic here

    return html`
      <style>
        .pagination {
          text-align: center;
          display: block;
        }
      </style>

      <div class="pagination">
        Replace this with the pagination markup.
        Hint, need to use ternary operator for if logic (bool ? 'true' : 'false')
      </div>
    `;
  }
}
window.customElements.define('wc-pagination', WCPagination);

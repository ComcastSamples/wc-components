import { LitElement, html } from 'lit';
import { render } from 'lit/html.js';
import { anchors } from './styles';

const styles = document.createElement('style');
render(anchors('wc-header'), styles);
document.head.appendChild(styles);
class WCHeader extends LitElement {
  static get properties() {
    return {
      duration: Number,
      name: String,
      isOpen: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  render() {
    return html`
      <style>
        :host {
          background: black;
          position: fixed;
          width: 100%;
        }

        ul {
          display: flex;
          list-style: none;
          justify-content: space-around;
          align-content: center;
          justify-items: inherit;
          align-items: center;
          flex-direction: row;
          margin: 0;
          max-width: 980px;
          margin: 0 auto;
          padding: 0;
        }

        @media screen and (min-width: 768px) {
          ul {
            justify-content: flex-start;
          }
          .navigation a {
            padding: 10px 20px;
            text-decoration: none;
            color: #828282;
          }
        }
      </style>

      <header>
        <ul>
          <slot></slot>
        </ul>
      </header>
    `;
  }
}
window.customElements.define('wc-header', WCHeader);

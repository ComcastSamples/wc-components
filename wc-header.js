import { LitElement, html } from 'lit';

export const anchors = (parent='') => {
  return `
    ${parent} a {
      display: flex;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      padding: 10px 7.5px;
      text-decoration: none;
      color: #828282;
    }
    ${parent} a.active {
      color: #61dafb;
    }
    ${parent} a:hover {
      color: #CCC;
    }
    @media screen and (min-width: 768px) {
      ${parent} a {
        padding: 10px 20px;
        text-decoration: none;
        color: #828282;
      }
    }
  `;
}

const styles = document.createElement('style');
styles.innerHTML = anchors('wc-header');
document.head.appendChild(styles);

class WCHeader extends LitElement {
  render() {
    return html`
      <style>
        :host {
          background: black;
          min-height: 38px;
          position: fixed;
          top: 0;
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
        /* You can't style nested children - Argh Shadow Dom!!! */
        ${anchors()}
        @media screen and (min-width: 768px) {
          ul {
            justify-content: flex-start;
          }
        }
      </style>

      <header>
        <ul>
          <!-- Slot element will add all the links! -->
          <slot></slot>
        </ul>
      </header>
    `;
  }
}
window.customElements.define('wc-header', WCHeader);

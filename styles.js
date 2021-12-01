import { html } from 'lit'

export const anchors = parent => html`
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

export const moreStyles = options => html`${options}`;

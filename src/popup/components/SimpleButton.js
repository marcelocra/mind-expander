import { html } from "../../libs/deps.js";
import { t } from "../../libs/i18n.js";

/** @param {any} props */
export function SimpleButton(props) {
  const buttonClass = "border rounded shadow-xl p-3 w-32";

  return html`
    <button class="${buttonClass}" ${{ ...props }}>${props.children}</button>
  `;
}

import { html } from "../../libs/deps.js";

/** @param {any} props */
export function SimpleButton(props) {
  const buttonClass = "border rounded shadow-xl p-3 w-32";
  const updatedProps = props.class ? props : { ...props, class: buttonClass };

  console.log(props);

  return html`<button ...${updatedProps}>${props.children}</button>`;
}

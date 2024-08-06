import i18next from "../deps/i18next.js";
import { html, render, useState } from "../deps/preact.js";
import en from "../i18n/en/translation.json" with { type: "json" };
import ptBr from "../i18n/pt-BR/translation.json" with { type: "json" };

i18next.init({
  lng: "pt-BR",
  debug: true,
  resources: {
    ptBr: {
      translation: ptBr,
    },
    en: {
      translation: en,
    },
  },
});

function App() {
  const buttonClass = "border rounded shadow-xl p-3 w-32";

  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <button class="${buttonClass}" onClick=${() => {}}>
        ${i18next.t("")}
      </button>
      <button class="${buttonClass}" onClick=${() => {}}>
        ${i18next.t("popupIcon.summarize")}
      </button>
    </div>
  `;
}

render(html`<${App} />`, document.body);

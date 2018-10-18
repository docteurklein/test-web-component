import {html} from "/node_modules/html-template-literal/HTMLTemplateLiteral.js";
import {TamTest} from "./tam-test.js";

export class FloTest extends HTMLElement {
    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        html `<link rel="stylesheet" href="/assets/css/flo-test.css"/>`.appendTo(shadow);
        html `<p>flo<tam-test/></p>`.appendTo(shadow);
        this.parentNode.addEventListener('click', console.log);
    }
}

customElements.define('flo-test', FloTest);

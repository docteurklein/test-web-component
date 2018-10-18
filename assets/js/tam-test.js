import {html} from "/node_modules/html-template-literal/HTMLTemplateLiteral.js";

export class TamTest extends HTMLElement {
    constructor() {
        super();
        this.name = 'default';
        this.shadow = this.attachShadow({mode: 'open'});
        html `<link rel="stylesheet" href="/assets/css/tam-test.css"/>`.appendTo(this.shadow);
        this.content = document.createElement('div');
        this.subContent = document.createElement('div');
        this.content.appendChild(this.subContent);
        this.shadow.appendChild(this.content);
        this.render();
    }

    render() {
        html `<p>${this.name}</p>`.replace(this.subContent);
    }

    attributeChangedCallback(name, old, val) {
        this.name = val;
        this.render();
    }

    static get observedAttributes() { return ['name']; }
}

customElements.define('tam-test', TamTest);

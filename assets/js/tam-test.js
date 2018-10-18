import {html, render} from '/node_modules/lit-html/lit-html.js';

export class TamTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();

        this.shadow.addEventListener('input', (event) => {
            if (event.target.matches('#name')) {
                event.preventDefault();
                this.attributes.name.value = event.target.value;
            }
        });
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/tam-test.css"/>
            <p>${this.attributes.name.value}</p>
            <form>
                <input id="name" value="${this.attributes.name.value}"/>
            </form>
        `, this.shadow);
    }

    static get observedAttributes() { return ['name']; }

    attributeChangedCallback() {
        this.render();
    }
}

customElements.define('tam-test', TamTest);

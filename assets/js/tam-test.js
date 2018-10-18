import {html, render} from '/node_modules/lit-html/lit-html.js';
import {listen_on} from './index.js';
import { repeat } from '/node_modules/lit-html/directives/repeat.js';

export class TamTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        let on = listen_on(this.shadow);
        on('submit', '*', (event) => {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('tam-changed', {
                detail: this.tam, bubbles: true
            }));
        });
        on('input', '[name=title]', (event) => {
            this.tam.title = event.target.value;
            this.render();
        });
        this.tam = {
            title: '',
            number: 0
        };
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/tam-test.css"/>
            <p>${this.title}</p>
            <form>
                <input name="title" value="${this.tam.title}"/>
            </form>
            <h3>${this.tam.title}</h3>
        `, this.shadow);
    }

    static get observedAttributes() { return ['tam']; }

    attributeChangedCallback(name, old, val) {
        this[name] = JSON.parse(val);
        this.render();
    }
}

customElements.define('tam-test', TamTest);

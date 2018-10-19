import {listen_on, html, render, repeat} from './index.js';

export class TamTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.tam = {
            title: '',
            number: 0
        };

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
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/tam-test.css"/>
            ${repeat(
                new Array(this.tam.number).fill(this.tam.number),
                tam => tam.length,
                tam => html`
                    <p>title: ${this['tam-title']}</p>
                    <form>
                        <input name="title" value="${this.tam.title}"/>
                    </form>`
            )}
            <h3>${this.tam.title}</h3>
        `, this.shadow);
    }

    static get observedAttributes() { return ['tam-title']; }

    attributeChangedCallback(name, old, val) {
        this[name] = val;
        this.render();
    }
}

customElements.define('tam-test', TamTest);

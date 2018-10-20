import {html, render, repeat} from './index.js';

export class TamTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.tam = {
            title: '',
            items: []
        };
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() { return ['tam-title']; }

    attributeChangedCallback(name, old, val) {
        this[name] = val;
        this.render();
    }

    dispatchChange(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('tam-changed', {
            detail: this.tam, bubbles: true
        }));
    }

    setTitle(event) {
        this.tam.title = event.target.value;
        this.render();
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/tam-test.css"/>
            <h3>${this.tam.title}</h3>
            ${repeat(this.tam.items, item => item, item => html`
                <p>${item}</p>
                <form @submit=${this.dispatchChange.bind(this)}>
                    <input @input=${this.setTitle.bind(this)} name="title" value="${item}"/>
                </form>
            `)}
        `, this.shadow);
    }
}

customElements.define('tam-test', TamTest);

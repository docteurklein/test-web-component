import {TamTest} from "./tam-test.js";
import {html, render} from '/node_modules/lit-html/lit-html.js';
import { repeat } from '/node_modules/lit-html/directives/repeat.js';
import {listen_on} from './index.js';

export class FloTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.count = 1;
        this.tams = [];
        this.last = '';

        setInterval(() => {
            this.count++;
            this.tams.push({'title': `tam no ${this.count}`, number: this.count});
            this.render();
        }, 1000);

        let on = listen_on(this.shadow);
        on('tam-changed', '*', (event) => {
            this.last = event.detail.title;
            this.render();
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/flo-test.css"/>
            <p>
                ${this.count}
                <h2>${this.last}</h2>
            </p>
            ${repeat(
                this.tams,
                item => item.title,
                item => html`<tam-test tam=${JSON.stringify(item)} />`
            )}
        `, this.shadow);
    }
}

customElements.define('flo-test', FloTest);

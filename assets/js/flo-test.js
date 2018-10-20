import {TamTest} from "./tam-test.js";
import {html, render, repeat} from './index.js';

export class FloTest extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.count = 1;
        this.tams = [{'title': `tam no ${this.count}`, items: new Array(this.count).fill(this.count)}];
        this.last = '';

        setInterval(() => {
            this.count++;
            this.tams.push({'title': `tam no ${this.count}`, items: new Array(this.count).fill(this.count)});
            this.render();
        }, 1000);

        setInterval(() => {
            this.count = 1;
            this.tams = [{'title': `tam no ${this.count}`, items: new Array(this.count).fill(this.count)}];
            this.render();
        }, 10000);
    }

    connectedCallback() {
        this.render();
    }

    tamChanged(event) {
        this.last = event.detail.title;
        this.render();
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/flo-test.css"/>
            <p>
                ${this.count}
                <h2>${this.last}</h2>
            </p>
            ${repeat(this.tams, tam => tam,
                tam => html`<tam-test @tam-changed=${this.tamChanged.bind(this)} tam-title="test" .tam=${tam} />`
            )}
        `, this.shadow);
    }
}

customElements.define('flo-test', FloTest);

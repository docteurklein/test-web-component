import {TamTest} from "./tam-test.js";
import {html, render} from '/node_modules/lit-html/lit-html.js';

export class FloTest extends HTMLElement {
    constructor() {
        super();
        this.count = 1;
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
        setInterval(() => this.count++ && this.render(), 1000);
    }

    render() {
        render(html`
            <link rel="stylesheet" href="/assets/css/flo-test.css"/>
            <p>
                ${this.count}
            </p>
            <tam-test name="default"/>
        `, this.shadow);
    }
}

customElements.define('flo-test', FloTest);

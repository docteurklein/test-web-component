
import {html, render} from '/node_modules/lit-html/lit-html.js';
import {repeat} from '/node_modules/lit-html/directives/repeat.js';

import {FloTest} from "./flo-test.js";
import {TamTest} from "./tam-test.js";

function listen_on(root) {
    return (type, selector, callback) => root.addEventListener(type, (event) => {
        if (event.target.matches(selector)) {
            callback(event);
        }
    });
}

export {listen_on, html, render, repeat};


import {FloTest} from "./flo-test.js";

export function listen_on(root) {
    return (type, selector, callback) => root.addEventListener(type, (event) => {
        if (event.target.matches(selector)) {
            callback(event);
        }
    });
}


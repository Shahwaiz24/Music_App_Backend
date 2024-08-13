"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let appLoger = (request, response, next) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let method = request.method;
    let url = request.url;
    console.log(`${date} | ${time} | ${method} | ${url}
        `);
};
exports.default = appLoger;

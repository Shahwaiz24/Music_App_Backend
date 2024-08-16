"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let AppLoger = (request, response, next) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let Method = request.method;
    let url = request.url;
    console.log(`${date} | ${time} | ${Method} | ${url}`);
    next();
};
exports.default = AppLoger;

import express from "express";

let appLoger = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let method = request.method;
    let url = request.url;

    console.log(`${date} | ${time} | ${method} | ${url}
        `)
}

export default appLoger;
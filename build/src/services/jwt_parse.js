"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//convert the token to the source user data
function parseJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64)
            .split('')
            .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
        return JSON.parse(jsonPayload).user;
    }
    catch (e) {
        //throw new Error('login first.');
        throw new Error("".concat(e));
    }
}
exports.default = parseJwt;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValdate(v) {
    //capital 
    var cap = false;
    for (var i = 0; i < v.length; i++) {
        if (v[i].toUpperCase() === v[i] && v[i].toLowerCase() !== v[i].toUpperCase()) {
            cap = true;
        }
    }
    // sign
    var sign = false;
    for (var i = 0; i < v.length; i++) {
        if (v[i] == '-' || v[i] == '*' || v[i] == '+' || v[i] == '@' || v[i] == '$' || v[i] == '&')
            sign = true;
    }
    var len = v.length >= 8 ? true : false;
    if (!cap || !sign || !len)
        return false;
    return true;
}
exports.default = isValdate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get_random_number(id) {
    if (id < 0)
        id *= -1;
    var n = Math.floor(Math.random() * (999999 - 11111 + 1) + 11111);
    console.log(n);
    return String(n) + id;
}
exports.default = get_random_number;

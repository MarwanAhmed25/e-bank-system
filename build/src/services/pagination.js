"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//paginate function with page number and limit the number of products per page
function pagination(page, limit, array_of_objects) {
    if (page && limit && array_of_objects) {
        var start_index = (page - 1) * limit;
        var end_index = page * limit;
        var result = { next: {}, data: {}, previous: {} };
        if (array_of_objects.length > end_index) {
            result.next = { page: page + 1, limit: limit };
        }
        if (start_index > 0) {
            result.previous = { page: page - 1, limit: limit };
        }
        result.data = array_of_objects.slice(start_index, end_index);
        return result;
    }
    return array_of_objects;
}
exports.default = pagination;

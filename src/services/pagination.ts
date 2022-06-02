
//paginate function with page number and limit the number of products per page
function pagination(page: number, limit: number, array_of_objects: any[]) {
    if (page && limit && array_of_objects) {
        const start_index = (page - 1) * limit;
        const end_index = (page) * limit;
        const result = { next: {}, data: {}, previous: {} };
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

export default pagination;
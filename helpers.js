function makeIndexedFunction(index, f) {
    return function(value) {
        f(index, value);
    };
}

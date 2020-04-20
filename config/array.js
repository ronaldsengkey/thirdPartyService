exports.removeArray = function (arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

exports.removeItem = function (array, item) {
    for (var i in array) {
        if (array[i]==item) {
            array.splice(i,1);
            break;
        }
    }
}
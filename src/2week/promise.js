var myPromise = function (callback) {
    var value = null;
    var state = 'pending';
    var successCallbackList = [];
    var failCallbackList = [];
    var resolve = function (res) {
        value = res;
        state = 'fulfilled';
        if (successCallbackList.length > 0) {
            successCallbackList.shift()(value);
        }
    };
    var reject = function (err) {
        value = err;
        state = 'rejected';
        if (failCallbackList.length > 0) {
            failCallbackList.shift()(value);
        }
    };
    var handleCallback = function (callback, resolve, reject) {
        var result = callback(value);
        console.log('-----------');
        console.log(result);
        console.log('-----------');
        if ((result === null || result === void 0 ? void 0 : result.then) && (result === null || result === void 0 ? void 0 : result["catch"])) {
            result.then(callback);
        }
        else {
            resolve(result);
        }
    };
    callback(resolve, reject);
    return {
        then: function (cb) {
            return myPromise(function (resolve, reject) {
                if (state === 'pending') {
                    successCallbackList.push(function () {
                        var res = handleCallback(cb, resolve, reject);
                        resolve(res);
                    });
                }
                if (state === 'fulfilled') {
                    var res = handleCallback(cb, resolve, reject);
                    resolve(res);
                }
            });
        },
        "catch": function (cb) {
            if (state === 'pending') {
                failCallbackList.push(cb);
            }
            if (state === 'rejected') {
                cb(value);
            }
        }
    };
};
var promise = myPromise(function (resolve) { return setTimeout(function () { return resolve('resolve!'); }, 1000); });
promise.then(function (res) {
    console.log(res);
    return myPromise(function (resolve) { return setTimeout(function () { return resolve("".concat(res, "222")); }, 1000); });
}).then(function (res2) {
    console.log(res2);
});

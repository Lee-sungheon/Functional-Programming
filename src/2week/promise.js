const myPromise = (callback) => {
  let value = null;
  let state = 'pending';
  let successCallbackList = [];
  let failCallbackList = [];

  const resolve = (res) => {
    value = res;
    state = 'fulfilled';
    if (successCallbackList.length > 0) {
      successCallbackList.shift()(value);
    }
  }

  const reject = (err) => {
    value = err;
    state = 'rejected';
    if (failCallbackList.length > 0) {
      failCallbackList.shift()(value);
    }
  }

  const handleCallback = (callback, resolve, reject) => {
    const result = callback(value);

    if (result?.then && result?.catch) {
      if (state === 'fulfilled') {
        result.then(resolve);
      }
      if (state === 'rejected') {
        result.catch(reject);
      }
      if (state === 'pending') {
        successCallbackList.push(() => result.then(resolve));
        failCallbackList.push(() => result.catch(reject));
      }
    } else {
      resolve(result);
    }
  }

  callback(resolve, reject);

  return {
    then: (cb) => {
      return myPromise((resolve, reject) => {
        if (state === 'pending') {
          successCallbackList.push(() => {
            const res = handleCallback(cb, resolve, reject);
            // resolve(res);
          });
        }
        if (state === 'fulfilled') {
          const res = handleCallback(cb, resolve, reject);
          // resolve(res);
        }
      });
    },
    catch: (cb) => {
      if (state === 'pending') {
        failCallbackList.push(cb);
      }
      if (state === 'rejected') {
        cb(value)
      }
    }
  }
}


const promise = myPromise((resolve) => setTimeout(() => resolve('resolve!'), 1000));

promise.then((res) => {
  console.log(res);
  return myPromise((resolve) => setTimeout(() => resolve(`${res}222`), 1000));
}).then((res2) => {
  console.log(res2);
  return myPromise((resolve) => setTimeout(() => resolve(`${res2}333`), 1000));
}).then((res3) => {
  console.log(res3);
});
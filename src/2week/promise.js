const myPromise = (callback) => {
  const successCallbackList = [];
  const failCallbackList = [];
  let value = null;
  let state = 'pending';

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

  callback(resolve, reject);

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
  };

  return {
    then: (cb) => {
      const successPromise = myPromise((resolve, reject) => {
        if (state === 'pending') {
          successCallbackList.push(() => handleCallback(cb, resolve, reject));
        }
        if (state === 'fulfilled') {
          handleCallback(cb, resolve, reject);
        }
      });
      return successPromise;
      return myPromise((resolve, reject) => {
        if (state === 'pending') {
          successCallbackList.push(() => handleCallback(cb, resolve, reject));
        }
        if (state === 'fulfilled') {
          handleCallback(cb, resolve, reject);
        }
      });
    },
    catch: (cb) => {
      return myPromise((resolve, reject) => {
        if (state === 'pending') {
          failCallbackList.push(() => handleCallback(cb, resolve, reject));
        }
        if (state === 'rejected') {
          handleCallback(cb, resolve, reject);
        }
      });
    }
  }
}

myPromise.all = (promises = []) => {
  return myPromise((resolve, reject) => {
    let count = promises.length;
    const returnArray = [];
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          returnArray[index] = value;
          --count;
          !count && resolve(returnArray);
        })
        .catch(reject);
    });
  })
}

myPromise.allSettled = (promises = []) => {
  return myPromise((resolve, reject) => {
    let count = promises.length;
    const returnArray = [];
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          returnArray[index] = {status: 'fulfilled', value};
          --count;
          !count && resolve(returnArray);
        })
        .catch((err) => {
          console.log('err : ' + err);
          returnArray[index] = {status: 'rejected', reason: err};
          --count;
          if (!count) {
            console.log(returnArray)
            resolve(returnArray);
          }
        });
    });
  })
}
//
// const promise = myPromise((resolve) => setTimeout(() => resolve('resolve!'), 1000));
// const promise2 = myPromise((resolve) => setTimeout(() => resolve('resolve2!'), 2000));
const promise3 = myPromise((resolve, reject) => setTimeout(() => reject(new Error('reject!')), 1500));

// promise.then((res) => {
//   console.log(res);
//   return myPromise((resolve) => setTimeout(() => resolve(`${res}222`), 1000));
// }).then((res2) => {
//   console.log(res2);
//   return myPromise((resolve) => setTimeout(() => resolve(`${res2}333`), 1000));
// }).then((res3) => {
//   console.log(res3);
// }).catch((err) => console.log(err));

// myPromise.all([promise, promise2]).then(res => console.log(res));
// myPromise.allSettled([promise3]).then(res => console.log(res)).catch(res => console.log(res));
myPromise.allSettled([promise3]).then(res => console.log(res));

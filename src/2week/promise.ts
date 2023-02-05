const myPromise = <T = any>(callback: (resolve, reject) => any) => {
  let value: T | Error | null = null;
  let state: 'pending' | 'rejected' | 'fulfilled' = 'pending';
  let successCallbackList: Function[] = [];
  let failCallbackList: Function[] = [];

  const resolve = (res) => {
    value = res;
    state = 'fulfilled';
    if (successCallbackList.length > 0) {
      successCallbackList.shift()(value);
    }
  }

  const reject = (err: Error) => {
    value = err;
    state = 'rejected';
    if (failCallbackList.length > 0) {
      failCallbackList.shift()(value);
    }
  }

  const handleCallback = (callback, resolve, reject) => {
    const result = callback(value);
    console.log('-----------');
    console.log(result)
    console.log('-----------');
    if (result?.then && result?.catch) {
      result.then(callback);
    } else {
      resolve(result);
    }
  }

  callback(resolve, reject);

  return {
    then: (cb: Function) => {
      return myPromise((resolve, reject) => {
        if (state === 'pending') {
          successCallbackList.push(() => {
            const res = handleCallback(cb, resolve, reject);
            resolve(res);
          });
        }
        if (state === 'fulfilled') {
          const res = handleCallback(cb, resolve, reject);
          resolve(res);
        }
      });
    },
    catch: (cb: Function) => {
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
});
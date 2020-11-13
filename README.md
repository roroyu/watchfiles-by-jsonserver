# Watch multiple Json files And run json-server

## References
[typicode](https://github.com/typicode)/**[json-server](https://github.com/typicode/json-server)**

[打造多檔案結構的json-server](https://billyyyyy3320.com/zh/2019/07/21/create-json-server-with-multiple-files/)

## 
run it by `forever start -c "npm start" ./`

and you need modify some code in json-server/src/cli/utils/load.js
for Promise db.js
```js
  let data = dataFn();
  if ( typeof data.then == 'function' ) {
    data = data.then(res => {
      return resolve(low(new Memory()).setState(res));
    })
  } else {
    resolve(low(new Memory()).setState(data));
  }
```
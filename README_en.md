# Watch multiple Json files And run json-server

## References
[typicode](https://github.com/typicode)/**[json-server](https://github.com/typicode/json-server)**

[打造多檔案結構的json-server](https://billyyyyy3320.com/zh/2019/07/21/create-json-server-with-multiple-files/)

## Run it
run it by `forever start -c "npm start" ./`

I put data in `../json-data/data`
If you change `nodemon --watch path` in package.json, You need modify _db.js too.
You can put some .json in `../json-data/data/gogo/poem.json`

And look it like use `http://localhost:port/gogo/poem?author_like=`

**And you need modify some code in `json-server/src/cli/utils/load.js` for Promise db.js for Now json-server:  0.16.2**

in end of else isJS
```js
      // const data = dataFn();
      // resolve(low(new Memory()).setState(data));
      let data = dataFn();
      if ( typeof data.then == 'function' ) {
        data = data.then(res => {
          return resolve(low(new Memory()).setState(res));
        })
      } else {
        resolve(low(new Memory()).setState(data));
      }
```

And forever stop cannot stop json-server.
Maybe you need
```bash
lsof -i:9898
sudo kill -9 PID
```
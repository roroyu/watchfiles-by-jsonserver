# 用 json-server 监控一个目录下的多个json文件

## 参照了以下项目做了适当改动
[typicode](https://github.com/typicode)/**[json-server](https://github.com/typicode/json-server)**

[打造多檔案結構的json-server](https://billyyyyy3320.com/zh/2019/07/21/create-json-server-with-multiple-files/)
## 运行

```bash
git clone 到本地目录
npm install
```

**And you need modify some code in `json-server/src/cli/utils/load.js` for Promise db.js for Now json-server:  0.16.2**
为了能让json-server用 Promise，需要修改 `json-server/src/cli/utils/load.js` 
*json-server:  0.16.2* 还没有对应Promise 
大概在文件的后半段，isJS分支里
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

运行 用 `nodemon --watch /jsonpath`  监控存放json文件的目录
如果改目录，需要手动修改`_db.js`文件
*目前的目录是分离开的，为了数据可以单独保存*

## 运行
`npm start` 可以直接启动 
run it by `forever start -c "npm start" ./`

I put data in `../json-data/data`
If you change `nodemon --watch path` in package.json, You need modify _db.js too.
You can put some .json in `../json-data/data/gogo/poem.json`

And look it like use `http://localhost:port/gogo/poem?author_like=`


有时候 `forever` 或 `nodemon` 重启时不能自动停止 `json-server`的进程 
有可能需要以下命令查找端口号或者进程，手动杀掉进程.

```bash
# 查端口占用
lsof -i:9898 #端口号
# 或者查进程
ps -ef | grep nodemon
# 然后 kill PID
sudo kill -9 PID #进程号


```
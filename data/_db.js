const load = require("json-server/lib/cli/utils/load")

const Path = require("path");
const glob = require("glob");
// const apiFiles = glob.sync(Path.resolve(__dirname, "./") + "/**/[!_]*.json", {
const apiFiles = glob.sync(Path.resolve(__dirname, "../../json-data") + "/**/[!_]*.json", {
  nodir: true
});
let data = {};

var promises = [];
apiFiles.forEach(filePath => {
    let [, url] = filePath.split("/data/");
    url =
        url.slice(url.length - 9) === "/index.js"
        ? url.slice(0, url.length - 9) // remove /index.js
        : url.slice(0, url.length - 5); // remove .js
    // const api = require(filePath);
    console.log('url: ', url)
    console.log('filePath: ', filePath)
    promises.push(load(filePath).then(res => {
        console.log('res: ', res.value().length)
        return { url: url, data: res.value() }
    }))
})

module.exports = () => {
    return Promise.all(promises).then(rows => {
        // var data = {}
        rows.forEach((v)=>{
            console.log(v.url)
            data[v.url.replace(/\//g, "-")] = v.data
        })
        // console.log('data: ', data)
        return data
    });
};
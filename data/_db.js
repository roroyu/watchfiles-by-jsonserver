const load = require("json-server/lib/cli/utils/load")

const Path = require("path");
const glob = require("glob");
const apiFiles = glob.sync(Path.resolve(__dirname, "./") + "/**/[!_]*.json", {
  nodir: true
});
let data = {};
// async function getData() {
//     console.log('2')

//     await apiFiles.forEach(async filePath => {
//         // const api = require(filePath);
//         const d = (await load(filePath)).value()
//         console.log(d)
//         let [, url] = filePath.split("data/");
//         url =
//             url.slice(url.length - 9) === "/index.js"
//             ? url.slice(0, url.length - 9) // remove /index.js
//             : url.slice(0, url.length - 5); // remove .js
//     // console.log(filePath)
//     // console.log(api)
//     // console.log(url.replace(/\//g, "-"))
//     //   data[url.replace(/\//g, "-")] = api;
//     data[url.replace(/\//g, "-")] = d;
//     console.log(data)
//     });
//     console.log(data)
//     return data
// }
var promises = [];
apiFiles.forEach(filePath => {
    let [, url] = filePath.split("data/");
    url =
        url.slice(url.length - 9) === "/index.js"
        ? url.slice(0, url.length - 9) // remove /index.js
        : url.slice(0, url.length - 5); // remove .js
    // const api = require(filePath);
    console.log('filePath: ', filePath)
    promises.push(load(filePath).then(res => {
        console.log('res: ', res.value().length)
        // data[url.replace(/\//g, "-")] = res.value();
        return { url: url, data: res.value() }
    }))
    // console.log('d: ', d.length)
// console.log(filePath)
// console.log(api)
// console.log(url.replace(/\//g, "-"))
//   data[url.replace(/\//g, "-")] = api;
// console.log('data: ', data.length)
// return d
})
console.log('promises: ', promises)

// Promise.all(promises).then(rows => {
//     // var data = {}
//     rows.forEach((v)=>{
//         console.log(v.url)
//         data[v.url.replace(/\//g, "-")] = v.data
//     })
//     // console.log('data: ', data)
//     return data
//     // module.exports = () => {
//     //     console.log('1: ', data)
//     //     return data;
//     // }  
// })    
// console.log('bbb: ', data)

module.exports = () => {
    console.log('1: ', data)
    // return {}
    // return await getData()
    return Promise.all(promises).then(rows => {
        // var data = {}
        rows.forEach((v)=>{
            console.log(v.url)
            data[v.url.replace(/\//g, "-")] = v.data
        })
        // console.log('data: ', data)
        return data
        // module.exports = () => {
        //     console.log('1: ', data)
        //     return data;
        // }
    });
};
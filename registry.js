const fetch = require('node-fetch');
const fs = require("fs");
const { workerData, parentPort } = require('worker_threads')


let fromIndex = 0;
const maxSize = 250;







(async () => {
    console.log(workerData);
    const res = await fetch(`https://api.npms.io/v2/search?q=not:deprecated&size=10&from=${workerData}`)
    const data = await res.json();
    parentPort.postMessage(data)
})();

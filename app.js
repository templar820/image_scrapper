
const fs = require('fs');
const { Worker } = require('worker_threads');

// // //читать потоком
// let fileContent = JSON.parse(fs.readFileSync("search.json", "utf8"));
// let fileContent = JSON.parse(fs.readFileSync("result.json", "utf8"));
// console.log(fileContent.length);






// const myArr = fileContent.slice(0, 1000)


function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./registry.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}

const resultFile = fs.createWriteStream(`./result.json`, {flags: 'a'});
resultFile.write("[");

async function run(request_array, limit) {
    let currentIndex = -10;
    const startScrap = () => {
        if (currentIndex >= request_array.length) return;
        currentIndex+=10
        return runService(currentIndex).then(data => {
            resultFile.write(JSON.stringify(data.results,null, 3));
            resultFile.write(", \n");
        }).then(startScrap).catch(startScrap);
    }
    for (let i =0; i < limit; i++){
        return startScrap();
    }
}

run(new Array(1794969), 16).catch(err => console.error(err)).then(() => {
    resultFile.write("[]]");
})






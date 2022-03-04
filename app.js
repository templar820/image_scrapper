//
const fs = require('fs');
// const { Worker } = require('worker_threads');
//
//
// // //читать потоком
// let fileContent = JSON.parse(fs.readFileSync("search.json", "utf8"));
// let fileContent = JSON.parse(fs.readFileSync("result.json", "utf8"));
// console.log(fileContent.length);



/**
 * Implement function getResult
 */

// numb = [4, 2, 8, -5, 2]
//  numb = [-4, 2, 8, -5, -2]
//  numb = [-4, -2, 8, -5, -2]
// getResult(nums) = [4, 2, 8]


// function getResult(numb) {
//     // Write your code here...
//     const sumMap = new Map();
//
//     for (let i =0; i<numb.length; i++) {
//         for (let j = i; j < numb.length; j++) {
//             const buffArr = numb.slice(i,j+1);
//             sumMap.set(buffArr.reduce((a,b) => a+b),buffArr)
//         }
//     }
//     return sumMap.get(Math.max(...sumMap.keys()))
// }
//
// console.log(getResult(numb))



// numb = [2, 1, 1]
// function checkPol(numb){
//     const length = numb.length;
//     const numberDictionary = new Map();
//     numb.forEach(el => {
//         if (numberDictionary.has(el)){
//             numberDictionary.set(el, numberDictionary.get(el)+1)
//         } else {
//             numberDictionary.set(el, 1)
//         }
//     })
//     let values = Array.from(numberDictionary.values());
//     if (length%2 === 0 ){
//         return values.every(el => el%2===0);
//     } else {
//         let flag = false;
//         let result = true;
//         values.forEach(el => {
//             if (el %2 !== 0){
//                 if (!flag){
//                     flag = true;
//                 } else {
//                     result =false;
//                 }
//             }
//         })
//         return result;
//     }
// }
// console.log(checkPol(numb));

// s = "sgdd"
// k = 1
// stringGoal = "gdd"
//
// function getString(s,k,stringGoal){
//     const dictionary = new Map();
//
//     const checkIdentity = (str) => {
//         let resultArr=[]
//         let count = 0;
//         for (let i=0; i< str.length; i++){
//             if (str[i] === stringGoal[i]){
//                 count++;
//             } else {
//                 resultArr.push(count)
//                 count=0
//             }
//         }
//         resultArr.push(count)
//         return Math.max(...resultArr);
//     }
//
//     const cutLetter = (buffString) => {
//         for (let i =0; i< buffString.length; i++){
//             let t = Array.from(buffString);
//             t.splice(i,1)
//             dictionary.set(t.join(''), 0);
//         }
//     }
//
//     for (let i=0; i<= k; i++){
//         if (i ===0){
//             cutLetter(s)
//         }
//
//         Array.from(dictionary.keys()).forEach(el =>{
//             if (el.length === s.length -i + 1){
//                 cutLetter(el)
//             }
//         })
//     }
//
//     for (const [key, value] of dictionary.entries()){
//         dictionary.set(key, checkIdentity(key))
//     }
//
//      return Math.max(...dictionary.values());
// }
//
// console.log(getString(s, k, stringGoal));


// const myArr = fileContent.slice(0, 1000)
//
//
// function runService(workerData) {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker('./scraper.js', { workerData });
//         worker.on('message', resolve);
//         worker.on('error', reject);
//         worker.on('exit', (code) => {
//             if (code !== 0)
//                 reject(new Error(`Worker stopped with exit code ${code}`));
//         })
//     })
// }
//
// const resultFile = fs.createWriteStream(`./result.json`, {flags: 'a'});
// resultFile.write("[");
//
// async function run(request_array, limit) {
//     let currentIndex = -1;
//     const startScrap = () => {
//         if (++currentIndex >= request_array.length) return;
//         const word = request_array[currentIndex];
//         return runService(word[1]).then(data => {
//             // const object = JSON.parse(data);
//             data.id = word[0];
//             resultFile.write(JSON.stringify(data,null, 3));
//             resultFile.write(", \n");
//         }).then(startScrap).catch(startScrap);
//     }
//     for (let i =0; i < limit; i++){
//         startScrap();
//     }
// }
//
// run(myArr, 5).catch(err => console.error(err))
//



// treasures = [5, 4, 10, 2, 5]
// // getResult(treasures) = 14
// // В данном случае, вы забрали сокровища 0, 2 и 4 дня (4 + 5 + 5 = 14)
//
// function getResult(treasures) {
//     const treasuresMap = new Map();
//     // массив индексов
//     const collectTreasure = (indexPath) => {
//         let sum = treasures[indexPath[0]];
//         for (let i =1; i< indexPath.length; i++){
//             if(indexPath[i-1]+1 === indexPath[i]){
//                 sum+=treasures[indexPath[i]]/2
//             } else{
//                 sum+=treasures[indexPath[i]]
//             }
//         }
//         return Math.ceil(sum)
//     }
//
//     const getPath = (array) => {
//         if (!array.length) return
//         treasuresMap.set(collectTreasure(array), array)
//         for (let i=0; i< array.length; i++){
//             const buffArray = [...array];
//             buffArray.splice(i,1);
//             getPath(buffArray)
//         }
//     }
//
//
//     getPath(Object.keys(treasures).map(el => Number(el)));
//     return Math.max(...treasuresMap.keys())
// }
//
//
// console.log(getResult(treasures));




// Сегодня Аристократия организовывает пир. Мы знаем количество гостей, ваша задача рассадить всех за стол.
//
//     Однако, некоторые гости дали вам список неприятелей, с которыми они не сядут.
//
//     Стулья расставили так, что у стола оказалось два крайних места, у которых только один соседний гость. В остальных случаях соседа два.
//
//     Определите, можно ли рассадить гостей так, чтобы все оказались довольны.
//
//     Ввод:
//
// invited_list -  количество приглашённых гостей,  0<invited_list<10
// dislike_list - строчный массив неприятелей, ["1-2,3"] - означает, что гость под номером 1 не сядет с гостями 2 и 3
// Вывод:
//
//     Boolean - возможно ли рассадить гостей так, чтобы они все были довольны

invited_list = 5
dislike_list = ["1-2,3", "3-4,5", "2-3"]
// getResult(invited_list, dislike_list) = True // [1, 4, 2, 3]

function getResult(invitedList, dislikeList) {
    const modifyDislikeList = dislikeList.reduce((acc, el) => {
        if (el.includes(",")){
            const arrayGuest = el.split(",");
            const sourceGuest = arrayGuest[0][0];
            const firstPaar = arrayGuest.splice(0,1);
            acc.push(firstPaar.flat());
            acc.push(...arrayGuest.map(item => {
                return `${sourceGuest}-${item}`
            }))
        } else {
            acc.push(el);
        }
        return acc.flat();
    }, [])
    const tablePlacementMap = new Map();
    const guestArray = new Array(invitedList).fill(0).map((el,index) => index+1)

    const checkArray = (array) => {
        let flag = true;
        for (let i =1; i< array.length; i++){
            const dislikeItem = `${array[i-1]}-${array[i]}`
            if (flag){
                flag = !modifyDislikeList.find((el)=> {
                    return el=== dislikeItem || el === Array.from(dislikeItem).reverse().join("")
                });
            }

        }
        return flag
    }
    const getPath = (array, remainingArray) => {
        if (array.length === guestArray.length) {
            tablePlacementMap.set(array, checkArray(array))
            return;
        }
        for (let i = 0; i< remainingArray.length; i++){
            const buffArray = [...remainingArray];
            const item = buffArray[i];
            buffArray.splice(i,1);
            getPath([...array,item], buffArray)
        }
    }

    for (let i=0; i< guestArray.length; i++){
        const buffArray = [...guestArray];
        const item = buffArray[i];
        buffArray.splice(i,1);
        getPath([item], buffArray)
    }

    return Array.from(tablePlacementMap.values()).some(el => el);

}


console.log(getResult(invited_list, dislike_list));




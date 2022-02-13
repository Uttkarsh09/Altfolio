function getCoinList(){
    return fetch("https://api.coingecko.com/api/v3/coins/list", {
        mode: "cors"
    })
    .then((res)=>res.text())
    .then((data)=>{
        return new Promise((resolve, reject)=>{
            resolve(data ? JSON.parse(data) : {})
        })
    })
}

async function getCoinsInfo(coins){
    const promiseArray = [];
    
    coins.forEach(coin=>{
        console.log(`FETCHING ${coin.id}`);
        promiseArray.push(fetchCoin(coin.id));
    })
    return Promise.all(promiseArray)
    .then(resolvedPromises=>{
        const allData = [];
        resolvedPromises.forEach(promise=>{
            allData.push(promise.json())
        })
        return Promise.all(allData)
    });
}

function fetchCoin(coinID){
    const query = `https://api.coingecko.com/api/v3/coins/${coinID}?` + new URLSearchParams({
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true
    });
    return fetch(query, {
        mode: "cors"
    });
}

export {getCoinList, getCoinsInfo, fetchCoin};
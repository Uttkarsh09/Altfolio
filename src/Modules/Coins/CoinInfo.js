async function getCoinList(){
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    let json;
    if(res.ok){
        console.log("Coins List recieved");
        json = await res.json();
        console.log(json)
        return json;
    } else {
        console.log("Error while recieveing coin list");
    }
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
    return fetch(query);
}

export {getCoinList, getCoinsInfo};
function findCoinInfo({coinList, coinID}){
    const coin = coinList.find(item=>item.id===coinID);
    if(coin === undefined){
        return false;
    }
    return coin;
}

export {findCoinInfo};
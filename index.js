require('dotenv').config().parser;
const ccxt = require('ccxt');
const axios = require('axios');

const tick = async(config,binanceClient) => {
    
    const {asset, base, allocation, spread, tickInterval} = config;
    //const {apiKey, apiSecret} = binanceClient;
    const market = `${asset}/${base}`;
    console.log(market);
    let orderbook = await binanceClient.fetchOrderBook(market);
    
    // console.log (binanceClient.id, orderbook.bids[0])
    
    const balances  = await binanceClient.fetchBalance();
    
    
    const assetBalance = balances.free[asset];
    console.log(assetBalance);
    const baseBalance = balances.free[base];
    
    console.log(baseBalance);
    
    if (assetBalance > 0){

        console.log('assetBalance +')
        console.log (orderbook.bids[0])
        console.log('assetBalance BNB')
        //console.log(assetBalance)
        console.log('---------------baseBalance USDT-----------------')
        //console.log(baseBalance)
        orderbook.bids.forEach(function(item) {
            let c_item = count(item)
            console.log('c_item')
            console.log(c_item)

        });
        // sell 1 BNB/USDT for market price, sell a bitcoin for dollars immediately
        //console.log(binanceClient.id, await binanceClient.createMarketSellOrder(market, assetBalance))
    }
    
    
    // const balance = await binanceClient.watchBalance(market)
    // console.log(new Date(), balance);
    // console.log(binanceClient.has['watchBalance']);
    // console.log(binanceClient.watchBalance(market));
    //console.log(binanceClient.has);
    
    // const orders = await binanceClient.fetchOpenOrders(market);
    // console.log(orders);
    // if (binanceClient.has['watchBalance']) {
    //     while (true) {
    //         try {
    //             const balance = await binanceClient.watchBalance(market)
    //             console.log(new Date(), balance)
    //         } catch (e) {
    //             console.log(e)
    //             // stop the loop on exception or leave it commented to retry
    //             // throw e
    //         }
    //     }
    // }

    // console.log(`
    //     Orden ${orders}...
    // `);
    // orders.forEach(async order => {
    //     await binanceClient.cancelOrder(order.id);
    // });

    // const results = await Promise.all([
    //     axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
    //     axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'),
    // ]);
    // console.log(results[0].data.bitcoin.usd);
    // console.log(results[0].data.tether.usd);
    // const marketPrice = results[0].data.bitcoin.usd / results[1].data.tether.usd;

    //console.log (binanceClient.id,  await binanceClient.fetchTicker(market))
    
    // console.log(await binanceClient.loadMarkets())
    //console.log(await binanceClient.fetchOrderBook(market))
    // let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
    // let ask = orderbook.asks ? orderbook.asks[0][0] : undefined
    // let spread1 = (bid && ask) ? ask - bid : undefined
    // console.log (binanceClient.id, 'market price', { bid, ask, spread1 })
    // console.log (binanceClient.id, 'market price', { orderbook })
    
    //fetchtrades trae array de buy y sell 
    // console.log (binanceClient.id,  await binanceClient.fetchTrades(market))
    
    // 
    // console.log (binanceClient.id,  await binanceClient.fetchCurrencies())
    // const sellPrice = marketPrice * (1 + spread);
    // const buyPrice  = marketPrice * (1 - spread);

    // console.log(`
    //     Balances ${balances}...
    //     SellPrice ${sellPrice}
    //     buyPrice ${buyPrice}
    //     marketPrice ${marketPrice}
    //     spread ${spread}
    // `);
    // const account_balance = binanceClient.fetch_balance();

    
    
    // const sellVolumen = assetBalance * allocation;
    // const buyVolumen  = (baseBalance* allocation) / marketPrice;

    // await binanceClient.createLimitSellOrder(market,sellVolumen, sellPrice);
    // await binanceClient.createLimitBuyOrder(market, buyVolumen, buyPrice);

    // console.log(`
    //     Nuevo ticket para ${market}...
    //     assetBalance: ${assetBalance}
    //     baseBalance: ${baseBalance}
    //     marketPrice: ${marketPrice}
    //     sellPrice: ${sellPrice}
    //     buyPrice: ${buyPrice}
    //     Creada orden de venta límite por ${sellVolumen}@${sellPrice}
    //     Creada orden de compra límite por ${buyVolumen}@${buyPrice}
    // `);
    //market_order_placement = bittrex.create_market_sell_order ('ETH / BTC', .001)
     // buy 1 BTC/USD for $2500, you pay $2500 and receive ฿1 when the order is closed
     // console.log (okcoinusd.id, await okcoinusd.createLimitBuyOrder ('BTC/USD', 1, 2500.00))
 
     // pass/redefine custom exchange-specific order params: type, amount, price or whatever
     // use a custom order type
     // bitfinex.createLimitSellOrder ('BTC/USD', 1, 10, { 'type': 'trailing-stop' })

}

const run = () => {
    
    const config = {
        asset: 'BTC',
        base: 'USDT',
        allocation: 0.1,
        spread: 0.2,
        tickInterval: 3000
    };

    // console.log(process.env.API_ENV);
    // console.log(process.env.API_SECRET);
    
    const binanceClient = new ccxt.binance({
        'apiKey': process.env.API_ENV,
        'secret': process.env.API_SECRET,
        'enableRateLimit': true,
    });
    // Quitar 
    // binanceClient.setSandboxMode(true);
    // console.log (binanceClient.requiredCredentials) // prints required credentials
    // binanceClient.checkRequiredCredentials()    
    //console.log(binanceClient);
    // tick(config,binanceClient);

    // setInterval(tick,config.tickInterval,config,binanceClient);
    
    // console.log (ccxt.exchanges);
    // console.log (binanceClient);
    tick(config,binanceClient);
    setInterval(tick,config.tickInterval,config,binanceClient);
}

run();
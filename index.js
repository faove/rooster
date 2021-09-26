require('dotenv').config().parser;
const ccxt = require('ccxt');
const axios = require('axios');

const tick = async(config,binanceClient) => {
    const {asset, base, allocation, spread, tickInterval} = config;
    //const {apiKey, apiSecret} = binanceClient;
    const market = `${asset}/${base}`;
    console.log(market);
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

    const results = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'),
    ]);
    // console.log(results[0].data.bitcoin.usd);
    // console.log(results[0].data.tether.usd);
    const marketPrice = results[0].data.bitcoin.usd / results[1].data.tether.usd;

    const sellPrice = marketPrice * (1 + spread);
    const buyPrice  = marketPrice * (1 - spread);
    const balances  = await binanceClient.fetchBalance();

    // console.log(`
    //     Balances ${balances}...
    //     SellPrice ${sellPrice}
    //     buyPrice ${buyPrice}
    //     marketPrice ${marketPrice}
    //     spread ${spread}
    // `);
    // const account_balance = binanceClient.fetch_balance();

    
    const assetBalance = balances.free[asset];
    console.log(assetBalance);
    const baseBalance = balances.free[base];
    
    console.log(baseBalance);
    
    const sellVolumen = assetBalance * allocation;
    const buyVolumen  = (baseBalance* allocation) / marketPrice;

    // await binanceClient.createLimitSellOrder(market,sellVolumen, sellPrice);
    // await binanceClient.createLimitBuyOrder(market, buyVolumen, buyPrice);

    console.log(`
        Nuevo ticket para ${market}...
        assetBalance: ${assetBalance}
        baseBalance: ${baseBalance}
        marketPrice: ${marketPrice}
        sellPrice: ${sellPrice}
        buyPrice: ${buyPrice}
        Creada orden de venta límite por ${sellVolumen}@${sellPrice}
        Creada orden de compra límite por ${buyVolumen}@${buyPrice}
    `);
    //market_order_placement = bittrex.create_market_sell_order ('ETH / BTC', .001)

}

const run = () => {
    
    const config = {
        asset: 'SHIB',
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
    
    //console.log(binanceClient);
    // tick(config,binanceClient);

    // setInterval(tick,config.tickInterval,config,binanceClient);
    
    // console.log (ccxt.exchanges);
    // console.log (binanceClient);
    tick(config,binanceClient);
    setInterval(tick,config.tickInterval,config,binanceClient);
}

run();
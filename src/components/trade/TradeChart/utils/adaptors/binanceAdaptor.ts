//binance candle adaptor


function timeToLocal(originalTime) {
  const d= new Date(originalTime );
//, {timeZone: "Asia/Shanghai"}
  //return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString('zh-CN'));

  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
}

// function convertTZ(date, tzString) {
//   return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
// }
//
// // usage: Asia/Jakarta is GMT+7
// convertTZ("2012/04/20 10:10:30 +0000", "Asia/Jakarta") // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time)

export const candleAdaptor = (data: Array<any>) => {
    if(data.length !== 12) throw new Error("invalid candle received");

    const [
        openTime,
        open,
        high,
        low,
        close,
        volume,
        //closeTime,
        //quoteAssetVolume,
        //numberOfTrades,
        //takerBuyBaseAssetVolume,
        //takerBuyQuotessetVolume,
        //ignore,
      ] = data;

    return {
        time: timeToLocal(openTime) / 1000,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        value: parseFloat(volume),
        color: undefined,

        // closeTime,
        // quoteAssetVolume,
        // numberOfTrades,
        // takerBuyBaseAssetVolume,
        // takerBuyQuotessetVolume,
        // ignore,
    };
};

//binance socket candle adaptor
export const socketAdaptor = (data: any) => {
    const candle = data.k;
    let time, open, high, low, close, volume;

    time = candle.t;
    open = candle.o;
    high = candle.h;
    low = candle.l;
    close = candle.c;
    volume = candle.v;

    return {
        time: timeToLocal(time) / 1000,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        value: parseFloat(volume),
        color: undefined,
    };
};

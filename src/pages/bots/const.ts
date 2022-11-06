
export interface BotStats {
  lastPrice: number,
  startTime: Date,
  symbol: string,
  market:object,
  postion:object,
  numTrades: number;
  profit: number;
  unrealizedProfit: number;
  netProfit: number,
  grossProfit: number,
  grossLoss: number,
  averageCost: number,
  buyVolume: number,
  sellVolume: number,
  feeInUSD: number,
  baseAssetPosition: number,
  currencyFees:object
}

export interface TradeStats {
  symbol: string,
  winningRatio: number,
  numOfLossTrade: number,
  numOfProfitTrade: number,
  grossProfit: number,
  grossLoss:  number,
  profits: [],
  losses: [],
  largestProfitTrade: number,
  largestLossTrade: number,
  averageProfitTrade: number,
  averageLossTrade: number,
  profitFactor: number,
  totalNetProfit: number,
  maximumConsecutiveWins: number,
  maximumConsecutiveLosses: number,
  maximumConsecutiveProfit: number,
  maximumConsecutiveLoss: number
}

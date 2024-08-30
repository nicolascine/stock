// Stock class representing a single stock with historical price data
class Stock {
    private prices: Record<string, number>;
  
    constructor(prices: { date: string; price: number }[]) {
      this.prices = prices.reduce((acc, { date, price }) => {
        acc[date] = price;
        return acc;
      }, {} as Record<string, number>);
    }
  
    // Method to get the price of the stock on a specific date
    public getPrice(date: string): number {
      if (!(date in this.prices)) {
        throw new Error(`Price for date ${date} not available.`);
      }
      return this.prices[date];
    }
  }
  
  // Portfolio class representing a collection of stocks
  class Portfolio {
    private stocks: Stock[];
  
    constructor(stocks: Stock[]) {
      this.stocks = stocks;
    }
  
    // Method to calculate the profit of the portfolio between two dates
    public getProfit(startDate: string, endDate: string): number {
      const totalStartValue = this.stocks.reduce((sum, stock) => sum + stock.getPrice(startDate), 0);
      const totalEndValue = this.stocks.reduce((sum, stock) => sum + stock.getPrice(endDate), 0);
  
      return totalEndValue - totalStartValue;
    }
  
    // Method to calculate the annualized return of the portfolio between two dates
    public getAnnualizedReturn(startDate: string, endDate: string): number {
      const profit = this.getProfit(startDate, endDate);
      const totalStartValue = this.stocks.reduce((sum, stock) => sum + stock.getPrice(startDate), 0);
  
      // Calculate the number of days between the two dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  
      // Calculate the annualized return
      const annualizedReturn = ((1 + profit / totalStartValue) ** (365 / days)) - 1;
  
      return annualizedReturn;
    }
  }
  
  // Example usage
  
  // Define example stocks with historical price data
  const stockA = new Stock([
    { date: '2024-01-01', price: 100 },
    { date: '2024-06-01', price: 110 },
    { date: '2024-12-01', price: 115 },
  ]);
  
  const stockB = new Stock([
    { date: '2024-01-01', price: 200 },
    { date: '2024-06-01', price: 210 },
    { date: '2024-12-01', price: 205 },
  ]);
  
  // Create a portfolio with the example stocks
  const portfolio = new Portfolio([stockA, stockB]);
  
  // Define the date range for calculating profit and annualized return
  const startDate = '2024-01-01';
  const endDate = '2024-12-01';
  
  // Calculate and display the profit and annualized return of the portfolio
  console.log(`Profit from ${startDate} to ${endDate}:`, portfolio.getProfit(startDate, endDate).toFixed(2));
  console.log(`Annualized Return from ${startDate} to ${endDate}:`, (portfolio.getAnnualizedReturn(startDate, endDate) * 100).toFixed(2) + '%');
  
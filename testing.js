const axios = require('axios'); // Assuming you use Axios for requests

// Import keys from a separate file for security reasons
const { consumerKey, consumerSecret, accessToken, accessSecret, bearerToken } = require('./keys.js');

async function getBTCPrice() {
  """
  Fetches the current Bitcoin price from the CoinGecko API.

  Returns:
      float: The current Bitcoin price in USD.
  """
  const url = "https://api.coingecko.com/api/v3/coins/bitcoin?vs_currency=usd";
  try {
    const response = await axios.get(url);
    return parseFloat(response.data.market_data.current_price.usd);
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return null;
  }
}

async function getETHPrice() {
  """
  Fetches the current Ethereum price from the CoinGecko API.

  Returns:
      float: The current Ethereum price in USD.
  """
  const url = "https://api.coingecko.com/api/v3/coins/ethereum?vs_currency=usd";
  try {
    const response = await axios.get(url);
    return parseFloat(response.data.market_data.current_price.usd);
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
    return null;
  }
}

function calculatePercentChange(currentPrice, baselinePrice) {
  """
  Calculates the percentage change in price from a baseline.

  Args:
      currentPrice: The current price.
      baselinePrice: The baseline price for comparison.

  Returns:
      float: The percentage change.
  """
  if (baselinePrice === 0) {
    return 0;
  }
  return ((currentPrice - baselinePrice) / baselinePrice) * 100;
}

function generatePriceBar(percentChange) {
  """
  Generates a visual representation of the price change using emojis.

  Args:
      percentChange: The percentage change in price.

  Returns:
      str: The emoji representation of the price bar.
  """
  if (percentChange <= 25) {
    return "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜";
  } else if (percentChange <= 50) {
    return "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜";
  } else if (percentChange <= 75) {
    return "⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜";
  } else if (percentChange <= 100) {
    return "⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜";
  } else {
    return "I will now recalibrate to the next ATH : 1,000,000";
  }
}

function generateTweet(currentBTCPrice, ethToBTCratio, percentChange) {
  """
  Generates the tweet text with price information and emoji bar.

  Args:
      currentBTCPrice: The current Bitcoin price.
      ethToBTCratio: The current ETH/BTC price ratio.
      percentChange: The percentage change in Bitcoin price.

  Returns:
      str: The formatted tweet text.
  """
  const priceBar = generatePriceBar(percentChange);
  return (
    `\n\n $` +
    currentBTCPrice.toFixed(2) +
    `\n eth/btc: ` +
    ethToBTCratio.toFixed(2) +
    `\n ${priceBar}`
  );
}

async function main() {
  // Baseline price for comparison (replace with your desired value)
  const baselinePrice = 100000.01;

  while (true) {
    const currentBTCPrice = await getBTCPrice();
    if (!currentBTCPrice) {
      console.error("Failed to get Bitcoin price. Skipping tweet.");
      continue;
    }

    const ethPrice = await getETHPrice();
    if (!ethPrice) {
      console.error("Failed to get Ethereum price. Skipping tweet.");
      continue;
    }

    const ethToBTCratio = ethPrice / currentBTCPrice;
    const percentChange = calculatePercentChange(currentBTCPrice, baselinePrice);

    const tweetText = generateTweet(currentBTCPrice, ethToBTCratio, percentChange);
    console.log(tweetText);


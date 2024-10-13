package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

// Import keys from a separate file for security reasons
const (
	consumerKey     string = "<your_consumer_key>"
	consumerSecret string = "<your_consumer_secret>"
	accessToken     string = "<your_access_token>"
	accessSecret    string = "<your_access_secret>"
	bearerToken     string = "<your_bearer_token>"
	baselinePrice   float64 = 100000.01
)

type Price struct {
	MarketData struct {
		CurrentPrice struct {
			USD float64 `json:"usd"`
		} `json:"current_price"`
	} `json:"market_data"`
}

func getBTCPrice(url string) (float64, error) {
	"""
	Fetches the current Bitcoin price from the CoinGecko API.

	Args:
	  url: The URL of the CoinGecko API endpoint.

	Returns:
	  float64: The current Bitcoin price in USD.
	  error: Any error encountered during the request.
	"""
	resp, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	var data Price
	err = json.Unmarshal(body, &data)
	if err != nil {
		return 0, err
	}

	return data.MarketData.CurrentPrice.USD, nil
}

func getETHPrice(url string) (float64, error) {
	"""
	Fetches the current Ethereum price from the CoinGecko API.

	Args:
	  url: The URL of the CoinGecko API endpoint.

	Returns:
	  float64: The current Ethereum price in USD.
	  error: Any error encountered during the request.
	"""
	return getBTCPrice(url) // Reusing the getBTCPrice function
}

func calculatePercentChange(currentPrice, baselinePrice float64) float64 {
	"""
	Calculates the percentage change in price from a baseline.

	Args:
	  currentPrice: The current price.
	  baselinePrice: The baseline price for comparison.

	Returns:
	  float64: The percentage change.
	"""
	if baselinePrice == 0 {
		return 0
	}
	return (currentPrice - baselinePrice) / baselinePrice * 100
}

func generatePriceBar(percentChange float64) string {
	"""
	Generates a visual representation of the price change using emojis.

	Args:
	  percentChange: The percentage change in price.

	Returns:
	  string: The emoji representation of the price bar.
	"""
	switch {
	case percentChange <= 25:
		return "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜"
	case percentChange <= 50:
		return "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜"
	case percentChange <= 75:
		return "⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜"
	case percentChange <= 100:
		return "⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜"
	default:
		return "I will now recalibrate to the next ATH : 1,000,000"
	}
}

func generateTweet(currentBTCPrice, ethToBTCratio, percentChange float64) string {
	"""
	Generates the tweet text with price information and emoji bar.

	Args:
	  currentBTCPrice: The current Bitcoin price.
	  ethToBTCratio: The current ETH/BTC price ratio.
	  percentChange: The percentage change in Bitcoin price.

	Returns:
	  string: The formatted tweet text.
	"""
	priceBar := generatePriceBar(percentChange)
	return fmt.Sprintf("\n\n $%.2f\n eth/btc: %.2f\n %s", currentBTCPrice, ethToBTCratio, priceBar)
}

func main() {
	for {
		currentBTCPrice, err := getBTCPrice("https://api.coingecko.com/api/

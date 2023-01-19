import { useEffect, useState } from "react";

function App2() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(coins);

  function onChange(event) {
    setMyMoney(event.target.value);
  }

  return (
    <div>
      <h1>The Coin! {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onChange}
        value={myMoney}
        type="number"
        placeholder={"please input your money."}
      />
      <br />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): {myMoney / coin.quotes.USD.price}{" "}
              {coin.symbol}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App2;

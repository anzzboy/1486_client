import { useState, useEffect } from "react";

import Navbar from "./Navbar";

function App() {
  const [serverStatus, setServerStatus] = useState("Server down");
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data
    async function fetchData() {
      const response = await fetch(
        `https://store-website-backend-1.onrender.com/lists/`
      );
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      setData(await response.json());
      setServerStatus("Server Up");
    }
    fetchData();
    return;
  });

  const removeAll = () => {
    // loop and remove all data
    data.map((obj) => {
      try {
        const response = fetch(
          `https://store-website-backend-1.onrender.com/lists/${obj._id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          console.error(`A error has occurred: ${response.statusText}`);
          return;
        }
      } catch (e) {
        console.error("Fetch error: ", e);
      }
    });
  };

  let totalMoney = 0;
  data.map((obj) => {
    totalMoney += obj.order.total;
  });
  return (
    <>
      <br></br>
      {serverStatus}
      <br></br>
      {"Total money made today: " + totalMoney}
      <button onClick={removeAll}>Clear</button>
    </>
  );
}

function Admin() {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState("");

  if (/[^0-9.]/i.test(input)) {
    setInput(input.slice(0, -1));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(parseFloat(input));

    if (input == 1234) {
      setVerified(true);
    }
    setInput("");
  };

  return (
    //passwrod stuff, show app component if guessed right
    <>
      <Navbar />
      {verified ? (
        <App />
      ) : (
        <>
          <h1>
            Password: 1234
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </h1>
        </>
      )}
    </>
  );
}

export default Admin;

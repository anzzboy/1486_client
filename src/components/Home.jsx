import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import Navbar from "./Navbar";

/* eslint-disable react/prop-types */

function FoodItem({ name, price, addItem, removeItem, amtBought }) {
  return (
    <>
      {name + ", you bought " + amtBought + " " + price + "$"}
      <button onClick={addItem}>Add</button>
      <button onClick={removeItem}>Remove</button>
    </>
  );
}

function Home() {
  const cookies = new Cookies();

  const [forceUpdater, forceUpdate] = useState(0);
  const [serverStatus, setServerStatus] = useState("Server Down");
  const [msg, setMsg] = useState("");

  const menu = [
    ["hotdog", 23],
    ["burger", 12],
    ["lemonaid", 1],
    ["sprite", 6],
    ["water", 33],
    ["onions", 53],
    ["mustard", 0.1],
    ["pickles", 13],
    ["rootbeer", 1000],
    ["beer", 1],
  ];

  const [order, setOrder] = useState(
    cookies.get("order")
      ? cookies.get("order")
      : {
          hotdog: 0,
          burger: 0,
          lemonaid: 0,
          sprite: 0,
          water: 0,
          onions: 0,
          mustard: 0,
          pickles: 0,
          rootbeer: 0,
          beer: 0,
          total: 0,
        }
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://store-website-backend-1.onrender.com/lists/`
      );
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      setServerStatus("Server Up");
    }
    fetchData();
    return;
  });

  const addItem = (name, price) => {
    let temp_order = order;
    temp_order[name] += 1;
    temp_order.total += price;

    setOrder(temp_order);
    cookies.set("order", temp_order, { path: "/" });
    forceUpdate(forceUpdater + 1);
  };
  const removeItem = (name, price) => {
    let temp_order = order;
    temp_order[name] -= 1;
    temp_order.total -= price;

    setOrder(temp_order);
    cookies.set("order", temp_order, { path: "/" });
    forceUpdate(forceUpdater + 1);
  };
  const buy = async () => {
    try {
      const response = await fetch(
        `https://store-website-backend-1.onrender.com/lists/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: order }),
        }
      );
      if (!response.ok) {
        console.error(`A error has occurred: ${response.statusText}`);
        return;
      }
    } catch (e) {
      console.error("Fetch error: ", e);
    }

    const temp_order = {
      hotdog: 0,
      burger: 0,
      lemonaid: 0,
      sprite: 0,
      water: 0,
      onions: 0,
      mustard: 0,
      pickles: 0,
      rootbeer: 0,
      beer: 0,
      total: 0,
    };

    setOrder(temp_order);
    cookies.set("order", temp_order, { path: "/" });

    setMsg(order.total);
  };

  return (
    <>
      <Navbar />
      <br></br>
      {serverStatus}
      <div className="flex">
        {menu.map((list) => {
          const map_name = list[0];
          const map_price = list[1];

          return (
            <FoodItem
              key={map_name}
              name={map_name}
              price={map_price}
              addItem={() => addItem(map_name, map_price)}
              removeItem={() => removeItem(map_name, map_price)}
              amtBought={order[map_name]}
            />
          );
        })}

        <button onClick={buy}>Buy</button>
        {msg == "" ? (
          <></>
        ) : (
          <>
            {" "}
            {"Pay up, " + msg + "$"}{" "}
            <button onClick={navigator.clipboard.writeText(msg)}>Copy</button>
          </>
        )}
      </div>
    </>
  );
}

export default Home;

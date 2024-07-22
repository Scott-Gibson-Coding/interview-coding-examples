import { useEffect, useState } from "react";

export function StateExample1() {
  const [count, setCount] = useState(0);

  function handleIncCountBy2() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>
        Current count is: <span>{count}</span>
      </p>
      <button onClick={handleIncCountBy2}>Inc by 2</button>
    </div>
  );
}

export function StateExample2() {
  const [count, setCount] = useState(0);

  function incCountAndUseNewValue() {
    setCount(count + 1);
    handleNewCount(count);
  }

  function handleNewCount(val) {
    console.log(val);
  }

  return (
    <div>
      <p>
        Current count is: <span>{count}</span>
      </p>
      <button onClick={incCountAndUseNewValue}>Inc and use</button>
    </div>
  );
}

export function StateExample3() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function updatePositionX() {
    setPosition({ x: 45 });
  }

  return (
    <div>
      <p>
        Position: [{position.x}, {position.y}]
      </p>
      <button onClick={updatePositionX}>Update</button>
    </div>
  );
}

/** Maybe make this example a little less obvious. */
export function EffectExample1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 50);
  }, [count]);

  return (
    <p
      style={{
        color: count > 50 ? "red" : "black",
      }}
    >
      {count}
    </p>
  );
}

/**
 * This example needs some work done. Maybe switch from async
 * api as a scenario to more robust state management? It should
 * touch on the concept that state updates for complex Javascript
 * objects should be pure.
 */
const mockEntries = ["a", "b", "c"];
async function getEntries() {
  return new Promise((resolve) => resolve(mockEntries));
}
export function PureFunction1() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function populateEntries() {
      const apiEntries = await getEntries(); // ["a", "b", "c"]

      setEntries((entries) => {
        entries = entries.concat(apiEntries);
        return entries;
      });
    }
    populateEntries();
  }, []);

  return (
    <div>
      <ul style={{ padding: 0 }}>
        {entries.map((entry, index) => (
          <li
            style={{
              display: "inline",
              background: "#3300CCCC",
              textIndent: "none",
              paddingBlock: "2px",
              paddingInline: "4px",
              marginRight: "8px",
              fontSize: "1.25rem",
              color: "white",
            }}
            key={index}
          >
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

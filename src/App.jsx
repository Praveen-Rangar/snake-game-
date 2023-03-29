import { useEffect, useState } from "react";

function App() {
  // const [x, setX] = useState(100);
  // const [y, setY] = useState(100);
  // const [key_code, setKey_code] = useState("");

  // const handleInput = (e) => {
  //   setKey_code(e.key);
  //   // if (e.key === 'Arrow' ) {
  //   // ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  //   // }
  // };

  // useEffect(() => {
  //   setInterval(() => {
  //     switch (key_code) {
  //       case "ArrowUp":
  //         console.log("arroeUprunning", y);
  //         setY(y - 10);
  //         break;
  //       case "ArrowDown":
  //         setY(y + 10);
  //         break;
  //       case "ArrowLeft":
  //         setX(x - 10);
  //         break;
  //       case "ArrowRight":
  //         setX(x + 10);
  //         break;
  //     }
  //   }, 200);
  //   setKey_code("");
  // }, [x, y, key_code]);

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [foodX, setFoodX] = useState(150);
  const [foodY, setFoodY] = useState(150);
  const [keyPressed, setKeyPressed] = useState("none");
  const [arr, setArr] = useState([]);
  const [score, setScore] = useState(0);
  const [snakeSpeed, setSnakeSpeed] = useState(200);

  document.addEventListener(
    "keyup",
    (event) => {
      const name = event.key;
      setKeyPressed(name);
      // Alert the key name and key code on keydown
    },
    false
  );

  const handleSnakeSpeed = (e) => {
    if (e.target.value === "medium") {
      setSnakeSpeed(200);
    } else if (e.target.value === "easy") {
      setSnakeSpeed(400);
    } else if (e.target.value === "hard") {
      setSnakeSpeed(80);
    }

    const mySelect = document.getElementById("speed");
    speed.blur();
  };

  function food_Colied() {
    if (
      x >= foodX - 10 &&
      x <= foodX + 10 &&
      y >= foodY - 10 &&
      y <= foodY + 10
    ) {
      return true;
    } else {
      return false;
    }
  }
  const snakecollide = () => {
    arr.forEach((e) => {
      console.log("e[0]", e[0], "x", x, "e[1]", y);
      if (e[0] == x && e[1] == y) {
        console.log("running snakeCollide");
        setScore(0);
        setArr([]);
      }
    });
  };

  useEffect(() => {
    if (food_Colied()) {
      setFoodX(Math.round(Math.random() * 350));
      setFoodY(Math.round(Math.random() * 325));
      setScore(score + 1);
    }
    if (arr.length > score) {
      arr.splice(0, 1);
    }
    const interval = setInterval(() => {
      setArr((prevArr) => [...prevArr, [x, y]]);

      switch (keyPressed) {
        case "ArrowUp":
          setY(y - 10);
          break;
        case "ArrowDown":
          setY(y + 10);
          break;
        case "ArrowLeft":
          setX(x - 10);
          break;
        case "ArrowRight":
          setX(x + 10);
          break;
      }

      if (x > 390) {
        setX(0);
      }
      if (x < 0) {
        setX(390);
      }
      if (y > 370) {
        setY(0);
      }
      if (y < 0) {
        setY(370);
      }
    }, snakeSpeed);
    snakecollide();

    return () => clearInterval(interval);
  }, [x, y, keyPressed, foodX, foodY, score, snakeSpeed]);

  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "38px",
          width: "500px",
          height: "500px",
        }}
      >
        <div className="">snake game</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            marginLeft: "5px",
          }}
        >
          <div className="">{score}</div>
          <select
            onChange={handleSnakeSpeed}
            name="speed"
            id="speed"
            style={{
              fontSize: "15px",
              border: "2px solid black",
              height: "30px",
              borderRadius: "5px",
              outline: "2px solid transparent",
              outlineOffset: "2px",
            }}
          >
            <option>level</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>

            <option value="hard">hard</option>
          </select>
        </div>

        <div
          style={{
            position: "relative",
            width: "400px",
            height: "400px",
            border: "2px solid blue",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              border: "1px solid blue",
              backgroundColor: "blue",
              position: "absolute",
              left: x,
              top: y,
              borderRadius: "10px",
            }}
          ></div>
          {arr.map((e, index) => (
            <div
              key={index}
              style={{
                width: "8px",
                height: "8px",
                border: "1px solid skyblue",
                backgroundColor: "skyblue",
                position: "absolute",
                left: e[0],
                top: e[1],
                borderRadius: "10px",
              }}
            ></div>
          ))}
          <div
            style={{
              width: "8px",
              height: "8px",
              border: "1px solid green",
              backgroundColor: "green",
              position: "absolute",
              left: foodX,
              top: foodY,
              borderRadius: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;

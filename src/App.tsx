
import { useEffect, useState } from "react";

const genrateTile = Array.from({ length: 9 }).map((_, index) => ({
  isOn: false,
  id: index + 1,
}));
function App() {
  const [tiles, setTiles] = useState(genrateTile);
  const [switchTiles, setSwitchTiles] = useState(false);
  const [tilesOrder, setTilesOrder] = useState<number[]>([]);

  useEffect(() => {
    if (tiles.every((item) => item.isOn)) setSwitchTiles(true);
    if (tiles.every((item) => !item.isOn)){ 
      setSwitchTiles(false)
      setTilesOrder([])
    }
  }, [tiles]);

  useEffect(() => {
    if (switchTiles) {
      let id:number
      const newArr = [...tilesOrder];
      id = setInterval(() => {
        let init = newArr.shift();
        if (init) {
          setTiles((prev) =>
            prev.map((item) =>
              item.id === init ? { ...item, isOn: false } : item
            )
          );
        }
        if (!newArr.length) {
          clearInterval(id);
          return;
        } 
      }, 600);
      return () => clearInterval(id);
    }
  }, [switchTiles, tilesOrder]);

  const handleTiles = (index: number) => {
    const updateTiles = [...tiles];
    updateTiles[index].isOn = true;
    setTiles(updateTiles);
    if (!tilesOrder.includes(updateTiles[index].id)) {
      setTilesOrder([...tilesOrder, updateTiles[index].id]);
    }
  };
console.log(tilesOrder);

  return (
    <div className="container h-screen grid place-items-center ">
      <div className=" max-w-lg w-full grid grid-cols-3 ">
        {tiles.map((tile, index) => {
          return (
            <div
              key={index}
              className={` border h-32 cursor-pointer border-black ${
                tile.isOn ? "bg-green-600" : "bg-white"
              } `}
              onClick={() => handleTiles(index)}
            ></div>
          );
        })}
      </div>
    </div>
  )
}

export default App

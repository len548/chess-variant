const inferCoord = (x, y, chessBoard) => {
  // console.log("actual mouse coordinates: " + x + ", " + y)
  /*
        Should give the closest estimate for new position. 
    */
  let hashmap = {};
  let shortestDistance = Infinity;
  for (let i = 0; i < CHESSBOARD_SIZE; i++) {
    for (let j = 0; j < CHESSBOARD_SIZE; j++) {
      const canvasCoord = chessBoard[i][j].getCanvasCoord();
      // calculate distance
      const delta_x = canvasCoord[0] - x;
      const delta_y = canvasCoord[1] - y;
      const newDistance = Math.sqrt(delta_x ** 2 + delta_y ** 2);
      hashmap[newDistance] = canvasCoord;
      if (newDistance < shortestDistance) {
        shortestDistance = newDistance;
      }
    }
  }

  return hashmap[shortestDistance];
};
// this is an enum, but if u use typescript you can use the normal enum, i highly reccomend you to use TS
const PlayerColor = {
    WHITE: 'white',
    BLACK: 'black'
};

export { inferCoord };

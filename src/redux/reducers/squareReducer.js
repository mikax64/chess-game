const axeX = ["a", "b", "c", "d", "e", "f", "g", "h"];
//const axeY = [1, 2, 3, 4, 5, 6, 7, 8];
const squareNames = [];
const squareList = [];

for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    squareNames.push(axeX[j - 1] + i);
  }
}
console.log(parseInt(squareNames[44].slice(-1)));

for (let i = 0; i < squareNames.length; i++) {
  let firstColor = null;
  let secondColor = null;
  if (squareNames[i].slice(-1) % 2) {
    firstColor = "white";
    secondColor = "black";
  } else {
    firstColor = "black";
    secondColor = "white";
  }
  squareList.push({
    name: squareNames[i],
    color: i % 2 ? firstColor : secondColor
  });
}

export const squareReducer = (state = squareList) => {
  return state;
};

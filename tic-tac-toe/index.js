const grid = document.getElementById("grid-container");
let turn = "user";
const shapeMap = {
  user: "o",
  bot: "x",
};

const createGrid = () => {
  let cellCount = 0;
  for (let i = 0; i < 3; i++) {
    const gridRow = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      cell.id = cellCount++;
      gridRow.appendChild(cell);
    }
    grid.appendChild(gridRow);
  }
};
createGrid();

const toggleTurn = () => (turn = turn == "user" ? "bot" : "user");

const addSymbol = () => {
  const img = document.createElement("img");
  img.src = `./assets/images/${shapeMap[turn]}.svg`;
  img.alt = shapeMap[turn];

  const div = document.createElement("div");
  div.appendChild(img);

  return div;
};
grid.addEventListener("click", (e) => {
  cell = e.target.closest("td");
  if (!cell || cell.dataset.fill) return;

  cell.dataset.fill = turn;
  cell.appendChild(addSymbol());

  toggleTurn();

  botMove();
});

const getAllCells = () => {
  const grid = document.getElementById("grid-container");
  const rows = grid.childNodes;
  cells = [];
  for (let row of rows) {
    cells = [...cells, ...row.childNodes];
  }
  return cells;
};

const getUserCells = () =>
  getAllCells().filter((cell) => cell.dataset.fill === "user");
const getBotCells = () =>
  getAllCells().filter((cell) => cell.dataset.fill === "bot");

const getAllRemainingCells = () =>
  getAllCells().filter((cell) => !cell.dataset.fill);

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cornerCells = [0, 2, 6, 8];
const edgeCells = [1, 3, 5, 7];
const centerCell = 4;

const findNextBotMove = () => {
  const userCells = getUserCells();
  const botCells = getBotCells();

  const userOnlyWCs = winningCombos.filter((combo) =>
    userCells.some((cell) => combo.includes(+cell.id))
  );
  const actualUserWCs = userOnlyWCs.filter(
    (combo) => !botCells.some((cell) => combo.includes(+cell.id))
  );

    const possibleNextCells = [...new Set(actualUserWCs.flat())];
    
    console.log(possibleNextCells)
  const nextCell =
        possibleNextCells[Math.floor(Math.random() * possibleNextCells.length)];
    
    
    
    // console
};

const botMove = () => {
  if (turn === "user") return;

  const cells = getAllCells();

  const remainingCells = getAllRemainingCells();

  const remainingCornerCells = remainingCells.filter((cell) =>
    cornerCells.includes(+cell.id)
  );

  if (remainingCornerCells.length) {
    const getRandCornerCell =
      remainingCornerCells[
        Math.floor(Math.random() * remainingCornerCells.length)
      ];
    getRandCornerCell.dataset.fill = turn;
    getRandCornerCell.appendChild(addSymbol());
  }

  //   if (cornerCell) console.log(remainingCells);

  findNextBotMove();
  toggleTurn();
};

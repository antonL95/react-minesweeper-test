import './App.css';
import {useState} from "react";

function App() {

    let [x, setX] = useState(12);
    let [y, setY] = useState(x);
    let [mines, setMines] = useState(20);

    const handelSubmit = (e) => {
        let x = e.target.elements['x'].value;
        let mines=e.target.elements['mines'].value;

        if (x**2 < mines) {
            alert('more mines then cells')
            return;
        }

        setX(x);
        setY(x);
        setMines();
        e.preventDefault()
    }


    const emptyBoard = (x = 14, y = 14) => {
        let board = [];
        for (let i = 0; i < x; i++) {
            board.push([]);
            for (let j = 0; j < y; j++) {
                board[i][j] = {
                    mine: false,
                    x: i,
                    y: j,
                    isEmpty: false,
                    minesNearBy: 0
                };
            }
        }
        return board;
    };

    const setMinesOnBoard = (board, numberOfX, numberOfY, mines) => {
        let c = 0;
        let randX = 0;
        let randY = 0;
        while (c < mines) {
            randX = Math.floor(Math.random() * numberOfX);
            randY = Math.floor(Math.random() * numberOfY);
            if (!board[randX][randY].mine) {
                board[randX][randY].mine = true
                c++;
            }
        }
        return board;
    }

    const examineEachCell = (currentX, currentY, data, x, y) => {
        const el = [];

        //up
        if (currentX > 0) {
            el.push(data[currentX - 1][currentY]);
        }

        //down
        if (currentX < y - 1) {
            el.push(data[currentX + 1][currentY]);
        }

        //left
        if (currentY > 0) {
            el.push(data[currentX][currentY - 1]);
        }

        //right
        if (currentY < x - 1) {
            el.push(data[currentX][currentY + 1]);
        }

        // top left
        if (currentX > 0 && currentY > 0) {
            el.push(data[currentX - 1][currentY - 1]);
        }

        // top right
        if (currentX > 0 && currentY < x - 1) {
            el.push(data[currentX - 1][currentY + 1]);
        }

        // bottom right
        if (currentX < y - 1 && currentY < x - 1) {
            el.push(data[currentX + 1][currentY + 1]);
        }

        // bottom left
        if (currentX < y - 1 && currentY > 0) {
            el.push(data[currentX + 1][currentY - 1]);
        }

        return el;
    }


    const areaAroundMine = (boardWithMines, x, y) => {
        let updatedData = boardWithMines;

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (boardWithMines[i][j].mine !== true) {
                    let mine = 0;
                    const area = examineEachCell(boardWithMines[i][j].x, boardWithMines[i][j].y, boardWithMines, x, y);
                    area.map((value) => {
                        if (value.mine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].minesNearBy = mine;
                }
            }
        }

        return (updatedData);
    }

    const renderBoard = (board) => {
        return board.map(boardRow => {
            return boardRow.map(cell => {
                return (
                    <div>
                        <div className="cell">
                            {cell.mine && (<span>x</span>)}
                            {cell.minesNearBy > 0 && (<span>{cell.minesNearBy}</span>)}
                        </div>
                        {(boardRow[boardRow.length - 1] === cell) ? <div className="clear" /> : ""}
                    </div>
                )
            })
        })
    }

    let board = emptyBoard(x, y);
    let boardWithMines = setMinesOnBoard(board, x, y, mines)
    let finalBoard = areaAroundMine(boardWithMines, x, y)

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <input type="number" name="x" placeholder="board size"/>
                <input type="number" name="mines"  placeholder="mines" />
                <input type="submit"/>
            </form>
            {renderBoard(finalBoard)}
        </div>
    );
}

export default App;

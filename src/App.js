import React, {useState, useEffect} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import "./basic.css"


// Language module //

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }

    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Main function ///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SealBreaker = () => {

  // Init block //
  const [init, setInit] = useState(true)
    const [grid] = useState([])
    const [columns, setColumns] = useState(3)
    const [rows, setRows] = useState(3)
      let newRow = [], newTile, tileIndex = 0

  // Operating block//
  const [click, setClick] = useState(-1)
    const [newRound, setNewRound] = useState(false)
    const [isWin, setIsWin] = useState([])
    const [endGame, setEndGame] = useState(false)



  // Grid initialization //

  if (init === true) {
    const createGrid = () => {
      for (let i = 0; i < rows; i++ ) {
        for (let x = 0; x < columns; x++ ) {
          newTile = <button value={tileIndex} empty="true" key={x}>0</button>
          newRow.push(newTile)
          tileIndex++
        }
        grid.push(newRow)
        newRow = []
      }
    }
    setInit(false)
    createGrid()
  }


  // Next round check //
  if (click !== -1 && click !== undefined) {
    if (newRound === true) {
      setNewRound(!newRound)
      setClick(-1)
    }
  }

  // Row index function //
  const rowIndex = (id, sealMaker = 0) => {
    return Math.floor(id / columns - sealMaker)

  }

  // Column index function //
  const columnIndex = (id, sealMaker = 0) => {
    return id % columns - sealMaker
  }

  // Grid data refresh //
  const tileRefresh = (column = 0, row = 0) => {
    let isEmpty
    isEmpty = grid[rowIndex(click, row)][columnIndex(click, column)].props.empty === "true" ? "false" : "true"
    
    return grid[rowIndex(click, row)][columnIndex(click, column)] = <button value={grid[rowIndex(click, row)][columnIndex(click, column)].props.value} empty={isEmpty}>{isEmpty}</button>
  }



  useEffect(()=>{
    if (endGame === false) {
      if (click !== -1 && click !== undefined) {

        tileRefresh()
          if (!(columnIndex(click, 1) < 0)) {tileRefresh(1,0)}
          if (!(columnIndex(click, -1) >= columns)) {tileRefresh(-1,0)}
          if (!(rowIndex(click, 1) < 0)) {tileRefresh(0,1)}
          if (!(rowIndex(click, -1) >= rows)) {tileRefresh(0,-1)}

          
        // Win check //

        setIsWin([])
        for (let i = 0; i < rows; i++ ) {
          for (let x = 0; x < columns; x++ ) {
            isWin.push(grid[i][x].props.empty)
          }
        }

        if (!isWin.includes("true")) {
          setEndGame(true)
        }

        setNewRound(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click])
  
  

  return (
    <table>
      <tbody>
        {grid.map((grid, index) =>
          <tr key={index}>
            {grid.map ((tile, index) =>
              <td className='tile' key={index} onClick={e => setClick(e.target.value)}>{tile}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

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
    const [grid, setGrid] = useState([])
    const [columns, setColumns] = useState(5)
    const [rows, setRows] = useState(5)
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
          newTile = <button value={tileIndex} key={x}>{tileIndex}</button>
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
  const rowIndex = (id) => {
    return Math.floor(id / rows)
  }

  // Column index function //
  const columnIndex = (id) => {
    return id % columns
  }



  // Grid data refresh //

  useEffect(()=>{
    if (endGame === false) {
      if (click !== -1 && click !== undefined) {
          grid[rowIndex(click)][columnIndex(click)] = <div className='tile'>X</div>
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

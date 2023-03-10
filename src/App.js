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
    const [columns, setColumns] = useState(3)
    const [rows, setRows] = useState(3)
      let newRow = [], newTile, tileIndex = 0

  // Operating block //
  const [click, setClick] = useState(-1)
    const [newRound, setNewRound] = useState(false)
    const [roundCounter, setRoundCounter] = useState(0)
    const [isWin, setIsWin] = useState([])
    const [endGame, setEndGame] = useState(false)

  // DtoIn validation //
    if (columns > 5) {setColumns(5)}
    if (columns < 3) {setColumns(3)}
    if (rows > 5) {setRows(5)}
    if (rows < 3){ setRows(3)}

  // Grid initialization //

  if (init === true) {
    const createGrid = () => {
      for (let i = 0; i < rows; i++ ) {
        for (let x = 0; x < columns; x++ ) {
          newTile = <button className='empty' value={tileIndex} empty="true" key={x}></button>
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
    let isEmpty, bgSwitch
    isEmpty = grid[rowIndex(click, row)][columnIndex(click, column)].props.empty === "true" ? "false" : "true"
    bgSwitch = isEmpty === "false" ? "fill" : "empty"  

    return grid[rowIndex(click, row)][columnIndex(click, column)] = <button className={bgSwitch} value={grid[rowIndex(click, row)][columnIndex(click, column)].props.value} empty={isEmpty}></button>
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
        setRoundCounter(roundCounter +1)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click])


  // Re-init //

  useEffect(()=>{
    setInit(true)
    setGrid([])
  }, [columns, rows])
  
  

  return (
    <>
    <h1>{language.title}</h1>
    <h3 className='right'>{language.turn} {roundCounter}</h3>

    <div className='left'>
      <input type={"number"} min="3" max="5"  placeholder={language.setRows} onChange={e => setRows(e.target.value)}></input>
      <input type={"number"} min="3" max="5"  placeholder={language.setColumns} onChange={e => setColumns(e.target.value)}></input>
      <form><input type={"submit"} value={language.reset}></input></form>
    </div>

    { endGame ?
      <h2>{language.win}</h2>
    :
      ""
    }

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
    </>
  )
}

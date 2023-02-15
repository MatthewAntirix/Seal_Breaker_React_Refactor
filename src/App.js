import React, {useState, useEffect} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import reactImageSrc from "./images/react.png"
import "./basic.css"

const reactImage = <img key={1} src={reactImageSrc} alt="fillTile" />


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

  // Operating block//
  const [click, setClick] = useState(-1)
    const [newRound, setNewRound] = useState(false)
    const [roundCounter, setRoundCounter] = useState(0)
    const [isWin, setIsWin] = useState([])
    const [endGame, setEndGame] = useState(false)



  // Grid initialization //

  if (init === true) {
    const createGrid = () => {
      for (let i = 0; i < rows; i++ ) {
        for (let x = 0; x < columns; x++ ) {
          newTile = <button value={tileIndex} empty="true" key={x}></button>
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
    let isEmpty, imgSwitch
    isEmpty = grid[rowIndex(click, row)][columnIndex(click, column)].props.empty === "true" ? "false" : "true"
    imgSwitch = isEmpty === "false" ? reactImage : "" 
    
    return grid[rowIndex(click, row)][columnIndex(click, column)] = <button value={grid[rowIndex(click, row)][columnIndex(click, column)].props.value} empty={isEmpty}>{imgSwitch}</button>
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
  
  

  return (
    <>
    <h1>{language.title}</h1>
    <h3 className='right'>{language.turn} {roundCounter}</h3>

    {/* ToDo */}
    <div className='left'>
      <input type={"number"} min="3" max="15"  placeholder={language.setRows} onChange={e => setRows(e.target.value)}></input>
      <input type={"number"} min="3" max="15"  placeholder={language.setColumns} onChange={e => setColumns(e.target.value)}></input>
      {/* <button onClick={e => setInit(true)}>New Game</button> */}
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

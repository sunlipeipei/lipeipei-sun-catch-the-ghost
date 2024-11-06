import { useContext } from "react"
import { BoardContext, BoardProvider } from "../Components/BoardContext"
import Board from "../Components/Board"
import './Page.css'
import Header from "../Components/Header"

export default function GameMedium(){
  const {resetGame} = useContext(BoardContext);
  return (
    <div>
      <Header></Header>
      <div className="container">
        <h3>Catch the Ghost</h3>
        <Board />
        <button onClick={()=>resetGame()}>Reset Game</button>
      </div>
    </div>
    )
}
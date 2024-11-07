import { useContext } from "react"
import { BoardContext } from "../Components/BoardContext"
import Board from "../Components/Board"
import './Page.css'
import Header from "../Components/Header"

export default function GameHard(){
  const {resetGame, message, ghostCounts} = useContext(BoardContext);

  return (
    <div>
      <Header></Header>
      <div className="container">
        <h3>{message}</h3>
        <h3>{ghostCounts} 👻</h3>
        <Board />
        <button onClick={()=>resetGame()}>Reset Game</button>
      </div>
    </div>
    )
}
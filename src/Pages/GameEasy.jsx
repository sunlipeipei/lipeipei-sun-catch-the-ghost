import Header from "../Components/Header";
import './Pages.css'
import Board from "../Components/Board";
import { CatchTheGhostContext } from "../Components/CatchTheGhostProvider";
import { useContext } from "react";

export default function GameEasy(){
    const globalProps = useContext(CatchTheGhostContext);

    return(
        <div className="container">
            <Header />
            <h3>{globalProps.messageState}</h3>
            <h3>{globalProps.flaggedGhostCountState} 👻</h3>
            <Board />
            <button onClick={()=>globalProps.resetGame()}>Reset Game</button>
        </div>
    )
}
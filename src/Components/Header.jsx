import './Header.css'
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <div className='header'>
            <Link className='text' to="/">HOME</Link>
            <Link className='text' to="/game/easy">EASY</Link>
            <Link className='text' to="/game/medium">MEDIUM</Link>
            <Link className='text' to="/game/hard">HARD</Link>
            <Link className='text' to="/rules">RULES</Link>
        </div>
    )
}
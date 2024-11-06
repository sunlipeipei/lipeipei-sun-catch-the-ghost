// import { useContext } from 'react'
import './Cell.css';

export default function Cell({ cell, onClick, onRightClick }) {
    const className = cell.isRevealed ? 'defaultCell revealedCell' : 'defaultCell';

    return (
        <div
            className={className}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onRightClick(e.shiftKey);
            }}
        >
            {cell.isRevealed 
            ? (cell.isMine ? '👻' : cell.mineCount)
            : (cell.isFlagged ? '🎃' : '')}
        </div>
    );
}
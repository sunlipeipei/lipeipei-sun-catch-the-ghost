import './GhostCell.css'

export default function GhostCell({cell, onClick, onRightClick}){

    const className = cell.isRevealed ? (cell.isGhost ? 'defaultCell revealedCellGhost' : 'defaultCell revealedCellSafe') : 'defaultCell';

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
            ? (cell.isGhost ? '👻' : (cell.ghostCount===0? '':cell.ghostCount))
            : (cell.isFlagged ? '🎃' : '')
            }    
        </div>
    )
}
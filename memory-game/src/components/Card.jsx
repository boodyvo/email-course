import React, { useState } from 'react';
import './Card.css';

export default function Card({ isFlipped, isChecked, onClick, isWrong }) {
    return (
        <div className={`card ${isFlipped ? '' : 'card--flipped'}`} onClick={onClick}>
            <div className={`card__side card__side--front ${isWrong ? 'card__wrong' : isChecked ? 'card__checked' : 'card__not--checked'}`}>
            </div>
            <div className="card__side card__side--back">
            </div>
        </div>
    );
}

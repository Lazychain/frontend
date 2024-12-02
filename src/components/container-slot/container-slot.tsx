import './style-container-slot.css';
import React, { useState, useEffect, useRef } from 'react';


export const ContainerSlot = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [winClass, setWinClass] = useState('');
  const reelRefs = useRef([]);

  const iconHeight = 79;
  const numIcons = 9;
  const timePerIcon = 100;

  const roll = async (offset: number, winner: boolean) => {
    let position = 1;
    if (!winner) {
      position = Math.round(Math.random() * numIcons);
    }
    const delta = (offset + 2) * numIcons + position;
    const deltaTime = ((8 + delta) * timePerIcon);

    reelRefs.current[offset].style.transition = `background-position-y ${deltaTime}ms cubic-bezier(.41,-0.01,.63,1.09)`;
    const backgroundPositionY = parseFloat(getComputedStyle(reelRefs.current[offset])['background-position-y']);
    reelRefs.current[offset].style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
    await new Promise((resolve) => setTimeout(resolve, deltaTime + offset * 150));

    reelRefs.current[offset].style.transition = 'none';
    reelRefs.current[offset].style.backgroundPositionY = `${(backgroundPositionY + delta * iconHeight) % (numIcons * iconHeight)}px`;

    return delta % numIcons;
  };

  const rollAll = async () => {
    setIsRolling(true);

    const reels = reelRefs.current;
    const gane = true;
    const deltas = await Promise.all(reels.map((reel, i) => roll(i, gane)));

    const isWin = deltas[0] === deltas[1] && deltas[1] === deltas[2] && deltas[0] === 1;
    setWinClass(isWin ? 'win' : '');

    setIsRolling(false);

    const reset = () => {
      setWinClass('');
    }
    setTimeout(reset, 2000);
  };


  useEffect(() => {
    const reels = document.querySelectorAll('.slots > .reel');
    reelRefs.current = Array.from(reels);
  }, []);

  return (
    <>
      <div className='container-machine'>
        <div className={`slots ${winClass}`}>
          <div ref={(el) => (reelRefs.current[0] = el)} className="reel"></div>
          <div ref={(el) => (reelRefs.current[1] = el)} className="reel"></div>
          <div ref={(el) => (reelRefs.current[2] = el)} className="reel"></div>
        </div >
      </div>
    </>
  );
};


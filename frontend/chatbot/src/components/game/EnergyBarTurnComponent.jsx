import React from 'react';

// Base path for SVG assets
const energyBarBasePath = '/src/assets/energy_bar/';

const EnergyBarTurnComponent = ({ turn }) => {
    const maxTurn = 10; // 10 max turns
    const turnToDisplay = turn > maxTurn ? maxTurn : turn < 0 ? 0 : turn; // valid turns now start at 0

    // Construct image path based on the current turn
    const energyBarImagePath = `${energyBarBasePath}energybar_turn_${turnToDisplay}.svg`;

    return (
        <div className="energy-bar">
            <img
                src={energyBarImagePath}
                alt={`Energy bar for turn ${turnToDisplay}`}
                className="energy-bar-image"
            />
        </div>
    );
};

export default EnergyBarTurnComponent;
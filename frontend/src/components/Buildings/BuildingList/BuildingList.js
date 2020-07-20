import React from 'react';

import BuildingItem  from './BuildingItem/BuildingItem';

const buildingList = props => {
    const buildings = props.buildings.map(building => {
        return (
            <BuildingItem 
                key={building._id} 
                buildingId={building._id} 
                address={building.address} 
                city={building.city}
                province={building.province}
            />
        );
    });
    return (
    <ul className="building__list">
        {buildings}
    </ul>
    );
};

export default buildingList;
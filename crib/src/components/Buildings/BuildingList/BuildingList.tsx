import React from 'react';
import BuildingItem from './BuildingItem/BuildingItem'
import { Building } from '../../../models';

type BuildingListProps = {
    buildings: Array<Building>
}

const BuildingList = ({ buildings }: BuildingListProps) => {
    const buildingItems = buildings.map(building => {
        return (
            <BuildingItem
                key={building._id}
                buildingId={building._id}
                address={building.address}
                city={building.city}
                province={building.province}
            />
        )
    });
    return (
        <React.Fragment>
            {buildingItems}
        </React.Fragment>
    );
};

export default BuildingList;
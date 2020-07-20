import React from 'react';

const unit = props => (
        <div className="unit-data">
            <h3>Current Address</h3>
            <div>{props.unit.unitNumber}-{props.unit.building.address}</div>
            <div>{props.unit.building.city}, {props.unit.building.province}</div>
        </div>
);

export default unit;
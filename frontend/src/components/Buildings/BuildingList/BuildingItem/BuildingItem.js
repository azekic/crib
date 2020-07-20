import React from 'react';

const buildingItem = props => (
    <li key={props.buildingId} className="list-item">
        <div className="building__item-data">
            <div>{props.address}, {props.city}, {props.province}</div>
        </div>
        <div className="building__item-actions">
            <button className="btn">Select</button>
        </div>

    </li>
);

export default buildingItem;
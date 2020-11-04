import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../../../context/auth-context';
import { useMutation } from '@apollo/client';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { SET_BUILDING } from '../../../../graphql/mutations';
type BuildingProps = {
    buildingId: string,
    address: string,
    city: string,
    province: string
}

const BuildingItem = ({ buildingId, address, city, province }: BuildingProps) => {
    const buildingAddress = address + " " + city + ", " + province;
    const context = useContext(AuthContext);
    const [itemColor, setItemColor] = useState(localStorage.getItem("building")  == address ? "primary" : undefined);
    const [setBuilding, {data, loading}] = useMutation(SET_BUILDING);
    useEffect(() => {

    if (data && data.setBuilding.building) {
        localStorage.setItem("building", address);
        setItemColor("primary");
    }
});

    return (
        <React.Fragment>
            <IonItem color={itemColor}
                button
                onClick={() => {
                    setBuilding({
                        variables: {
                            buildingId: buildingId
                        },
                        context: {
                          headers: {
                            Authorization: 'Bearer ' + context.token
                          }
                        }
                      });
                 }}
            >
                <IonLabel>
                {buildingAddress}
                    </IonLabel>
            </IonItem>
        </React.Fragment>
    );
};

export default BuildingItem;
import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonSearchbar, IonToolbar, IonHeader, IonTitle } from '@ionic/react';
import { GET_BUILDINGS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner/Spinner';
import BuildingList from '../components/Buildings/BuildingList/BuildingList';

const ChangeBuilding = () => {
    const [searchText, setSearchText] = useState('');
    const [currentBuilding, setCurrentBuilding] = useState("15 Jacksway Cres");
    const itemsList = useRef<HTMLIonListElement>();
    const { loading, error, data } = useQuery(GET_BUILDINGS);
    if (error) {
        throw new Error(error.message);
      }

    return (
        <IonPage>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <IonList ref={itemsList as any}>
                                <IonSearchbar
                                    value={searchText}
                                    onIonChange={e => {
                                        const text = e.detail.value!;
                                        setSearchText(text);
                                        const items = itemsList.current?.children;
                                        if (items) {
                                            Array.from(items).forEach(item => {
                                                if (item.textContent) {
                                                    const shouldShow = item.textContent.toLowerCase().indexOf(text.toLowerCase()) > -1;
                                                    const displayAttribute = shouldShow ? "block" : "none";
                                                    item.setAttribute("style", "display:" + displayAttribute);
                                                }
                                            })
                                        }
                                    }
                                    }
                                    placeholder="Select a building"
                                    autocomplete="street-address"
                                >
                                </IonSearchbar>
                                {loading ?
                                    <Spinner /> :
                                    <BuildingList buildings={data.buildings} />
                                }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ChangeBuilding;
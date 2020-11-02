import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonSearchbar, IonToolbar, IonHeader, IonTitle } from '@ionic/react';


const ChangeBuilding = () => {
    const [searchText, setSearchText] = useState('');
    const [currentBuilding, setCurrentBuilding] = useState("15 Jacksway Cres");
    const itemsList = useRef<HTMLIonListElement>();


    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Change Building</IonTitle>
                    <IonLabel>

                    </IonLabel>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle size="small">
                        {currentBuilding}
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
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
                        placeholder="Buildings"
                        autocomplete="street-address"
                    >
                    </IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid fixed className="ion-no-padding">
                    <IonRow>
                        <IonCol>
                            <IonList ref={itemsList as any}>
                                <IonItem
                                    button
                                    onClick={(e) => setCurrentBuilding(e.currentTarget.textContent!)}
                                >123 Sesame Street
                                </IonItem>
                                <IonItem
                                    button
                                    onClick={(e) => setCurrentBuilding(e.currentTarget.textContent!)}
                                >15 Jacksway Cres
                                </IonItem>
                                <IonItem
                                    button
                                    onClick={(e) => setCurrentBuilding(e.currentTarget.textContent!)}
                                >
                                    321 Test Street

                                </IonItem>
                                <IonItem>

                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ChangeBuilding;
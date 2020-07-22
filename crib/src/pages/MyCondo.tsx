import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const MyCondo: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Condo</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default MyCondo;

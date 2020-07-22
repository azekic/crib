import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Messages: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messages</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Messages;

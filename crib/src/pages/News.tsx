import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const News: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">News</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default News;

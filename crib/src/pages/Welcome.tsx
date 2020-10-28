import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton, isPlatform, IonCardHeader, IonList, IonCard, IonCardTitle, IonCardContent, IonModal } from '@ionic/react';
import './Welcome.css';
import Auth from './Auth';

const Welcome: React.FC = () => {
  const contentStyle = isPlatform("desktop") ? "desktop-content" : "mobile-content";

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <IonPage>
      <IonModal
        isOpen={showLoginModal}
        onDidDismiss={() => setShowLoginModal(false)}
      >
        <Auth title='Login' setShowModal={setShowLoginModal}/>
      </IonModal>
      <IonModal
        isOpen={showRegisterModal}
        onDidDismiss={() => setShowRegisterModal(false)}
      >
        <Auth title='Register' setShowModal={setShowRegisterModal}/>
      </IonModal>
          <IonContent fullscreen className={contentStyle}>
          <IonGrid fixed>
          <IonRow>
            <IonCol>
            <div className='content'>
          <div className='landing-content'>
          <h1 className='landing-header'>Connect with your condo</h1>
          <p className='landing-text'><b>Crib</b> is a social network and building management tool that connects you with your neighbours and property managers.</p>

              <IonButton onClick={() => setShowRegisterModal(true)} size='large'>Get Started</IonButton>
              <IonButton onClick={() => setShowLoginModal(true)} size='large' color='medium'>Login</IonButton>

          </div>
          <div className='landing-img'>
          <img src="./img/slide-2.png" alt="slide 2"/>
          </div>
          </div>
          
          <IonList className='card-list'>
            <IonCard>
              <img src="./img/slide-1.png" alt="slide 1"/>
              <IonCardHeader>
                <IonCardTitle>Share photos and posts</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
            Start a discussion, share your concerns, and ask questions with your fellow neighbours using the posts and comments feature.
            Keep up with the local conversation!
      </IonCardContent>
            </IonCard>
            <IonCard>
              <img src="./img/slide-3.png" alt="slide 3"/>
              <IonCardHeader>
                <IonCardTitle>Ping neighbours privately</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
            Send a private notification to a nearby neighbour if they are being too loud.
      </IonCardContent>
            </IonCard>
            <IonCard>
              <img src="./img/slide-4.png" alt="slide 4"/>
              <IonCardHeader>
                <IonCardTitle>Send repair requests</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
            Let your property manager know when your condo or a shared facility needs repairs done.
      </IonCardContent>
            </IonCard>
          </IonList>
          </IonCol>
            </IonRow>
          </IonGrid>
    </IonContent>
    </IonPage>
  );
};

export default Welcome;

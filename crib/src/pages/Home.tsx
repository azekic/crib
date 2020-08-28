import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonButtons, IonModal } from '@ionic/react';
import { create, camera, close, videocam, documentAttach } from 'ionicons/icons';
import PostList from '../components/Posts/PostList/PostList';
import PostCreator from '../components/Posts/PostCreator';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import AuthContext from '../context/auth-context';

const Home: React.FC = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const { photos, takePhoto } = usePhotoGallery();
  const context = useContext(AuthContext);

  const cameraHandler = () => {
    takePhoto()
    setShowCreatePostModal(true);
  }
  
  return (
    <IonPage>
      <IonModal
        isOpen={showCreatePostModal}
        onDidDismiss={() => setShowCreatePostModal(false)}
      >
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={() => setShowCreatePostModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Create a post</IonTitle>

          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <PostCreator
            name="Andre Zekic"
            unit="221"
            profilePicture="https://media-exp1.licdn.com/dms/image/C4E03AQEZDUl98iycDA/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=16_fkwR_k1JGW3Z21F99tIs9WO0f8fmK0Iei6ZAxh3k"
            onSubmitAction={setShowCreatePostModal}
            newPhotos={photos}
          />
        </IonContent>
      </IonModal>
      <IonContent>
        <IonGrid fixed className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonCard>
                <IonButton onClick={() => setShowCreatePostModal(true)} className="ion-float-left" color="medium" fill="clear" expand="full">
                  <IonIcon slot="start" icon={create} />
                  <div>Create a post</div>
                </IonButton>
                <IonButton className="ion-float-right" fill="clear" color="medium" onClick={() => console.log("documentAttach clicked")}>
                  <IonIcon slot="icon-only" icon={documentAttach} />
                </IonButton>
                <IonButton className="ion-float-right" fill="clear" color="medium" onClick={() => console.log("videocam clicked")}>
                  <IonIcon slot="icon-only" icon={videocam} />
                </IonButton>
                <IonButton className="ion-float-right" fill="clear" color="medium" onClick={() => cameraHandler()}>
                  <IonIcon slot="icon-only" icon={camera} />
                </IonButton>
              </IonCard>
              <PostList />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

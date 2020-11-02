import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonButtons, IonModal, isPlatform } from '@ionic/react';
import { create, camera, close, videocam, documentAttach } from 'ionicons/icons';
import PostList from '../components/Posts/PostList/PostList';
import PostCreator from '../components/Posts/PostCreator';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import Spinner from '../components/Spinner/Spinner';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
      posts {
          _id
          body
          likes {
            _id
            user {
              _id
            }
          }
          createdAt
          author {
              _id
              email
              firstName
              lastName
              profilePicture
          }
          comments {
              _id
              text
              createdAt
              user {
                  _id
                  firstName
                  lastName
                  profilePicture
              }
          }
          images
      }
    }
  `

const Home: React.FC = () => {

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const { photos, takePhoto } = usePhotoGallery();

  const cameraHandler = () => {
    takePhoto()
    setShowCreatePostModal(true);
  }
  const contentStyle = isPlatform("desktop") ? undefined : "mobile-content";
  
  const {loading, error, data} = useQuery(GET_POSTS);

  if (error) {
    throw new Error(error.message);
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
            profilePicture={""}
            onSubmitAction={setShowCreatePostModal}
            newPhotos={photos}
          />
        </IonContent>
      </IonModal>
      <IonContent className={contentStyle}>
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
              {loading ?
                <Spinner /> : 
                <PostList posts={data.posts}/>
              }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

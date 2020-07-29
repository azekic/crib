import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonText, IonActionSheet, IonBadge, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonTextarea } from '@ionic/react';
import { thumbsUp, chatboxEllipses, ellipsisHorizontal, share, trash, close, bookmark, send } from 'ionicons/icons';
import UserAvatar from '../../../UserAvatar';

type PostProps = {
  name: string,
  unit: string,
  likes: number,
  comments: number,
  text: string,
  image?: string,
  profilePicture: string
}
const PostItem = ({ name, unit, likes, comments, text, image, profilePicture }: PostProps) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [likeButtonValues, setLikeButtonValues] = useState({
    color: "medium",
    text: "Like",
    likeCount: likes
  });

  // eslint-disable-next-line
  const [commentText, setCommentText] = useState<string>();

  const toggleLikeHandler = () => {
    likeButtonValues.text === "Like" ?
      setLikeButtonValues({
        color: "primary",
        text: "Liked",
        likeCount: likes + 1
      }) :
      setLikeButtonValues({
        color: "medium",
        text: "Like",
        likeCount: likes
      });
  };

  return (
    <React.Fragment>
      <IonModal 
        isOpen={showCommentsModal}
        onDidDismiss={() => setShowCommentsModal(false)}
      >
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={() => setShowCommentsModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Add a comment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonItem>
                <IonTextarea
                    className="post-text-box"
                    required
                    autofocus
                    minlength={0}
                    maxlength={2500}
                    rows={6}
                    onIonChange={e => setCommentText(e.detail.value!)}
                >
                </IonTextarea>
            </IonItem>
            <IonButton
                className="ion-float-right"
                fill="clear"
                onClick={() => setShowCommentsModal(false)}
            >
              <IonIcon slot="icon-only" icon={send} />
            </IonButton>
        </IonContent>
      </IonModal>
      <IonCard>
        <IonCardHeader className="ion-no-padding">
          <IonButton
            onClick={() => setShowActionSheet(true)}
            className="ion-float-right ion-margin"
            color="medium"
            fill="clear"
            expand="full"
            shape="round"
            size="small"
          >
            <IonIcon icon={ellipsisHorizontal} />
          </IonButton>
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            buttons={[{
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                console.log('Delete clicked');
              }
            }, {
              text: 'Share',
              icon: share,
              handler: () => {
                console.log('Share clicked');
              }
            }, {
              text: 'Save',
              icon: bookmark,
              handler: () => {
                console.log('Save clicked');
              }
            }, {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }]}
          >
          </IonActionSheet>
          <IonItem lines="none">
            <UserAvatar profilePicture={profilePicture} unit={unit} name={name} />
          </IonItem>
        </IonCardHeader>
        {image && <img width="100%" src={image} alt="Post" />}
        <IonCardContent>
          <IonText color="dark">
            {text}
          </IonText>
          <p className="ion-float-end">...see more</p>
        </IonCardContent>
        <IonItem lines="none">
          <IonBadge color="light" class="ion-margin-end">{likeButtonValues.likeCount} Likes</IonBadge>
          <IonBadge color="light">{comments} Comments</IonBadge>
        </IonItem>
        <IonItem>
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol>
                <IonButton
                  className="ion-float-left"
                  color={likeButtonValues.color}
                  fill="clear"
                  expand="full"
                  onClick={() => {
                    toggleLikeHandler();
                  }}
                >
                  <IonIcon slot="start" icon={thumbsUp} />
                  <div>{likeButtonValues.text}</div>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  className="ion-float-right"
                  color="medium"
                  fill="clear"
                  expand="full"
                  onClick={() => {
                    setShowCommentsModal(true);
                  }}
                >
                  <IonIcon slot="start" icon={chatboxEllipses} />
                  <div>Comment</div>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonCard>
    </React.Fragment>
  );
};

export default PostItem;
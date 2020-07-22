import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonText, IonActionSheet, IonBadge } from '@ionic/react';
import { thumbsUp, chatboxEllipses, ellipsisHorizontal, share, trash, close, bookmark } from 'ionicons/icons';
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

  return (
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
        <IonBadge color="light" class="ion-margin-end">{likes} Likes</IonBadge>
        <IonBadge color="light">{comments} Comments</IonBadge>
      </IonItem>
      <IonItem>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonButton
                className="ion-float-left"
                color="medium"
                fill="clear"
                expand="full"
                onClick={ () => {
                  console.log('like clicked');
                }}
              >
                <IonIcon slot="start" icon={thumbsUp} />
                <div>Like</div>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="ion-float-right"
                color="medium"
                fill="clear"
                expand="full"
                onClick={ () => {
                  console.log('comment clicked');
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
  );
};

export default PostItem;
import React, { useContext, useState } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonText, IonActionSheet, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonTextarea, IonList, IonAvatar, IonCardSubtitle } from '@ionic/react';
import { thumbsUp, chatboxEllipses, ellipsisHorizontal, share, trash, close, bookmark, send, arrowBack, toggle } from 'ionicons/icons';
import UserAvatar from '../../../UserAvatar';
import AuthContext from '../../../../context/auth-context';
import Truncate from 'react-truncate';
import './PostItem.css';
import { gql, useMutation } from '@apollo/client';
import {Like, Comment} from '../../../../models';
import CommentCreator from '../../../Comments/CommentCreator';
import CommentList from '../../../Comments/CommentList';

type PostProps = {
  postId: string,
  name: string,
  unit: string,
  likes: Like[],
  comments: Comment[],
  text: string,
  images?: string[],
  profilePicture: string
}
const DELETE_POST = gql`
  mutation DeletePost($postId: ID!){
    deletePost(postId: $postId) {
      _id
    }
  }
`

const LIKE_POST = gql`
  mutation LikePost($postId: ID!){
    likePost(postId: $postId) {
      _id
      user {
        _id
      }
    }
  }
`
const UNLIKE_POST = gql`
  mutation UnLikePost($likeId: ID!){
    unLikePost(likeId: $likeId) {
      _id
      likes {
        _id
        user {
          _id
        }
      }
    }
  }
`
const PostItem = ({ postId, name, unit, likes, comments, text, images, profilePicture }: PostProps) => {
  const context = useContext(AuthContext);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const getUserLike = (likes: Like[]) => {
    return likes.find(l => l.user._id === context.userId);
  };
  const [likeButtonValues, setLikeButtonValues] =
  useState((getUserLike(likes) === undefined) ? {
      color: "medium",
      text: "Like",
      likeCount: likes.length
    } : {
      color: "primary",
      text: "Liked",
      likeCount: likes.length
    });

  const [truncated, handleTruncate] = useState(true);
  // eslint-disable-next-line
  const [likePost, {loading, data: likeData}] = useMutation(LIKE_POST);
  const [unLikePost] = useMutation(UNLIKE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const toggleLikeHandler = (postId: String) => {
    let userLike = getUserLike(likes);
    if (userLike === undefined) {
      likePost({
        variables: {
          postId: postId
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + context.token
          }
        }
      });
      setLikeButtonValues({color: "primary", text: "Liked", likeCount: likeButtonValues.likeCount + 1});
    } else {
      unLikePost({
        variables: {
          likeId: userLike._id
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + context.token
          }
        }
      });
      setLikeButtonValues({color: "medium", text: "Like", likeCount: likeButtonValues.likeCount - 1});
    }
  };
  var noLikes = likeButtonValues.likeCount == 0;
  var noComments = comments.length === 0;
  var commentsName = comments.length > 1 ? " Comments" : " Comment";
  const firstReactText = "Be the first to react to this";

  return (
    <React.Fragment>

      <IonModal
        isOpen={showCommentsModal}
        onDidDismiss={() => setShowCommentsModal(false)}
      >
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowCommentsModal(false)}>
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
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
            </IonButtons>
          </IonToolbar>
          <IonItem lines="none">
            <UserAvatar profilePicture={profilePicture} unit={unit} name={name} />
          </IonItem>
        </IonHeader>
        <IonContent fullscreen>
          <IonItem lines="none">
            <IonText color="dark" className="ion-padding-top">
              {text}
            </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonButton disabled color="dark" fill="clear" class="ion-margin-end">
              <IonIcon slot="start" icon={thumbsUp} />
              {likeButtonValues.likeCount}
            </IonButton>
            <IonButton
              disabled
              color="dark"
              fill="clear"
            >
              {comments.length} Comments
          </IonButton>
          </IonItem>
          <CommentList comments={comments}/>
          <CommentCreator postId={postId}/>
        </IonContent>
      </IonModal>
      <IonModal
        isOpen={addCommentModal}
        onDidDismiss={() => setAddCommentModal(false)}
      >
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={() => setAddCommentModal(false)}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Add a comment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <CommentCreator postId={postId}/>
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
                deletePost({
                  variables: {
                    postId: postId
                  },
                  context: {
                    headers: {
                      Authorization: 'Bearer ' + context.token
                    }
                  }
                });
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
        {images && images.length > 0 && <img width="100%" src={images[0]} alt="Post" />}
        <IonCardContent>
          <IonText color="dark">
          {/* { <Truncate lines={truncated && 4} ellipsis={
              <span> 
                <button 
                  onClick={() => handleTruncate(false)} 
                  className='show-more-link'>...show more
                </button>
              </span>
            }>
              {text}
            </Truncate> } */}
            {text}

          </IonText>
        </IonCardContent>
        <IonItem lines="none">
        { likeButtonValues.likeCount != 0 &&
          <IonButton disabled color="dark" fill="clear" class="ion-margin-end">
            <IonIcon slot="start" icon={thumbsUp} />
            {likeButtonValues.likeCount}
          </IonButton>
        }
        { !noComments &&
          <IonButton
            color="medium"
            fill="clear"
            onClick={() => {
              setShowCommentsModal(true);
            }}
          >
            {comments.length + commentsName}
          </IonButton>
        }
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
                    toggleLikeHandler(postId);
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
                    setAddCommentModal(true);
                  }}
                >
                  <IonIcon slot="start" icon={chatboxEllipses} />
                  <div>Comment</div>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
        {
        }
        { noLikes && noComments &&
          <IonItem>
            <IonCardSubtitle>
            {firstReactText}
            </IonCardSubtitle>
        </IonItem>
        }
      </IonCard>
    </React.Fragment>
  );
};

export default PostItem;
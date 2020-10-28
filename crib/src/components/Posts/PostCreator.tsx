import React, { useContext, useEffect, useState } from 'react';
import { IonItem, IonTextarea, IonButton, IonIcon, IonImg } from '@ionic/react';
import { camera, videocam, documentAttach, send } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '../../hooks/usePhotoGallery';
import AuthContext from '../../context/auth-context';
import UserAvatar from '../UserAvatar';
import './PostCreator.css';
import { ApolloQueryResult, gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
    mutation CreatePost($body: String!, $imgUrls: [String]){
        createPost(postInput: {body: $body, images: $imgUrls}) {
            _id
            body
            likes
            createdAt
            images
        }
    }
`;

type ContextProps = {
    token: string | null,
    userId: string | null,
    login: (token: string, userId: string) => void,
    logout: () => void
};
interface Comment {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    text: string
}
interface User {
    _id: string,
    firstName?: string,
    lastName?: string,
    profilePicture?: string
}
  interface Post {
    _id: string;
    body: string,
    images: string[],
    likes: string,
    createdAt: Date,
    author: User,
    comments: Comment[]
}

type PostProps = {
    name: string
    unit: string
    profilePicture: string
    onSubmitAction: React.Dispatch<React.SetStateAction<boolean>>
    newPhotos: Photo[]
    refetch: (variables?: Partial<Record<string, any>> | undefined) => Promise<ApolloQueryResult<any>>
}

function handleCreatePost(
    context: ContextProps, 
    body: string, 
    mergedPhotos: Photo[], 
    createPost: any
    )
    {
    if (body.trim().length === 0){
        console.log("body empty");
      return;
  }
  if (mergedPhotos.length !== 0) {
    const formData = new FormData();
    
    mergedPhotos.forEach((photo) => {
      formData.append("file", photo.blob);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY ?? "");
      formData.append("api_secret", process.env.REACT_APP_CLOUDINARY_API_SECRET ?? "");
      formData.append("upload_preset", "crib_upload");
      }
    )
     fetch('https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/upload', {
         method: "POST",
         body: formData
     }).then(res => {
          if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
          }
          return res.json();
      })
     .then((resData) => {
        var imgUrls : String[] = [resData.url];
         console.log(imgUrls);
         console.log(resData.url);
         createPost({
            variables: { 
                body: body, 
                imgUrls: imgUrls
             },
             context: {
                 headers: {
                     Authorization: 'Bearer ' + context.token
                 }
             }
         });
     });
     
  } else {
    createPost({
        variables: { 
            body: body, 
         },
         context: {
             headers: {
                 Authorization: 'Bearer ' + context.token
             }
         }
     });
  }

}

const PostCreator = ({ name, unit, profilePicture, onSubmitAction, newPhotos, refetch}: PostProps) => {
    const [text, setText] = useState<string>();
    const { photos, takePhoto } = usePhotoGallery();
    const context = useContext(AuthContext);
    const mergedPhotos = photos.concat(newPhotos);
    const [createPost] = useMutation(CREATE_POST, {
        update(cache, { data: { createPost } }) {
            cache.modify({
                fields: {
                    posts(existingPosts = []){
                        const newPostRef = cache.writeFragment({
                            data: createPost,
                            fragment: gql`
                                fragment CreatePost on Post{
                                    _id
                                    body
                                    likes
                                    createdAt
                                    images
                                }
                            `
                        });
                        return [...existingPosts, newPostRef];
                    }
                }
            })
        }
    });
    
    
    return (
        <React.Fragment>
            <IonItem lines="none">
                <UserAvatar
                    name={name}
                    unit={unit}
                    profilePicture={profilePicture}
                />
            </IonItem>
            <IonItem>
                <IonTextarea
                    className="post-text-box"
                    required
                    minlength={0}
                    maxlength={2500}
                    rows={6}
                    value={text}
                    placeholder="What do you want to write about?"
                    onIonChange={e => setText(e.detail.value!)}
                >
                </IonTextarea>
            </IonItem>
            <IonButton
                className="ion-float-left"
                fill="clear"
                color="medium"
                onClick={takePhoto}
            >
                <IonIcon slot="icon-only" icon={camera} />
            </IonButton>
            <IonButton
                className="ion-float-left"
                fill="clear"
                color="medium"
                onClick={() => console.log("videocam clicked")}
            >
                <IonIcon slot="icon-only" icon={videocam} />
            </IonButton>
            <IonButton
                className="ion-float-left" fill="clear"
                color="medium"
                onClick={() => console.log("documentAttach clicked")}
            >
                <IonIcon slot="icon-only" icon={documentAttach} />
            </IonButton>
            <IonButton
                className="ion-float-right"
                fill="clear"
                onClick={() => {
                    console.log("saving post");
                    handleCreatePost(context, text ?? "", mergedPhotos, createPost);
                    onSubmitAction(false)
                }
                }
            >
                <IonIcon slot="icon-only" icon={send} />
            </IonButton>

                    {mergedPhotos.map((photo, index) => (
                            <IonImg src={photo.webviewPath} key={index}/>
                    ))}
        </React.Fragment>
    );
};

export default PostCreator;
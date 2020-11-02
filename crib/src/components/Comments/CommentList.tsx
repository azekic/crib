import React from "react";
import {Comment} from '../../models';
import CommentItem from './CommentItem';
import { IonList, IonItem, IonAvatar, IonCard, IonCardContent } from "@ionic/react";

type CommentListProps = {
    comments: Array<Comment>
}

const CommentList = ({comments}: CommentListProps) => {
    const commentItems = comments.map(comment => {
        return (
            <CommentItem user={comment.user} text={comment.text}/>
        )
    });
    return (
        <IonList>
            {commentItems}
        </IonList>
    )
};

export default CommentList;
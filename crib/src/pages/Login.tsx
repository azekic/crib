import React, { useState, useContext } from 'react';
import { IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonCardHeader } from '@ionic/react';
import AuthContext from '../context/auth-context';


const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const { login } = useContext(AuthContext);
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email?.trim().length === 0 || password?.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) {
                login(
                    resData.data.login.token, 
                    resData.data.login.userId, 
                    );

            }
        })
        .catch(err => {
            console.log(err);
        });
        console.log("Context" + login);
    }
    const disableSubmit = () => {
        if (email && password) {
            return false;
        }
        return true;
    }
    return (

        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Login
            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <form onSubmit={submitHandler}>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput
                                value={email}
                                onIonChange={e => setEmail(e.detail.value!)}
                                type="email"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                value={password}
                                onIonChange={e => setPassword(e.detail.value!)}
                                type="password"

                            />
                        </IonItem>
                        <IonButton
                            fill="clear"
                            size="small"
                            color="medium"
                        >
                            Forgot password?
                    </IonButton>
                        <IonButton
                            disabled={disableSubmit()}
                            type="submit"
                            expand="block"
                            className="ion-margin-top"
                        >
                            <IonLabel>Login</IonLabel>
                        </IonButton>
                    </IonList>
                </form>
                <IonButton
                    routerLink="/auth/register"
                    fill="clear"
                    size="small"
                    color="medium"
                >
                    Create an account
            </IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default Login;

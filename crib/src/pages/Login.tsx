import React, { useState, useContext } from 'react';
import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonCardHeader, IonPage, IonContent, IonGrid, IonRow, IonCol, isPlatform, IonHeader } from '@ionic/react';
import AuthContext from '../context/auth-context';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type LoginProps = {
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

let initialValues = {
    email: "",
    password: ""
  };

const Login = ({setTitle}: LoginProps) => {
    const { handleSubmit, control, errors } = useForm();

    const onSubmit = (data: any) => {
        debugger;
        alert(JSON.stringify(data, null, 2));
      };

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const { login } = useContext(AuthContext);
    const submitHandler = (data: { [x: string]: any; }) => {
        if (data.email?.trim().length === 0 || data.password?.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
                query {
                    login(email: "${data.email}", password: "${data.password}") {
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
    
    return (
        
        <div className="ion-padding">
                <form onSubmit={handleSubmit(data => submitHandler(data))}>
                    <IonList>
                    <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} />
                )}
                control={control}
                name="email"
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }
                }}
                type="email"
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="email"
              as={<div style={{ color: "red" }} />}
            />
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <IonInput onIonChange={onChange} type="password"
                  />
                )}
                control={control}
                name="password"
                rules={{
                  required: "This is a required field",
                  minLength: {
                    value: 5,
                    message: "min length is 5"
                  }
                }}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="password"
              as={<div style={{ color: "red" }} />}
            />
                        <IonButton
                            fill="clear"
                            size="small"
                            color="medium"
                        >
                            Forgot password?
                    </IonButton>
                        <IonButton
                            type="submit"
                            expand="block"
                            className="ion-margin-top"
                        >
                            <IonLabel>Login</IonLabel>
                        </IonButton>
                    </IonList>
                </form>
                <IonButton
                    onClick={() => setTitle('Register')
                    }
                    fill="clear"
                    size="small"
                    color="medium"
                >
                    Create an account
            </IonButton>
            </div>
    );
};

export default Login;

import React, { useContext, useEffect } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/react';
import AuthContext from '../context/auth-context';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../graphql/queries';

type LoginProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>

}

const Login = ({ setTitle }: LoginProps) => {
  const { handleSubmit, control, errors } = useForm();
  const { login } = useContext(AuthContext);

  const [loginUser, { data }] = useLazyQuery(LOGIN_USER);
  
  useEffect(() => {
    if (data && data.login) {
      login(
        data.login.token,
        data.login.userId,
      );
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login.userId);
    }
  });


  const submitHandler = (input: { [x: string]: any; }) => {
    if (input.email?.trim().length === 0 || input.password?.trim().length === 0) {
      return;
    }
    loginUser({
      variables: {
        email: input.email,
        password: input.password
      }
    });
  }

  return (

    <div className="ion-padding">
      <form onSubmit={handleSubmit(input => submitHandler(input))}>
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
                required: "Enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              }}
              type="email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as={<IonText color="danger" />}
            />
          </IonItem>
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
                required: "Enter your password",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters"
                }
              }}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              as={<IonText color="danger" />}
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

import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonText,
  IonContent,
  IonSearchbar,
  IonModal
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatbubblesOutline, personOutline, homeOutline, newspaperOutline, albumsOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Account from './pages/Account';
import Messages from './pages/Messages';
import './App.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import News from './pages/News';
import MyCondo from './pages/MyCondo';
import EditUser from './pages/EditUser';
import ChangeBuilding from './pages/ChangeBuilding';

import AuthContext from './context/auth-context';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Auth from './pages/Auth';

const App = () => {

  const [authState, setAuthState] =
    useState<{
      token: null | string,
      userId: null | string
    }>({
      token: null,
      userId: null
    });

  const login = (token: string, userId: string) => {
    setAuthState({ token: token, userId: userId })
  }

  const logout = () => {
    setAuthState({ token: null, userId: null })
  }

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  const [tabsState] =
    useState<{
      tabsPlacement: "top" | "bottom" | undefined
      tabsLayout: "icon-top" | "icon-start" | "icon-end" | "icon-bottom" | "icon-hide" | "label-hide" | undefined
      tabsStyle: string | undefined
    }>(isPlatform("desktop") ? {
      tabsPlacement: "top", tabsLayout: "icon-start", tabsStyle: "tab-desktop"
    } : {
        tabsPlacement: "bottom", tabsLayout: undefined, tabsStyle: undefined
      }
    );

  return (
    <IonApp>
      
      <AuthContext.Provider
        value={{
          token: authState.token,
          userId: authState.userId,
          login: login,
          logout: logout
        }}
      >
        <IonModal
        isOpen={showLoginModal}
        onDidDismiss={() => setShowLoginModal(false)}
      >
        <Auth title='Login' setShowModal={setShowLoginModal}/>
      </IonModal>
      <IonModal
        isOpen={showRegisterModal}
        onDidDismiss={() => setShowRegisterModal(false)}
      >
        <Auth title='Register' setShowModal={setShowRegisterModal}/>
      </IonModal>
        <IonHeader>
          <IonToolbar>
          <IonTitle className="crib-logo"><IonText color="primary"><b>crib</b></IonText></IonTitle>

              <IonButtons slot="primary">
              {authState.token ?

                <IonButton routerLink="/messages">
                  <IonIcon slot="icon-only" icon={chatbubblesOutline} />
                  
                </IonButton>
            : 
            <React.Fragment>
              <IonButton onClick={() => setShowLoginModal(true)} color='medium'>Login</IonButton>
            <IonButton className="ion-hide-sm-down" onClick={() => setShowRegisterModal(true)} color='primary'>Sign Up</IonButton>
              </React.Fragment>
              }
              </IonButtons>

          </IonToolbar>
        </IonHeader>
        {authState.token == null ?
          <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/welcome" component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect from="/" to="/welcome" />
              </IonRouterOutlet>
          </IonReactRouter> :
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/home" component={Home} exact={true} />
                <Redirect from="/welcome" to="/home" />
                <Route path="/news" component={News} exact={true} />
                <Route path="/mycondo" component={MyCondo} exact={true} />
                <Route path="/account" component={Account} exact={true} />
                <Route path="/messages" component={Messages} exact={true} />
                <Route path="/account/edit" component={EditUser} exact={true} />
                <Route path="/account/edit/building" component={ChangeBuilding} exact={true} />
              </IonRouterOutlet>

              <IonTabBar slot={tabsState.tabsPlacement} className={tabsState.tabsStyle}>
                <IonTabButton tab="home" href="/home" layout={tabsState.tabsLayout}>
                  <IonIcon icon={albumsOutline} />
                  <IonLabel>Posts</IonLabel>
                </IonTabButton>
                <IonTabButton tab="news" href="/news" layout={tabsState.tabsLayout}>
                  <IonIcon icon={newspaperOutline} />
                  <IonLabel>News</IonLabel>
                </IonTabButton>
                <IonTabButton tab="messages" href="/mycondo" layout={tabsState.tabsLayout}>
                  <IonIcon icon={homeOutline} />
                  <IonLabel>My Condo</IonLabel>
                </IonTabButton>
                <IonTabButton tab="account" href="/account" layout={tabsState.tabsLayout}>
                  <IonIcon icon={personOutline} />
                  <IonLabel>Account</IonLabel>
                </IonTabButton>
              </IonTabBar>

            </IonTabs>
          </IonReactRouter>
        }
      </AuthContext.Provider>
    </IonApp>
  )
};

export default App;

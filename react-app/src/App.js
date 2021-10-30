import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/user/User';
import UserPhotos from './components/user/userPhotos';
import Splash from './components/splash';
import Business from './components/business';
import PhotoUpload from './components/images/photoUpload';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <Route path='/users/:userId' exact={true} >
          <User profile = "other"/>
        </Route>
        <ProtectedRoute path='/user' exact={true} >
          <User profile = "self"/>
        </ProtectedRoute>
        <ProtectedRoute path='/user_photos' exact={true} >
          <UserPhotos profile = "self"/>
        </ProtectedRoute>
        <Route path='/user_photos/:userId' exact={true} >
          <UserPhotos profile = "other"/>
        </Route>
        <Route path='/business/:businessId' exact={true} >
          <Business />
        </Route>
        <ProtectedRoute path='/user/photos/add' exact={true} >
          <PhotoUpload photoType = "user"/>
        </ProtectedRoute>
        <Route path='/business_photos/:businessId/add' exact={true} >
          <PhotoUpload photoType = "business"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

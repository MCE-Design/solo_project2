import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
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
        <Route path='/business/:businessId'>
          <Business />
        </Route>
        <Route path='/user_photos'>
          <PhotoUpload photoType = "user"/>
        </Route>
        <Route path='/business_photos/:businessId'>
          <PhotoUpload photoType = "business"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

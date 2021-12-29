import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/user/User';
import UserEdit from './components/userEdit';
import PhotoDisplay from './components/images/photoDisplay';
import Splash from './components/splash';
import Business from './components/business';
import PhotoUpload from './components/images/photoUpload';
import StandAloneReview from './components/reviews/standAloneReview';
import { authenticate } from './store/session';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNlLWRlc2lnbiIsImEiOiJja3g4NmF5eXoxNnN5MnZxdXlpaWcxM3l3In0.A_7OTI9bVe-586aBwNWRSA';

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
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        {/* These two use the same componenant with differen values passed in depending on the route*/}
        <Route path='/users/:userId' exact={true} >
          <User profile = "other"/>
        </Route>
        <ProtectedRoute path='/user' exact={true} >
          <User profile = "self"/>
        </ProtectedRoute>
        <ProtectedRoute path='/user/details'>
          <UserEdit />
        </ProtectedRoute>


        {/* These two use the same componenant with differen values passed in depending on the route*/}
        <ProtectedRoute path='/user_photos' exact={true} >
          <PhotoDisplay profile = "self"/>
        </ProtectedRoute>
        <Route path='/user_photos/:id' exact={true} >
          <PhotoDisplay profile = "other"/>
        </Route>


        <Route path='/business_photos/:id' exact={true} >
          <PhotoDisplay profile = "business"/>
        </Route>
        <Route path='/business/:businessId' exact={true} >
          <Business />
        </Route>

        {/* These two use the same componenant with differen values passed in depending on the route*/}
        {/* Change this to UNPROTECTED when logged-out and new-user workflow is built */}
        <ProtectedRoute path='/business/:businessId/newreview' exact={true} >
          <StandAloneReview reviewType="new"/>
        </ProtectedRoute>
        <ProtectedRoute path='/business/:businessId/editreview/:reviewId' exact={true} >
          <StandAloneReview reviewType="edit"/>
        </ProtectedRoute>

        {/* These two use the same componenant with differen values passed in depending on the route*/}
        <ProtectedRoute path='/user/photos/add' exact={true} >
          <PhotoUpload photoType = "user"/>
        </ProtectedRoute>
        {/* These two use the same componenant with differen values passed in depending on the route*/}
        <ProtectedRoute path='/business_photos/:id/add' exact={true} >
          <PhotoUpload photoType = "business"/>
        </ProtectedRoute>
        {/* <Route path="*">
            <FourOhFourPage />
        </Route> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

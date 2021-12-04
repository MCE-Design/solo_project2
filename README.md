# Yap

## Introduction

Yap is a Yelp clone built using React-Redux on the frontend and Flask on the backend.

Current the application can be viewed online at https://yap-reviews.herokuapp.com/

# Technologies

## Frontend Technologies

### React

Yap is a React application.  However, it most of the work has been done using Redux due to stronger structure and better page render management.  Prop theading is used to help move data between components when it's not entirely necessary to keep the information in state.

### Redux

While React is a powerful frontend framework the Redux and React-Redux libraries make it a better experience.  Data can be kept in state as a way to have rapid access to it, rerendering of the screen is more consistent, and using context is far easier.

## Backend Technologies

### Flask

Flask does some heavy lifting on the backend and makes forms and validations easy via Alembic and WTForms.

### AWS S3

I've made use of AWS S3 to facilitate image uploading on the site.  Honestly this was the only choice for uploading and hosting images 3rd party.

# Conclusion

This is an early version of the application and there's much to do in the future.  Here's a list of some of these features.

1. Inline Photo display of associated photos on each review as well as in user profiles
      Right now all photos for each business (either uploaded normally or via a review) can only be seen on the business photo page.

2. Search businesses by name
      At this moment you can browse all of the businesses via the popular area on the splash page.

3. Maps
      Honestly this feature can help searching for businesses in a particular area far easier and would be essential for the full application.  However, the Google Maps API provides too few free queries for an application that is actively developed and viewed at least a few hundred times and the Mapbox API would take longer for me to learn than I had time for.

4. Mobile-friendly styling
      Adding this feature would effectively allow more folks to easily view and try out the web application regardless of device.

5. Business creation
      Right now I've left out business creation to keep scope small enough to tackle.  However, in the futre this would definitely be a feature.

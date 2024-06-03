# Healthseed - an organization tool to manage your health

## Overview

Healthseed is a mobile application allowing users to keep track of their medications, conditions, providers, routines, and appointments. Watch a full video demo [here](https://www.youtube.com/watch?v=EQW91BKPom0).

I built [Healthseed's backend](https://github.com/khamerling-potts/healthseed-flask-backend) (deployed on [Heroku](heroku.com)) using Python, Flask-SQLAlchemy, and PostgreSQL on [Render](render.com). The client (this repo) was built with JavaScript, React Native, and Expo - designed specifically for iOS. Client side routing was made possible with [React Navigation](https://reactnavigation.org/). Front end styling was developed using [React Native Paper](https://reactnativepaper.com/) in addition to many other open-source libraries (such as dropdown picker, libphonenumber, and datetimepicker).

## Features (gifs may take a minute to load)

### Create an Account/Login

Users can either create an account or sign in with existing credentials. User accounts include a name, username, birthday, and password.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/login.GIF?raw=true' style='height: 600px'/>

### Home page

After signing in, users are brought to a home page that includes a calendar marked with appointments and an overview of their routines.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/home.GIF?raw=true' style='height: 600px'/>

### Providers

Users can keep track of provider information by adding, editing, and deleting providers.

#### Adding Providers

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/providers1.GIF?raw=true' style='height: 600px'/>

#### Editing a Provider

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/providers2.GIF?raw=true' style='height: 600px'/>

### Medications

The medications page provides a place for users to log any medications they are taking, including optional notes and dosages/instructions.

#### Adding Medications

Up to 3 initial instructions w/ time and dosage can be added during initial creation of a medication. More can be added from the newly created medication card displayed on the screen. Medication instructions can be assigned to a routine on the Routines page.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/medications1.GIF?raw=true' style='height: 600px'/>

#### Adding additional instructions and editing medications

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/medications2.GIF?raw=true' style='height: 600px'/>

#### Editing and deleting medications and instructions

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/medications3.GIF?raw=true' style='height: 600px'/>

### Routines

Users can keep track of their daily habits by creating routines. Routines include a title, description, time, and optional medication instructions.

#### Adding routines

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/routines1.GIF?raw=true' style='height: 600px'/>

#### Editing and filtering routines by time

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/routines2.GIF?raw=true' style='height: 600px'/>

### Appointments

Users can keep track of appointments by logging their date, time, provider, and location. This page features intuitive date/time pickers, dropdowns, and suggested addresses.

#### Adding appointments

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/appointments1.GIF?raw=true' style='height: 600px'/>

#### Editing and deleting appointments

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/appointments2.GIF?raw=true' style='height: 600px'/>

### Profile

Users can navigate to the profile page from the app overview and view their account information or log out.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/logout.GIF?raw=true' style='height: 600px'/>

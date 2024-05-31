# Healthseed - an organization tool to manage your health

## Overview

Healthseed is a mobile application allowing users to keep track of their medications, conditions, providers, routines, and appointments. Watch a full video demo [here](https://www.youtube.com/watch?v=EQW91BKPom0).

I built [Healthseed's backend](https://github.com/khamerling-potts/healthseed-flask-backend)(deployed on Heroku) using Python, Flask-SQLAlchemy, and PostgreSQL on render.com. The client (this repo) was built with JavaScript, React Native, and Expo Go - designed specifically for iOS. Client side routing was made possible with React Navigation. Front end styling was developed using React Native Paper in addition to many smaller open-source libraries (such as dropdown picker, libphonenumber, and datetimepicker).

## Features

### Create an Account/Login

Users can either create an account or sign in with existing credentials. User accounts include a name, username, birthday, and password.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/login.GIF?raw=true' style='height: 600px'/>

### Home page

After signing in, users are brought to a home page that includes a calendar marked with appointments and an overview of their routines.

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/home.GIF?raw=true' style='height: 600px'/>

### Providers

Users can keep track of provider information by adding, editing, and deleting providers.

#### Adding a provider

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/providers1.GIF?raw=true' style='height: 600px'/>

#### Editing a provider

<img src='https://github.com/khamerling-potts/healthseed-client/blob/main/assets/gifs/providers2.GIF?raw=true' style='height: 600px'/>

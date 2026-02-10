# LocalChat

## What is LocalChat ?

LocalChat is a modern local storage chat app that allows users to create accounts, chat to individuals and groups, edit account,log out, log in, see who is online, and see messages as well as their timestamps; all without having to connect to external networks.

## Why Choose LocalChat?

LocalChat priotizes safety and security of users. For your safety, you will not be connected to external networks. LocalChat not connecting to external networks ensures that hackers cannot access your private information.


# Documentation

## Software Requirement Specification

### Overview

LocalChat is a modern local chat app that allows users to create accounts, chat to individuals and groups, edit account,log out, log in, see who is online, and see messages as well as their timestamps; all without having to connect to external networks.

### components and functional requirement

**1. Authentication and authorisation management**
  * user can register
  * user can log in
  * user can access their unique profile

**2. User/Profile management**
 * user can access their personal information
 * user can update their personal information
 * user can log out of their profile
 * user can see other user's profile
 
**3. Chat subsystem**
 * user are able to see and message online and offline users
 * users are able to see and message groups
 * users are able to recieve and send messages in real time


# running application
## FRONTEND
npm install

## Development
npm run dev

## Production
* npm run build
* npm start

## Docker frontend (if you have environement setup)

* npm run docker
* npm run docker-start

docker currently running in detach mode so you will need to add the following under environment variables

* ENV NEXT_PUBLIC_API_BASE_URI ACTUAL_BASE_URL

# BACKEND

Visual Studio
* select web.host as startup project
* build application
* run application under IIS Express

# FRONTEND-CI

* npm run ci

# Setup for husky
In the client directory run the following command
* npm run prepare
  

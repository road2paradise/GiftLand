# <img src="public/logo.png">

## Motivation

This project was created for my Dad who runs a busy retail store in Auckland, New Zealand. He goes several times a week picking up stock for his store and previously had employees write on a piece of paper all the stock needed for that day. As technology advances, there was a **need** to create a more efficient system for this as often times there would be other modes of communication for orders to be made (Text messages, Viber, WhatsApp etc.) This made it hard as he needed to compile a "master list" containing all the stock he required (often having to filter through pieces of paper and messages sent to him weeks ago). This is a very time consuming exercise and often times things were missed off the list.

**This was the motivation behind this project** - To create a single source of truth where all employees are able to upload orders that are needed for the store and for him to access on the go.

# Basic Overview

Giftland is a **serverless web application** that allows users to upload photos of products that need to be ordered.

This web app is hosted on AWS using AWS-Amplify to deploy resources as required. Currently it uses:

- S3 for image storage.
- AWS Cognito for secure Sign-in and Sign-up.
- CloudFront for accelerated file upload to S3.

For secure file uploads the web application is hosted on local apache servers operating on Raspberry pi's at the business and also home WAN network.

## Usage

1. Firstly download and install [Node](https://nodejs.org/en/download/) on your machine.
2. Clone this repo https://github.com/road2paradise/GiftLand.git
3. Install Node Dependencies using `npm install`
4. Run the script using `npm run start`
5. To access the webserver please access it using localhost on port 3000.

**Note**: to access full features please sign-up as a new user. To access full developer functionality please ask for the `aws-exports.js` and add this file to `/src`.

## Testing

Testing TBC.

## Features

### Adding orders and including comments.

<img src="public/gifs/gL5.gif?raw=true" width="400">

### Scroll to top button.

<img src="public/gifs/gL4.gif?raw=true" width="400">

### Infinite Scrolling.

<img src="public/gifs/gL3.gif?raw=true" width="400">

### Deleting images.

<img src="public/gifs/gL.gif?raw=true" width="400">

# Project Status

Deployed and used in production.

### 3.08.2020

1. Refactored code for readability and reusability.
2. Added scroll to top button for both PC and Mobile usability.
3. Split mobile view to add more images per view.
4. Added total number of orders on ordering page.
5. ReadMe updated to reflect changes and format better.

### 6.07.2020

1. Infinite scrolling - to reduce the amount of get requests if users dont need to scroll through every image.
2. Added user feedback on number of uploaded files.

### 1.07.2020

1. Custom user input metadata to store form data inputted by users.
2. Changed fetch image methods.
3. Added uploaded date.

### 23.06.2020

Initial release and trial.

# Feedback

1. <s>Push notifications / SMS notifications where a link to the stored S3 image for urgent orders.</s> ❌ Not implemented as this would cause spam - nothing is urgent enough to warrant this feature.
2. Better feedback when users upload - maybe include a list / number of files uploaded? - ✔️ Completed.
3. Infinite scrolling - ✔️ Completed.
4. Button to scroll back to the top on Mobile view - ✔️ Completed

# Authors

Kenny Nguyen

# Acknowledgments

Toan Nguyen - for the motivation, time and encouragement for this project.

# GiftLand

My dad runs a busy retail store and utilises apps such as Whatsapp, Viber and sometimes pen and paper to order stock and inventory. I approached this problem with a solution of a web app / phone app in mind to address the need for a central platform where employees can simply upload a photo of the stock required instead of my dad having to filter through multiple applications and papers to collate stock and inventory.

This web app is hosted as a local webserver (Apache on Raspberry pi) at the store where employees will upload their photos to the cloud (AWS - S3) through the web application. The web app is also hosted at home where my dad is able to access all uploaded photos.

# Main features currently:

## Adding new orders and viewing them.

<img src="/public/gifs/gL2.gif?raw=true">

## Delete is also available on the All Orders page.

<img src="/public/gifs/gL.gif?raw=true">

## Available scripts.

Ensure that the correct AWS credentials are avaiable in the `aws.exports` file in the `src` folder.

`npm run start`
Runs the app in development mode. Uses port 3000 as the default. The page will also reload if you make edits.

`npm run build`
Builds the app for production to the build folder.

`npm run test`
Under construction.

## Project Status

Currently on trial and pending feedback.

### 6.07.2020

1. Working on infinite scrolling and pagination to reduce # of get requests made to AWS S3 when page is loaded - rather than loading everything in the bucket.


### 1.07.2020

Added additional features:

1. Custom user input metadata to store form data inputted by users.
2. Changed fetch image methods.
3. Added uploaded date.

### 23.06.2020

Initial release and trial.

# Initial Feedback

1. Push notifications / SMS notifications where a link to the stored S3 image for urgent orders. 
2. Interactive UI.
3. Better feedback when users upload - maybe include a list / number of files uploaded? - Completed.


# Authors

Kenny Nguyen - Initial release.

# Acknowledgments

Toan Nguyen - for giving me inspiration on the app idea.

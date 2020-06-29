# GiftLand

My dad runs a busy retail store and utilises apps such as Whatsapp, Viber and sometimes pen and paper to order stock and inventory. 
I approached this problem with a solution of a web app / phone app in mind to address the need for a central platform where employees can simply upload a photo of the stock required instead of my dad having to filter through multiple applications and papers to collate stock and inventory.

This web app is hosted as a local webserver (Apache on Raspberry pi) at the store where employees will upload their photos to the cloud (AWS - S3) through the web application.
The web app is also hosted at home where my dad is able to access all uploaded photos.

## Initial Feedback

1. Push notifications / SMS notifications where a link to the stored S3 image for urgent orders.
2. Interactive UI - currently dull.
3. Better feedback when users upload - maybe include a list / number of files uploaded?


## Available scripts.
Ensure that the correct AWS credentials are avaiable in the `aws.exports` file in the `src` folder.

### `npm run start` 
Runs the app in development mode. Uses port 3000 as the default. The page will also reload if you make edits.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run test`
Under construction.

## Project Status
Continued trial and feedback.

### 23.06.2020
Initial release and trial.

## Authors
Kenny Nguyen - Initial release.

## Acknowledgments
Toan Nguyen - for giving me inspiration on the app idea.


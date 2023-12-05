# Overview

The backend of this project was done in Python while the frontend was done with React and the Tailwind css framework. We used a Disney image dataset with the classification of six different cartoon characters (Donald Duck, Mickey Mouse, Minions, Olaf, Pooh, and Pumba) and used the Mediapipe package along with their pretrained mobile net model in order to extract embeddings from each image. To find similar images to the uploaded reference image, we use the cosine of the uploaded image's embeddings with all training set image's embeddings to give them all scores. We then use our neural network to weigh the cosine scores with the probability that the image is a specific classification, with the same classification being weighed much higher. The top 20 results are then posted for the user to look through.

# Demo Video

Click below for redirect to video.

[![Demo Video](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://youtu.be/_W6rPWig5i0)

If redirection fails, the demo video can be found at https://youtu.be/_W6rPWig5i0

# Setup and Installation

Before you start setting up the application, run
```bash
npm i # or npm install
```
to install all project depencies at the root level.

## Backend - Python
For the backend, you'll need to make sure that you have a python virtual environment created and activated on your machine. To do this follow the steps below:

1. In a terminal, go to the api directory and initialize a python3 virtual environment named 'venv'
```bash
cd api
python -m venv venv
```
2. Activate the virtual environment using the command for your system:
   - On Windows
   ```bash
   venv\Scripts\activate
   ```
   - On Mac/Linux
   ```bash
   source venv/bin/activate
   ```

3. Install project dependencies. You can find a full list in the [dependencies](/docs/DEPENDENCIES.md) documentation but you'll need to start with flask at the minimum
```bash
pip3 install flask
```

## Frontend - NodeJS
This is similar to the setup for the root project directory.

1. Install project dependencies
```bash
cd client
npm i
```

# Starting the server
In the root directory, all you need to do is run the following command and both the api and client should run successfully.
```bash
npm start
```

You can find the application running at http://localhost:3000

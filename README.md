# MoodMinder Chrome Extension

MoodMinder is a Chrome extension that enhances your Reddit browsing experience by filtering out negative comments using sentiment analysis. The extension provides two modes: **Blur Mode** and **Hide Mode**, allowing users to either blur or completely hide negative comments. Additionally, users can easily toggle the extension on and off and switch between modes as desired.

## Published Extension

You can install MoodMinder from the Chrome Web Store: https://chromewebstore.google.com/detail/moodminder/iobpegidgaikaooclpomdpplcffiablb

## Features

- **Sentiment Analysis**: Utilizes the VADER sentiment analysis library to identify negative comments on Reddit pages.
- **Blur Mode**: Blurs negative comments for a more subtle filtering experience.
- **Hide Mode**: Completely hides negative comments for a cleaner interface.
- **Toggle On/Off**: Easily turn the extension on and off using a convenient switch.
- **Interactive Popup**: A user-friendly popup interface with buttons for switching between blur and hide modes, and an on/off toggle.

## Usage

1. Visit a Reddit page.
2. Click on the MoodMinder extension icon to access the popup.
3. Use the buttons to choose between Blur and Hide modes.
4. Toggle the extension on and off using the switch.
5. Enjoy a more positive Reddit browsing experience!

On blur mode:
![image](https://github.com/ruby-lu-05/moodminder/assets/117548898/a3295249-8a26-4c4b-a320-a270fa1b25a6)

On hide mode:
![image](https://github.com/ruby-lu-05/moodminder/assets/117548898/03b75c2c-0de8-463f-b934-795343724d52)

Off:
![image](https://github.com/ruby-lu-05/moodminder/assets/117548898/45254b65-8d1b-40ff-bb19-2c23626cf106)



## Dependencies

- **Flask**: Backend server for sentiment analysis.
- **vaderSentiment**: Python library for sentiment analysis.
- **AWS**: Used for deploying the Flask web server.
- **JavaScript**: For building the Chrome extension.

## Folder Structure

- **app.py**: Flask backend for sentiment analysis.
- **manifest.json**: Chrome extension manifest file.
- **popup.html**: HTML file for the extension popup.
- **popup.css**: CSS styling for the extension popup.
- **popup.js**: JavaScript logic for the extension popup.
- **content.js**: Content script injected into Reddit pages.
- **background.js**: Background script managing extension state.

## Collaboration

This project was developed collaboratively by Ruby Lu (ruby-lu-05) and Sabrina Wang (sbrina-w).

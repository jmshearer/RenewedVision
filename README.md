# RenewEd:Vision
RenewEd:Vision is a proof-of-concept web app that performs the following functions:
1. Locates lamps via a cellphone camera
2. Calculates annual savings if the lamps were switched to LED fixtures

...think of it as a gamified self-assessment (sort of)

## Using the app
Install the app on a web server and open in a browser.  When it finds a lamp, a green dot will display followed by a pulsating leaf after the user has dwelled on the lamp for a few seconds (to prevent false positives).  It will then add a fixed amount to the annual savings total to give the user an estimate for annual savings that could be realized by switching to LED lights.

## Notes
- The app uses a TensorFlow.js model that was trained on Google images of lamps in various settings (floor lamps, ceiling fixtures, etc).
- The current data set was labeled using [Label-Studio](https://labelstud.io/) though it would be much faster to do so with [Google AutoML](https://console.cloud.google.com/vision/dashboard)'s tools.
- The labels all say "json" (the label-studio tool was originally used and, for some reason, it defaulted to this)
- MANY improvements could be made, for example:
  - Update the detector to differentiate between tungsten, fluorescent, and LED lights
  - Add additional object detectors related to the environment (refrigerators, thermostats, windows, trash cans, you name it)
  - Use some type of lookup to calculate actual energy savings
  - Integrate with AR.js / a-frame to drop pins at already-located fixutres to prevent re-detection
  - Record the location and fixture information, produce some type of itemized task list
  - Add user data collection to act as a front-of-funnel for other initiatives

## Creating a custom object detector
The object detector is simplay a TensorFlow.js model.  The current model only has one label so the app does no label-checking though the model could easily contain multiple labels (see suggestions above).  In order to create a custom detector:
1. Create a dataset in [Google AutoML](https://console.cloud.google.com/vision/dashboard)
2. Load approximately 100-200 images and tag them
3. Train an Edge model (for offline/mobile use).  Recommend 1 node hour budget
4. Export to TensorFlow.js and load into model directory

# Cognitive Science - Image Contrast Experiment

<img src = "https://3tkh0x1zl0mb1ta92c2mrvv2-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/MQ_INT_VER_RGB_POS-800x800.png" width = "300" align = "right" > 
An experiment comprising of a set of trials that involve drawing a set of images with various contrasts, having the users categorize the images, and storing the actions.


## Contents 
- [Session Flow](#flow)
- [Navigate this repository](#navigate)
- [Configuration files](#config)
- [Data collection](#data)
- [Credits](#credits)   

<a name = "flow"></a>
## Session Flow
<img src="https://i.ibb.co/5vhZP88/automata.png" alt="automata" width = "350" border="0" align = "right" > 

1. Loading screen
2. Fixation screen
   1. Wait for mouse to enter fixation point 
   2. Inside fixation point, wait for a predefined duration
3. Trial screen
   1. Trial begin, show images
   2. User clicks on image, prompt to pick category
   3. User picks a category, proceed to results screen 
4. Results screen
   1. show a check or a cross depending on user's input
   2. update database entry 
   3. Wait for a predefined duration 
   4. Finish session, or do another trial 
5. Finish screen
   1. display a thank you note
  
<a name = "navigate"></a>
## Navigate this Repository
* **code** python code used to generate images and config files
* **img** images used in the trials
* **src** game source code in javascript
* **dist** deployed game code
* **config** configuration JSON 


<a name = "config"></a>
## Configuration Files
### parameters_config.json 
Some parameters are self-explanatory.
* fixation_point_position: the position of the fixiation point in which the user must reset the mouse position in [0, 1]
* fixation_point_duration: the duration the mouse must stay inside fixation point in milliseconds
* fixation_point_guide_radius: the radius of the guide circle for the fixation point
* delay_before_feedback: the duration to wait before showing feedback after trial in milliseconds
* mouse_capture_rate: how many times per second to capture and store mouse position 
* stimuli_position_coordinate_space: the dimensions of the space in which image positions are provided, they are then scaled to fit screen
* trials_per_session: the number of times to repeat the trials during one session


### stim_key.json 
Maps stim_id (i.e., the file name of the stimulu png) to its properties (e.g., contrast level).

<a name = "data"></a>
## Data Collection
Throughout the session, we collect as many useful data as possible, which is put in a JSON object.
The data contains the following: 
* configInfo: the configuration info used during the game
* environmentInfo: regarding the device and navigator used by the subject
* events: all events of interest and their time stamp 
   * session_begin: fired once at the beginning of the session
   * trial_begin: fired at the begining of every trial
   * trial_end: fired at the end of every trial, passes a parameter for "status" => {correct, wrong}
* actions: all user actions captured throughout the session
   * mouse_click
   * keyboard_press
* mouse_life: a string containing the position of the mouse at every interval during game-play, the sample rate at which this position is 
captured is defined in the paramters_config.json file

Examples on how to obtain and use this data in Python:
./code/plotEventsAndActions.py
./code/plotMouseLife.py

<a name = "credits"></a>
## Credits

### Developed by [Ahmed Elyamani](mailto:ahmed1elyamani@gmail.com) on a freelance contract for [Cognitive Science, Macquarie Uni](https://www.mq.edu.au/about/about-the-university/faculties-and-departments/faculty-of-human-sciences/departments-and-centres/department-of-cognitive-science)


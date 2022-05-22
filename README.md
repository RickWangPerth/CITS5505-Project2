# CITS5505-Project2
#### Klotski (eight-puzzle)
#### Qianyu Meng 21693709 & Xinlyu Wang 22200099

## Purpose of the web application
Our team wants to create an online daily puzzle in this web application - N-Puzzle, that can help users improve their logical reasoning ability.
N-Puzzle is a sliding-block puzzle that is easy for everyone to get started. All ages could enjoy that game. The player can click the block and move it to the space block. When the numbers are in numerical order, the player wins the game. <br>

Here is the demo video to show how to play the eight-Puzzle:
<div align=center><img src="https://miro.medium.com/max/508/1*YxeZJzfhW4kn5O5wAGbkIg.gif" width="150" height="150" alt="Demo 8 puzzle"/></div>
 <br>
The team designs an eight-Puzzle game. The game will cost around 2-4 minutes. Users can play it during their break time or on the bus. After users complete their game, they can share their achievements to their social network and check their performance rank.

## The architecture of the web application
**Model View Controller**
<br>
<div align=center><img src="https://miro.medium.com/proxy/0*Qf1s2lG86MjX-Zcv.jpg" width="420" height="280" alt="MVC"/></div>
<br>
MVC was reportedly invented by Trygve Reenskaug in the 1970's and becomes one of the most popular patter for server side web applications.
<br>
<br>

**Model**
<br>
The model represents the data and logic of the app. It will be paired with an entity in a database.(e.g. User in this app)<br>
After receive the request from controller, model will pick up the required data back to controller.<br>

**Controller**
<br>
The controller is the go-between for models and views. It relays data from browser to app and from app to browser. <br>
In this project routes.py work as controller. <br>
When the users want to move to new page, they send the request to controller. And controller will render the view.<br>

**View**
<br>
The view is the only part of the app the user interacts with directly. It is attached to the model and in turn displays the model’s data.<br>
The html files in the templete folder work as view.<br>
Users can read information and intercat with it.<br>

## How to launch the web application
Clone this application to loacl direscotry <code> git clone https://github.com/RickWangPerth/CITS5505-Project2.git </code> <br>
 <br>
Set up python virtual environment <code> python3 -m venv venv </code> <br>
 <br>
Activate the python virtual environment <code> source venv/bin/activate </code> <br>
 <br>
Download the required packages <code> pip install -r requirements.txt </code> <br>
 <br>
Launch the web application: <code> flask run </code> <br>
 <br>
Go to the generated url, you can see the application on the website.
 <br>
 <br>
Stop the web application: <code> ^C </code> <br>

Exit the environment: <code> deactivate </code>

## Take the journey in the applicaiton and do user test
**Step One: Register** <br>
Input the Username & Email & Password and Repeat Password <br>
Administrators need to input the adminkey to create an admin account <br>
The Username and Email must be unique. <br>
Then the user gets their account.<br>

**Step Two: Login** <br>
Use the username and password to sign in to the game.<br>
Users can tick the Remember Me to record their account information on the website.

**Step Three: Concise History and How to Play** <br>
To give users a brief introduction to the N-Puzzle game and show them how to play it.

**Step Four: Play the game**
<ul> 
  <li> Click the Game button in the navgation bar </li> 
  <li> Click the Start button in the game page </li> 
  <li> Play the game! </li>
  <li> The elapsed time and steps will be recorded </li>
  <li> If the users cannot figure out they can click restart button to restart the game </li>
  <li> When the blocks are in numerical order, user win </li>
  <li> Every user just can play the game once a day </li>
</ul>

**Step Five: Share achievements and check daily improvement** 
After user win the game, they can click "Save prfomance" button to save their result as image in thier divice.  <br>
And then, they can show it on the socail network. <br>
Users can click the Statistics in the navigation bar to see their daily progress. <br>

**Step Six: Compare with other players** <br>
Users can click the Rank button in the navigation bar to see the top ten player information. <br>

**Step Seven: Work as administrator**
Administrator can use their own account to move to the admin page, where can updata and vet the game.<br>

## Unit tests for the web application
Run unit tests <code> python3 -m pytest "test" </code>
 
**Test Config**
 
Function: test_config
<ul>
  
  <li> Test if SECRET_KEY is correct </li>
  
  <li> Test if SQLALCHEMY_DATABASE_URI is correct </li> 
 
</ul>
<br>
 
Function: test_test_config
<ul>
  
  <li> Test if SQLALCHEMY_DATABASE_URI is correct </li> 
 
</ul>

**Test Database**
 
Function: test_user_database
 
 <ul>
  
 <li> Test if data can be added to the database successfuly </li>
  
  <li> Test if password is added and converted into hash successfuly </li> 
  
  <li> Test if addminkey is added successfuly </li>
  
</ul>
 <br>
 
Function: test_rank_database
<ul>
  
  <li> Test if data can be added to the database successfuly </li>
 
</ul>
 
## Commit logs

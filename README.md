# p2.Mackenzie.Hamlett
## Presentation Video
ADD VID

# REPORT
## Sketch
![p2 Mackenzie Hamlett](https://user-images.githubusercontent.com/59324140/202062341-289926d6-500f-40bc-8c6b-fb092ec58c90.png)

## Sketch Discussion
### Left side of Mirror
- Calendar Events
    > Here the sketch displays the current date where the user is located, and below will list all tasks that the user has set to accomplish for that specific day.
- News
    > Under the news section of the mirror the most viewed (popular) headlines from New York Times will display to the user. This will provide the user with up to date information regarding the current worldly news while they get ready for the day.
- Health
  - Sleep
      > The sleep section will provide how long the user had slept the previous night detailing below how many hours were slept deeply and how many were slept lightly.
  - Weight
      > The weight will be displayed on the mirror (as is assumed to be connected to a scale that the user is standing on in front of the mirror) and will display to the user theur change in weight from the previous week.
  - Exercise
      > The exercise portion of the mirror will display a time series chart to the user with two different lines graphed. The first will be a solid line showing the user their steps taken this week, while the dashed line will show the user the number of steps taken last week.

### Right side of Mirror
- Clock
    > The clock displayed will be an analog clock showing the current locla time to the user.
- Weather
    > The weather portion of the display will contain forecast (sunny/cloudy/rainy... etc), the current temperature in F degrees, and will display the place the mirror is displaying the weather in geographically.
- Text Messages
    > The mirror will be connected to the user's phone through bluetooth and will display the unread text messages along with a snippit of what they say to the user.
- Social Media
    > Both twitter and Snapchat will be displayed to the user, both displaying unseen messages and top stories/ tweets to the user.

### Bottom of Mirror
- Illumination Color
    > As an advanced feature, this mirror will have several buttons along the bottom that the user may press to change the illumination color of the mirror.

## Implementation
### GIF of Mirror in use
ADD GIF

### Discussion of implementation
#### Changes made from the sketch:
- Clock was moved to top and center of the mirror
- Weather moved to the left side of the mirror
- Weight moved to the right side of the mirror
- Calendar Events moved to right side of the mirror
#### Implemented features
- Calendar Events
    - The calendar events on the righthand side of the mirror are displayed to the user by fetching the stored event data in <events.json> for that specific date using the loadJSON function in cp5.js, they are display through using a loop to iterate through each event and output in order of time.
- News
    - The news functionaility on the lefthand side of the mirror is displayed to the user by fetching the stored data in <news.json> which is a json file retrieved from a free api given by New York Times for developer use. Then each headline is displayed to the user through looping through to find each majot headline and output on the mirror.
- Health: Weight
    - The health feature I chose to implement was to display the current weight of the mirror user and have it compared to their weight from that time last week. The data for the weight is stored in <weights.json> and is collected by the scale and stored in the json file. The function uses cp5's Date(); to get the current day and sotres and displays the users weight while also fetching their weight from 7 days prevously and displaying the difference to the user as well.
- Weather
    - The weather functionality was implemented through accessing the free weather API given by weather.gov, the 3 fetched data points from the API for the user are the local temperature, the forecast (sunny, cloudy, rainty...etc), and the location of the mirror user. 
- Clock
    - The clock was implemented utilizing cp5.js's ability to access the clock of the computer the program is being ran on through positioning the hour, minute, and second hands in their correct positions through functions minute(), hour(), second() and multiplied by cos() and sin() for the correct radial locations on the dial.
- Illumination of Mirror (ADVANCED) 
    - On the bottom of the mirror the user can press 4 different buttons to change the illumination color of the mirror, the mirror is then illuminated from lights behind the mirror to give a soft glow to the surrounding room for lighting. This was implemented by changing the color of a border behind the image of the user on the screen on press of any of the respective buttons. It is to be assumed a real life implementation this would be done with LED lighting ran behind the mirror.


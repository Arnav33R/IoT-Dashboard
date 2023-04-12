# IoT Web-App Dashboard

IoT Dashboard created for TAE 030 — Mobile Communication & Computing Technologies for Agriculture & the Environment, Spring Quarter 2023, taught by Dr. Moghimi at the University of California, Davis.

![Course Flyer](https://github.com/Arnav33R/IoT-Dashboard/blob/main/Flyer.jpeg?raw=true)


## Introduction

The overall goal of the project is to develop a smart pot, acting as a small-scale controlled environment system for a plant to detect various environmental factors and make decisions toachieve a desired environment for the plant to grow.

The IoT system makes use of the Parallax Propeller Activity Board WX, and includes sensors to detect temperature, relative humidity, light intensity, soil moisture and distance. It also includes a servo motor, an irrigation pummp, an LED, and a lamp as actuators that are triggered if the readings from any particular sensors go beyond a user-set threshold limit. 

This is the web application dashboard for the IoT system, which communicates with the microcontroller and collects sensor data, displaying it to the users. Users can also interact with the dashboard to trigger actuators based on set parameter values and thresholds. 

## Parallax Board

All of these tutorials can found on the official Parallax [documentation](https://learn.parallax.com/tutorials/language/propeller-c). For the scope of this project, and for setting up a basic IoT module in general with the Propellor board, you can follow the steps below:

### Setting up

#### [Set up Simple IDE](https://learn.parallax.com/tutorials/language/propeller-c/propeller-c-set-simpleide)

#### [Install WiFi Module Drivers](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/wi-fi-module-firmware)

#### [Connect WiFi Module to Propeller Board](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/connect-wx-wi-fi-module-your)

#### [Join Module's WiFi](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/join-module%E2%80%99s-wi-fi)

#### [Update WiFi Module Firmware](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/join-module%E2%80%99s-wi-fi)

#### [Configure WiFI Module](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/configure-module-communication)

#### [Programming Propeller over WiFi](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/program-propeller-over-wi-fi)

#### [Connect WiFi Module to Another WiFi Network](https://learn.parallax.com/tutorials/language/propeller-c/parallax-wx-wi-fi-module-prop-c/join-another-wi-fi-network)

## Code Documentation

This section will serve as documentation for the code in this repository. 

### Overview of Architecture

This project makes use of JavaScript AJAX web techniques to set up client server communication. With AJAX, a web application can retrieve and send data from a server, in this case the Propeller Activity Board and its attached sensors, and do so asynchronously while updating the display and behavior of the web application based on the incoming (or outgoing) data. 

The overall architecture of this project is composed of 3 main components, as seen in the image below. 

![Architecture Representation](https://github.com/Arnav33R/IoT-Dashboard/blob/main/IoT%20Architecture.jpeg?raw=true)

- **Web Application**: The web application consists of HTML, CSS and JavaScript code. The website displays several dropdown panels for users to select which sensor they want to read from, what the data update frequency interval should be, and how to save the data. Then, all of the sensor readings are displayed in a line graph that refreshes every time the selected sensor is changed, and only displays the 20 most recent reading values. HTTP Requests are made and received data is processed using JavaScript, which also implements other features on the web app and dynamically updates the graph with incoming data. Finally, the CSS stylesheet styles the entire web application. The design of this dashboard was inspired by the [Dashboard For Everybody](https://github.com/jasonwebb/dashboard-for-everybody), and similarly uses the Bulma CSS library. 

- **Server Backend**: This is the C code that is run using Simple IDE which interacts directly with the Propeller board, the WiFI module and attached sensors/actuators. This host code handles the HTTP requests made by the web application. It does so by "listening" to different GET request paths (for different sensors) and processes these requests by making the appropriate calls to read sensor data. Finally, these sensor readings are returned to the web application and the JavaScript code processes this incoming data and updates the web application accordingly. 

- **IoT System**: This is the entire module used for this project, which comprises of the Parallax Propeller Activity Board, the WiFi Module, and the attached sensors and actuators.

### JavaScript Code

This JavaScript code provides functionality to read data from different sensors on a device and display the data on a chart in real-time. The code is well-commented, making it easy to understand. Here is an explanation of the code:

#### DOM Elements from HTML

The first section of the code assigns variables to several DOM elements from the HTML page. These variables will be used later in the code to modify the elements, add event listeners, update them, or change their style properties. 

- **dataSaveMethod**: the selected method for saving data
- **dataSaveButton**: the button for downloading data
- **select**: the dropdown menu for selecting the sensor
- **unit**: the unit of measurement (e.g., Celsius or Fahrenheit) for the selected sensor
- **tempUnit**: the container for the temperature unit dropdown menu

#### Timer

We set a timer to call the getVals function repeatedly every 5 seconds. The getVals function makes an HTTP request to the IoT device to get the sensor data.

### Functions

- **generateCSV**: generates a CSV file from a given data object and downloads it when the user clicks the download button. The function takes two parameters, the data object and the download button. It uses the Blob object to create a CSV file and sets the download button's attributes to download the generated file
- **regReply**: callback function for regular sensor readings. The function receives the sensor data and appends it to the appropriate data obejct. It also updates the chart object and keeps only the last 20 data points.
- **tempReply**: callback function for temperature and humidity readings. The function receives the temperature in Fahrenheit and Celsius and the humidity. It then checks the selected unit of measurement and the selected sensor and appends the appropriate data to the appropriate data object. It also updates the chart object and keeps only the last 20 data points. 


### Server Backend (C)

This code is written in C and is designed to run on the Propeller board. It reads data from various sensors and returns these values to the web application via WiFI.

#### Libaries

- **simpletools.h**: A library containing functions that simplify programming with the Propeller microcontroller.
- **wifi.h**: A library that facilitates communication between the microcontroller and a Wi-Fi module.
- **dht22.h**: A library that helps read data from a temperature and humidity sensor.
- **ping.h**: A library that helps read data from a distance sensor.
- **wavplayer.h**: A library that helps play audio files.
- **abvolts.h**: A library that helps read analog data from sensors.


#### Variables
The code initializes the following variables to keep track of various aspects of the GET requests:

- **event**: The type of event (e.g., GET, POST).
- **id**: The ID of the GET request.
- **handle**: The handle of the GET request.
- **temp**: The path for temperature data in Fahrenheit and Celsius and humidity data.
- **dis**: The path for distance data from a sensor.
- **mois**: The path for soil moisture data.
- **par**: The path for light intensity data.
- **val**: The value read from a sensor.
- **distance**: The distance measured by a sensor.

#### Functions
The code defines the following two functions:

- **parking_assist()**: A function that plays an audio file with different volumes depending on the distance measured by a sensor.
- **get_temp_data()**: A function that reads data from a temperature and humidity sensor and returns an array of the temperature in Fahrenheit and Celsius, and relative humidity.

#### Main Function
The code's main function performs the following steps:

- Initializes the Wi-Fi module, the SD card reader, and the analog input pins.
- Listens to GET requests at different paths.
- Enters into an infinite loop to continually poll for events.
- If a GET request is received, the code reads data from the appropriate sensor and returns the values to the client.
- If the GET request is for distance data, the code also calls the parking_assist() function to play an audio file with different volumes depending on the distance measured by the sensor.







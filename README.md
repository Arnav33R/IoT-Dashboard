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

#### Overview of Architecture

This project makes use of JavaScript AJAX web techniques to set up client server communication. With AJAX, a web application can retrieve and send data from a server, in this case the Propeller Activity Board and its attached sensors, and do so asynchronously while updating the display and behavior of the web application based on the incoming (or outgoing) data. 

The overall architecture of this project is composed of 3 main components, as seen in the image below. 

![Architecture Representation](https://github.com/Arnav33R/IoT-Dashboard/blob/main/IoT%20Architecture.jpg?raw=true)

- Web Application: The web application consists of HTML, CSS and JavaScript code. The website displays several dropdown panels for users to select which sensor they want to read from, what the data update frequency interval should be, and how to save the data. Then, all of the sensor readings are displayed in a line graph that refreshes every time the selected sensor is changed, and only displays the 20 most recent reading values. HTTP Requests are made and received data is processed using JavaScript, which also implements other features on the web app and dynamically updates the graph with incoming data. Finally, the CSS stylesheet styles the entire web application. The design of this dashboard was inspired by the [Dashboard For Everybody](https://github.com/jasonwebb/dashboard-for-everybody), and similarly uses the Bulma CSS library. 

- Server Backend: This is the C code that is run using Simple IDE which interacts directly with the Propeller board, the WiFI module and attached sensors/actuators. This host code handles the HTTP requests made by the web application. It does so by "listening" to different GET request paths (for different sensors) and processes these requests by making the appropriate calls to read sensor data. Finally, these sensor readings are returned to the web application and the JavaScript code processes this incoming data and updates the web application accordingly. 

- IoT System: This is the entire module used for this project, which comprises of the Parallax Propeller Activity Board, the WiFi Module, and the attached sensors and actuators.

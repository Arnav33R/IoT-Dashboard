# IoT Web-App Dashboard

IoT Dashboard created for TAE 030 — Mobile Communication & Computing Technologies for Agriculture & the Environment, Spring Quarter 2023, taught by Dr. Moghimi at the University of California, Davis.

![Course Flyer](https://github.com/Arnav33R/IoT-Dashboard/blob/main/Flyer.jpg?raw=true)


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

![Architecture Representation](https://github.com/Arnav33R/IoT-Dashboard/blob/main/IoT%20Architecture.jpeg?raw=true)

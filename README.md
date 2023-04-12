# IoT Web-App Dashboard

IoT Dashboard created for TAE 030 — Mobile Communication & Computing Technologies for Agriculture & the Environment, Spring Quarter 2023, taught by Dr. Moghimi at the University of California, Davis.

## Introduction

The overall goal of the project is to develop a smart pot, acting as a small-scale controlled environment system for a plant to detect various environmental factors and make decisions toachieve a desired environment for the plant to grow.

The IoT system makes use of the Parallax Propeller Activity Board WX, and includes sensors to detect temperature, relative humidity, light intensity, soil moisture and distance. It also includes a servo motor, an irrigation pummp, an LED, and a lamp as actuators that are triggered if the readings from any particular sensors go beyond a user-set threshold limit. 

This is the web application dashboard for the IoT system, which communicates with the microcontroller and collects sensor data, displaying it to the users. Users can also interact with the dashboard to trigger actuators based on set parameter values and thresholds. 

## Parallax Board

All of these tutorials can found on the official Parallax [documentation](https://learn.parallax.com/tutorials/language/propeller-c). For the scope of this project, and for setting up a basic IoT module in general with the Propellor board, you can follow the steps below:

### Setting up

#### [Set up Simple IDE](https://learn.parallax.com/tutorials/language/propeller-c/propeller-c-set-simpleide)


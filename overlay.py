#!/bin/bash

import obdII

def main():
    #I write functions like Java, might as well lean into it
    oilTemp = obdII.getOilTemp()
    speed = obdII.getSpeed()
    rpm = obdII.getRPM()
    fuelLevel = obdII.getFuelLevel()
    engineLoad = obdII.getEngineLoad()
    
    displayData(oilTemp, speed, rpm, fuelLevel, engineLoad)
    return "main completed"
main()
def getOilTemp():
    oilTemp = 190
    return oilTemp

def getSpeed():
    speed = 65
    return speed

def getRPM():
    rpm = 3000
    return rpm

def getFuelLevel():
    fuelLevel = 50
    return fuelLevel

def getEngineLoad():
    engineLoad = 73   
    return engineLoad

def displayData(oilTemp, speed, rpm, fuelLevel, engineLoad):
    print("Oil Temperature: " + str(oilTemp) + " F")
    print("Speed: " + str(speed) + " mph")
    print("RPM: " + str(rpm))
    print("Fuel Level: " + str(fuelLevel) + "%")
    print("Engine Load: " + str(engineLoad) + "%")
    return None

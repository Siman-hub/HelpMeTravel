package com.example.helpMeTravel.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LocationObject
{
    @JsonProperty("Source")
    private String Source;
    @JsonProperty("Destination")
    private String Destination;
    @JsonProperty("Cost")
    private String Cost;

    public LocationObject() {
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getDestination() {
        return Destination;
    }

    public void setDestination(String destination) {
        Destination = destination;
    }

    public String getCost() {
        return Cost;
    }

    public void setCost(String cost) {
        Cost = cost;
    }

    public LocationObject(String source, String destination, String cost) {
        Source = source;
        Destination = destination;
        Cost = cost;
    }

    @Override
    public String toString() {
        return "LocationObject{" +
                "Source='" + Source + '\'' +
                ", Destination='" + Destination + '\'' +
                ", Cost='" + Cost + '\'' +
                '}';
    }
}

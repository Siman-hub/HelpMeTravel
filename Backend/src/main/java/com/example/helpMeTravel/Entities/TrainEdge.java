package com.example.helpMeTravel.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public class TrainEdge {

    @JsonProperty("trainPNR")
    private String trainPNR;

    @JsonProperty("trainName")
    private String trainName;

    @JsonProperty("source")
    private String source;  // just the name of the station

    @JsonProperty("destination")
    private String destination;  // just the name of the station

    @JsonProperty("dayOfOperation")
    private List<DayOfWeek> dayOfOperation;

    @JsonProperty("price")
    private int price;

    @JsonProperty("arrivalTime")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime arrivalTime;

    @JsonProperty("departureTime")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime departureTime;

    public TrainEdge() {}

    public TrainEdge(String trainPNR, String trainName, String source, String destination,
                     List<DayOfWeek> dayOfOperation, int price,
                     LocalTime arrivalTime, LocalTime departureTime) {
        this.trainPNR = trainPNR;
        this.trainName = trainName;
        this.source = source;
        this.destination = destination;
        this.dayOfOperation = dayOfOperation;
        this.price = price;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
    }

    public String getTrainPNR() {
        return trainPNR;
    }

    public void setTrainPNR(String trainPNR) {
        this.trainPNR = trainPNR;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public List<DayOfWeek> getDayOfOperation() {
        return dayOfOperation;
    }

    public void setDayOfOperation(List<DayOfWeek> dayOfOperation) {
        this.dayOfOperation = dayOfOperation;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    @Override
    public String toString() {
        return "TrainEdge{" +
                "trainPNR='" + trainPNR + '\'' +
                ", trainName='" + trainName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", dayOfOperation=" + dayOfOperation +
                ", price=" + price +
                ", arrivalTime=" + arrivalTime +
                ", departureTime=" + departureTime +
                '}';
    }
}

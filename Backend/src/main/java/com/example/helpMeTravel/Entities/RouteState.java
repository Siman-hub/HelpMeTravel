package com.example.helpMeTravel.Entities;

public class RouteState {
    private StationEntity currentStation; // Includes name + arrivalTime
    private int totalCost;

    public RouteState(StationEntity station, int cost) {
        this.currentStation = station;
        this.totalCost = cost;
    }

    public StationEntity getCurrentStation() {
        return currentStation;
    }

    public void setCurrentStation(StationEntity currentStation) {
        this.currentStation = currentStation;
    }

    public int getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(int totalCost) {
        this.totalCost = totalCost;
    }
}

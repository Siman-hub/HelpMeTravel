package com.example.helpMeTravel.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Objects;

public class StationEntity {

    @JsonProperty("location")
    private String location;

    @JsonProperty("arrivalDay")
    private DayOfWeek arrivalDay;

    @JsonProperty("arrivalTime")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime arrivalTime;

    public StationEntity() {
    }

    public StationEntity(String location, DayOfWeek arrivalDay, LocalTime arrivalTime) {
        this.location = location;
        this.arrivalDay = arrivalDay;
        this.arrivalTime = arrivalTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public DayOfWeek getArrivalDay() {
        return arrivalDay;
    }

    public void setArrivalDay(DayOfWeek arrivalDay) {
        this.arrivalDay = arrivalDay;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StationEntity)) return false;
        StationEntity that = (StationEntity) o;
        return location.equalsIgnoreCase(that.location) &&
                arrivalDay == that.arrivalDay &&
                Objects.equals(arrivalTime, that.arrivalTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(location.toLowerCase(), arrivalDay, arrivalTime);
    }

    @Override
    public String toString() {
        return "StationEntity{" +
                "location='" + location + '\'' +
                ", arrivalDay=" + arrivalDay +
                ", arrivalTime=" + arrivalTime +
                '}';
    }
}

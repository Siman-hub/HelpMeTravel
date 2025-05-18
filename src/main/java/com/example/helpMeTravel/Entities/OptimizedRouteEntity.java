package com.example.helpMeTravel.Entities;


import java.util.List;

public class OptimizedRouteEntity
{
    private List<String> route;
    private Integer prize;

    public Integer getPrize() {
        return prize;
    }

    public void setPrize(Integer prize) {
        this.prize = prize;
    }

    public List<String> getRoute() {
        return route;
    }

    public void setRoute(List<String> route) {
        this.route = route;
    }

    @Override
    public String toString() {
        return "OptimizedRouteEntity{" +
                "route=" + route +
                ", prize=" + prize +
                '}';
    }
}

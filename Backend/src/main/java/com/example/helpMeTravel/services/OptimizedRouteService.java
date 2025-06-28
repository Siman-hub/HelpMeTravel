package com.example.helpMeTravel.services;

import com.example.helpMeTravel.Entities.OptimizedRouteEntity;
import com.example.helpMeTravel.Entities.RouteState;
import com.example.helpMeTravel.Entities.StationEntity;
import com.example.helpMeTravel.Entities.TrainEdge;
import com.example.helpMeTravel.functions.GraphBuilder;
import com.example.helpMeTravel.functions.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;

@Service
public class OptimizedRouteService {

    @Autowired
    private GraphBuilder graphBuilder;

    public OptimizedRouteEntity getOptimizedRoute(String des, String sou, String dayOfweek) throws IOException {

        String destination = des.toUpperCase();
        String source = sou.toUpperCase();

        PriorityQueue<RouteState> queue = new PriorityQueue<>(
                Comparator.comparingInt(RouteState::getTotalCost)
        );

        Set<StationEntity> visited = new HashSet<>();

        DayOfWeek startDay = DayOfWeek.valueOf(dayOfweek.toUpperCase());
        StationEntity startStation = new StationEntity(source, startDay, LocalTime.MIN);
        RouteState initialRouteState = new RouteState(startStation, 0);

        OptimizedRouteEntity optimizedRoute = new OptimizedRouteEntity();

        Map<String, List<TrainEdge>> graph = graphBuilder.buildGraph(dayOfweek);

        Map<StationEntity, Integer> costs = new HashMap<>();
        Map<StationEntity, StationEntity> previousNodes = new HashMap<>();

        costs.put(startStation, 0);
        queue.add(initialRouteState);

        StationEntity finalStation = null;

        while (!queue.isEmpty()) {
            RouteState currentState = queue.poll();
            StationEntity currentStation = currentState.getCurrentStation();

            if (visited.contains(currentStation)) continue;
            visited.add(currentStation);

            if (currentStation.getLocation().equals(destination)) {
                finalStation = currentStation;
                break;
            }

            List<TrainEdge> neighbors = graph.getOrDefault(currentStation.getLocation(), Collections.emptyList());

            for (TrainEdge train : neighbors) {
                for (DayOfWeek trainDay : train.getDayOfOperation()) {

                    // Skip if train is not on the same or next day
                    if (!trainDay.equals(currentStation.getArrivalDay()) &&
                            !trainDay.equals(currentStation.getArrivalDay().plus(1))) {
                        continue;
                    }

                    if (!TimeUtil.canCatch(
                            currentStation.getArrivalDay(),
                            currentStation.getArrivalTime(),
                            trainDay,
                            train.getDepartureTime())) {
                        continue;
                    }

                    StationEntity nextStation = new StationEntity(
                            train.getDestination(),
                            trainDay,
                            train.getArrivalTime()
                    );

                    int newCost = currentState.getTotalCost() + train.getPrice();

                    if (newCost < costs.getOrDefault(nextStation, Integer.MAX_VALUE)) {
                        costs.put(nextStation, newCost);
                        previousNodes.put(nextStation, currentStation);
                        queue.add(new RouteState(nextStation, newCost));
                    }
                }
            }
        }

        if (finalStation == null || costs.get(finalStation) == null) {
            optimizedRoute.setPrize(Integer.MAX_VALUE);
            optimizedRoute.setRoute(new ArrayList<>());
            return optimizedRoute;
        }

        // Reconstruct path
        List<StationEntity> path = new ArrayList<>();
        StationEntity curr = finalStation;

        while (curr != null) {
            path.add(curr);
            curr = previousNodes.get(curr);
        }

        Collections.reverse(path);

        optimizedRoute.setRoute(path);
        optimizedRoute.setPrize(costs.get(finalStation));

        return optimizedRoute;
    }
}

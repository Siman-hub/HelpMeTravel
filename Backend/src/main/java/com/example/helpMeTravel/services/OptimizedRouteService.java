package com.example.helpMeTravel.services;

import com.example.helpMeTravel.Entities.OptimizedRouteEntity;
import com.example.helpMeTravel.fucntions.GraphBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class OptimizedRouteService
{
    @Autowired
    private GraphBuilder graphBuilder;

    public OptimizedRouteEntity getOptimizedRoute(String destination, String source) throws IOException {

        OptimizedRouteEntity optimizedRoute = new OptimizedRouteEntity();

        Map<String, Map<String,Integer>> graph = graphBuilder.buildGraph();

        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previousNodes = new HashMap<>();
        Set<String> visited = new HashSet<>();
        PriorityQueue<Node> queue = new PriorityQueue<>(
                Comparator.comparingInt(node -> node.distance));

        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(source, 0);
        queue.add(new Node(source, 0));

        while(!queue.isEmpty())
        {
            Node current = queue.poll();

            if(current.name.equals(destination)) break;

            if(visited.contains(current.name)) continue;
            else visited.add(current.name);

            Map<String,Integer> neighbors = graph.getOrDefault(current.name,Collections.emptyMap());

            for(Map.Entry<String,Integer> neighbor : neighbors.entrySet())
            {
                String nextNode = neighbor.getKey();

                int newDistance = distances.get(current.name) + neighbor.getValue();

                if(newDistance < distances.getOrDefault(nextNode,Integer.MAX_VALUE)) {
                    distances.put(nextNode,newDistance);
                    previousNodes.put(nextNode,current.name);
                    queue.add(new Node(nextNode, newDistance));
                }
            }
        }

        List<String> path = new ArrayList<>();

        System.out.println();

        if(distances.get(destination) == Integer.MAX_VALUE)
        {
            optimizedRoute.setPrize(Integer.MAX_VALUE);
            optimizedRoute.setRoute(new ArrayList<>());
            return optimizedRoute;
        }

        Stack<String> currentLocation = new Stack<>();

        int cost = distances.get(destination);

        currentLocation.add(destination);

        while(!currentLocation.peek().equals(source))
        {
            String currLoc = currentLocation.pop();
            currentLocation.add(previousNodes.get(currLoc));
            path.add(currLoc);
        }



        path.add(source);

        Collections.reverse(path);

        optimizedRoute.setRoute(path);
        optimizedRoute.setPrize(cost);

        return optimizedRoute;

    }

    private static class Node {
        String name;
        int distance;

        Node(String name, int distance) {
            this.name = name;
            this.distance = distance;
        }
    }
}



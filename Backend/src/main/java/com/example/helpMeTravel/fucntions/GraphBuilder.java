package com.example.helpMeTravel.fucntions;

import com.example.helpMeTravel.Entities.LocationObject;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GraphBuilder
{
    public Map<String,Map<String,Integer>>  buildGraph() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<LocationObject>> tr = new TypeReference<List<LocationObject>>() {};
        InputStream inputStream = TypeReference
                .class
                .getResourceAsStream("/dataset.json");

        if(inputStream == null) System.out.println(-1);

        List<LocationObject> locationObjects = mapper.readValue(inputStream,tr);

        for(LocationObject ll : locationObjects)
        {
            System.out.println(ll.toString());
        }

        Map<String,Map<String,Integer>> graph = new HashMap<>();

        for(LocationObject ll : locationObjects)
        {
            if(graph.get(ll.getSource()) == null) {
//                graph.put(ll.getSource(),new HashMap<>(){{put(ll.getDestination(),Integer.parseInt(ll.getCost()));}});
                graph.put(ll.getSource(), new HashMap<>());
            }
            graph.get(ll.getSource()).put(ll.getDestination(),Integer.parseInt(ll.getCost()));
        }

        return graph;
    }



//    public GraphBuilder() throws IOException {
//
//    }
}

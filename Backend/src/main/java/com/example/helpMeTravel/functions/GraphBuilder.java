package com.example.helpMeTravel.functions;

import com.example.helpMeTravel.Entities.TrainEdge;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.DayOfWeek;
import java.util.*;

@Service
public class GraphBuilder {

    @Autowired
    private ObjectMapper mapper;

    public Map<String, List<TrainEdge>> buildGraph(String dayOfWeek) throws IOException {

        // 1. Load train edges from JSON

        TypeReference<List<TrainEdge>> typeRef = new TypeReference<>() {};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/dataset.json");

        if (inputStream == null) {
            throw new IOException("dataset.json not found in resources folder");
        }

        List<TrainEdge> trainEdges = mapper.readValue(inputStream, typeRef);

        //------------Filter trainEdges by dayOfWeek and next day-------------------------

        DayOfWeek current = DayOfWeek.valueOf(dayOfWeek.toUpperCase());
        DayOfWeek next = current.plus(1);

        Map<String, List<TrainEdge>> graph = new HashMap<>();

        for (TrainEdge edge : trainEdges) {
            if (edge.getDayOfOperation().contains(current) || edge.getDayOfOperation().contains(next)) {
                graph.computeIfAbsent(edge.getSource(), k -> new ArrayList<>()).add(edge);
            }
        }

        return graph;
    }
}

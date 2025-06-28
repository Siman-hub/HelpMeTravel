package com.example.helpMeTravel.controllers;

import com.example.helpMeTravel.Entities.OptimizedRouteEntity;
import com.example.helpMeTravel.functions.GraphBuilder;
import com.example.helpMeTravel.services.OptimizedRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class OptimizedRouteController
{
    @Autowired
    private OptimizedRouteService optimizedRouteService;
    @Autowired
    private GraphBuilder graphBuilder;

    @PostMapping("/getRoute")
    public OptimizedRouteEntity getOptimizedRoute(@RequestParam String destination, String source, String dayOfWeek) throws IOException {
        return optimizedRouteService.getOptimizedRoute(destination,source,dayOfWeek);
    }

//    @GetMapping("/")
//    public String test() throws IOException {
//
//        return "success";
//    }
}

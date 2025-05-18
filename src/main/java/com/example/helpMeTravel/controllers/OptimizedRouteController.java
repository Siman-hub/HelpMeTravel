package com.example.helpMeTravel.controllers;

import com.example.helpMeTravel.Entities.OptimizedRouteEntity;
import com.example.helpMeTravel.fucntions.GraphBuilder;
import com.example.helpMeTravel.services.OptimizedRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/getRoute")
    public OptimizedRouteEntity getOptimizedRoute(@RequestParam String destination, String source) throws IOException {
        return optimizedRouteService.getOptimizedRoute(destination,source);
    }

//    @GetMapping("/")
//    public String test() throws IOException {
//
//        return "success";
//    }
}

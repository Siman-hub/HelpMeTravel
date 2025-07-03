package com.example.helpMeTravel;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }
}

//ObjectMapper is Jackson’s main class for converting Java objects to/from JSON
//JavaTimeModule adds support for Java 8+ date/time types like LocalDate, LocalDateTime, etc.
//This configuration file is to add addtional instructions to the already existing ObjectMapper class of Jackson
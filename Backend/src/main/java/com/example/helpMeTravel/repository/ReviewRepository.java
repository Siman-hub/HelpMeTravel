package com.example.helpMeTravel.repository;

import com.example.helpMeTravel.Entities.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, Long> {

}

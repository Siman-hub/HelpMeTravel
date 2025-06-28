package com.example.helpMeTravel.repository;

import com.example.helpMeTravel.Entities.LocationReviewEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<LocationReviewEntity, String> {

}

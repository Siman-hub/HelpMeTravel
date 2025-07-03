package com.example.helpMeTravel.controllers;

import com.example.helpMeTravel.Entities.LocationReviewEntity;
import com.example.helpMeTravel.Entities.Review;
import com.example.helpMeTravel.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class SaveReviewController {
    @Autowired
    private ReviewRepository reviewRepository;


    @PostMapping("/saveReview/{locationId}")
    public LocationReviewEntity saveReview(@PathVariable String locationId, @RequestBody Review review)
    {
        review.setCreatedAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        Optional<LocationReviewEntity> location = reviewRepository.findById(locationId);

        if(location.isEmpty()) location = Optional.of(new LocationReviewEntity(locationId, new ArrayList<>(), 0L));

        LocationReviewEntity locationReviewEntity = location.get();

        review.setId(locationReviewEntity.getNumberOfReviews()+1);

        locationReviewEntity.setNumberOfReviews(locationReviewEntity.getNumberOfReviews()+1);

        locationReviewEntity.getReviews().add(review);

        return reviewRepository.save(locationReviewEntity);
    }

    @GetMapping("/getReviewByLocation/{locationId}")
    public List<Review> getReviewByLocation(@PathVariable String locationId){
        Optional<LocationReviewEntity> location = reviewRepository.findById(locationId);

        if(location.isEmpty()) return new ArrayList<>();

        return location.get().getReviews();

    }



    @DeleteMapping("/deleteReview/{locationId}/{reviewId}")
    public void deleteReview(@PathVariable String locationId, @PathVariable long reviewId) {
        Optional<LocationReviewEntity> locationReviewEntity = reviewRepository.findById(locationId);

        int ind = 0;

        if(locationReviewEntity.isEmpty()) return;

        for(Review review : locationReviewEntity.get().getReviews()){

            if(reviewId == review.getId()) {
                locationReviewEntity.get().getReviews().remove(ind);
                break;
            }

            ind++;
        }

        reviewRepository.save(locationReviewEntity.get());
    }

//    @PutMapping("/modifyReview/{locationId}")
//    public void modifyReview(@RequestBody Review review, @PathVariable String locationId){
//        Optional<LocationReviewEntity> locationReviewEntityOptional = reviewRepository.findById(locationId);
//
//        if(locationReviewEntityOptional.isEmpty()) return;
//
//        Review existingReview = reviewToBeModified.get();
//
//        existingReview.setContent(review.getContent());
//
//        reviewRepository.save(existingReview);
//    }

}

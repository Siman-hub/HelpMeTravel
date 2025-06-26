package com.example.helpMeTravel.controllers;

import com.example.helpMeTravel.Entities.Review;
import com.example.helpMeTravel.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@RestController
public class SaveReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/saveReview")
    public Review saveReview(@RequestBody Review review)
    {
        review.setCreatedAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        return reviewRepository.save(review);
    }

    @DeleteMapping("/deleteReview/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
    }

    @PutMapping("/modifyReview")
    public void modifyReview(@RequestBody Review review){
        Optional<Review> reviewToBeModified = reviewRepository.findById(review.getId());

        if(!reviewToBeModified.isPresent())  return;

        Review existingReview = reviewToBeModified.get();

        existingReview.setContent(review.getContent());

        reviewRepository.save(existingReview);
    }

}

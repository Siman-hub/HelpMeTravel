package com.example.helpMeTravel.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "locationsReview")
public class LocationReviewEntity
{
    @Id
    private String name;

    private List<Review> reviews;

    private Long numberOfReviews;

    public LocationReviewEntity(String name, List<Review> reviews, Long numberOfReviews) {
        this.name = name;
        this.reviews = reviews;
        this.numberOfReviews = numberOfReviews;
    }

    public LocationReviewEntity() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Long getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Long numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }
}

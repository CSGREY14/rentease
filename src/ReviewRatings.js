import React, { useState, useRef } from 'react';
import { Rating, LinearProgress, TextField, Button, IconButton, Avatar } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReviewRatingsComponent = () => {
  const sampleReviews = [
    { rating: 5, comment: 'Amazing place to live, great amenities!', user: 'Alice' },
    { rating: 4, comment: 'Very good society, well-maintained.', user: 'Bob' },
    { rating: 3, comment: 'Decent experience, could improve maintenance.', user: 'Charlie' },
    { rating: 5, comment: 'Loved the environment and facilities!', user: 'David' },
  ];

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviews, setReviews] = useState(sampleReviews);
  const reviewsContainerRef = useRef(null);

  const handleRatingChange = (event, newValue) => {
    setNewRating(newValue);
  };

  const handlePostComment = () => {
    if (newRating && newComment) {
      const newReview = {
        rating: newRating,
        comment: newComment,
        user: 'You',
      };
      setReviews([newReview, ...reviews]);
      setNewRating(0);
      setNewComment('');
    }
  };

  const handleScrollLeft = () => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((review) => review.rating === star).length
  );

  const totalReviews = reviews.length;

  // Define rating text based on average rating
  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.0) return 'Good';
    if (rating >= 2.0) return 'Fair';
    return 'Poor';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h3>Ratings and Reviews</h3>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>{averageRating}/5</h2>
        <Rating name="average-rating" value={Number(averageRating)} precision={0.1} readOnly />
        <p>{getRatingText(Number(averageRating))}</p>
        <p>({totalReviews} total reviews)</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div
            key={star}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
          >
            <StarIcon style={{ color: '#FFD700', marginRight: '5px' }} />
            <span>{star} star</span>
            <LinearProgress
              variant="determinate"
              value={(ratingCounts[index] / totalReviews) * 100}
              style={{ flex: 1, margin: '0 10px', height: '10px' }}
            />
            <span>{ratingCounts[index]}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton onClick={handleScrollLeft} style={{ flex: 'none', width: 'auto' }}>
          <ArrowBackIosIcon />
        </IconButton>
        <div
          ref={reviewsContainerRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            width: '80%',
            gap: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            scrollBehavior: 'smooth',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 auto',
                minWidth: '250px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Rating value={review.rating} precision={1} readOnly />
              <p>"{review.comment}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                <p>{review.user}</p>
              </div>
            </div>
          ))}
        </div>
        <IconButton onClick={handleScrollRight} style={{ flex: 'none', width: 'auto' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      <h4>Leave a Comment:</h4>
      <div style={{ marginTop: '10px' }}>
        <Rating
          name="user-rating"
          value={newRating}
          size="large"
          onChange={handleRatingChange}
        />
        <TextField
          label="Your Comment"
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
          style={{ margin: '10px 0' }}
        />
        <Button variant="contained" onClick={handlePostComment}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default ReviewRatingsComponent;

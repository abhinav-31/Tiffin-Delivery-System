// import React, { useState } from 'react';
// import { addCustomerReview } from './services/vendor_api' // Assuming you add the API function in vendor_api.jsx
// import './CustomerFeedback.css';

// const CustomerFeedback = () => {
//   const [comment, setComment] = useState('');
//   const [rating, setRating] = useState(0);
//   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const reviewData = { comment, rating };
//       await addCustomerReview(reviewData);
//       setFeedbackSubmitted(true);
//       setComment('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h2>Customer Feedback</h2>
//       {feedbackSubmitted ? (
//         <div className="feedback-success">
//           Thank you for your feedback!
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="feedback-form">
//           <div className="form-group">
//             <label htmlFor="comment">Comment:</label>
//             <textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="rating">Rating:</label>
//             <select
//               id="rating"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//               required
//             >
//               <option value="">Select a rating</option>
//               {[1, 2, 3, 4, 5].map((rate) => (
//                 <option key={rate} value={rate}>
//                   {rate} Star{rate > 1 ? 's' : ''}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="submit-btn">Submit Feedback</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CustomerFeedback;
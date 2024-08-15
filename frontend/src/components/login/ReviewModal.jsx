
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// function ReviewModal({ isOpen, onClose, onSubmit, orderId }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(1); // Default rating

//   const handleSubmit = () => {
//     onSubmit({ orderId, comment, rating });
//     setComment(""); // Clear the comment input
//     setRating(1); // Reset rating to default
//     onClose(); // Close the modal
//   };

//   return (
//     <Modal
//       show={isOpen}
//       onHide={onClose}
//       dialogClassName="review-modal"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Submit Review</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formComment">
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter your comment here"
//             />
//           </Form.Group>
//           <Form.Group controlId="formRating">
//             <Form.Label>Rating</Form.Label>
//             <Form.Control
//               as="select"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//             >
//               {[1, 2, 3, 4, 5].map((rate) => (
//                 <option key={rate} value={rate}>
//                   {rate}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ReviewModal;
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// function ReviewModal({ isOpen, onClose, onSubmit, orderId }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(1); // Default rating

//   const handleSubmit = () => {
//     onSubmit({ orderId, comment, rating });
//     setComment(""); // Clear the comment input
//     setRating(1); // Reset rating to default
//     onClose(); // Close the modal
//   };

//   const getTooltipText = (value) => {
//     switch (value) {
//       case 1:
//         return 'Very Bad';
//       case 2:
//         return 'Bad';
//       case 3:
//         return 'Meh';
//       case 4:
//         return 'Good';
//       case 5:
//         return 'Very Good';
//       default:
//         return '';
//     }
//   };

//   // Render rating stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`star ${rating >= i ? 'filled' : ''}`}
//           onClick={() => setRating(i)}
//           data-tooltip={getTooltipText(i)}
//         >
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <Modal
//       show={isOpen}
//       onHide={onClose}
//       dialogClassName="review-modal"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Submit Review</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formComment">
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter your comment here"
//             />
//           </Form.Group>
//           <Form.Group controlId="formRating">
//             <Form.Label>Rating</Form.Label>
//             <div className="rating-stars">
//               {renderStars()}
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ReviewModal;
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// function ReviewModal({ isOpen, onClose, onSubmit, orderId }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(1); // Default rating

//   const handleSubmit = () => {
//     onSubmit({ orderId, comment, rating });
//     setComment(""); // Clear the comment input
//     setRating(1); // Reset rating to default
//     onClose(); // Close the modal
//   };

//   const getTooltipText = (value) => {
//     switch (value) {
//       case 1:
//         return 'Very Bad';
//       case 2:
//         return 'Bad';
//       case 3:
//         return 'Meh';
//       case 4:
//         return 'Good';
//       case 5:
//         return 'Very Good';
//       default:
//         return '';
//     }
//   };

//   // Render rating stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`star ${rating >= i ? 'filled' : ''}`}
//           onClick={() => setRating(i)}
//           data-tooltip={getTooltipText(i)}
//           role="button"  // Ensures that the star is recognized as a clickable element
//           tabIndex={0}    // Makes it accessible for keyboard navigation
//           aria-label={`${i} Star`}
//         >
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <Modal
//       show={isOpen}
//       onHide={onClose}
//       dialogClassName="review-modal"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Submit Review</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formComment">
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter your comment here"
//             />
//           </Form.Group>
//           <Form.Group controlId="formRating">
//             <Form.Label>Rating</Form.Label>
//             <div className="rating-stars">
//               {renderStars()}
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ReviewModal;
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './ReviewModal.css';  // Make sure to import your CSS file

function ReviewModal({ isOpen, onClose, onSubmit, orderId }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1); // Default rating

  const handleSubmit = () => {
    onSubmit({ orderId, comment, rating });
    setComment(""); // Clear the comment input
    setRating(1); // Reset rating to default
    onClose(); // Close the modal
  };

  const getTooltipText = (value) => {
    switch (value) {
      case 1:
        return 'Very Bad';
      case 2:
        return 'Bad';
      case 3:
        return 'Meh';
      case 4:
        return 'Good';
      case 5:
        return 'Very Good';
      default:
        return '';
    }
  };

  // Render rating stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${rating >= i ? 'filled' : ''}`}
          onClick={() => setRating(i)}
          data-tooltip={getTooltipText(i)}
          role="button"  // Ensures that the star is recognized as a clickable element
          tabIndex={0}    // Makes it accessible for keyboard navigation
          aria-label={`${i} Star`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      dialogClassName="review-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Submit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here"
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <div className="rating-stars">
              {renderStars()}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;

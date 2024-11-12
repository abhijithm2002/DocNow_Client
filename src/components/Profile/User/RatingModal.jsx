import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@nextui-org/react";
import { postRating } from '../../../services/User/userService'
import toast from "react-hot-toast";

export default function RatingModal({ booking, onClose, isOpen }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
    console.log('bookingin rating modal', booking?.doctorId?._id)
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };
 
  const handleSubmit = async() => {
    
        try {
            const data = {
                patientId : booking?.patientId,
                doctorId: booking?.doctorId?._id,
                rating: rating
            }

            const response = await postRating(data)
            if(response.status === 200) {
                toast.success('Rating is submitted')
                setRating(0)
                onClose();
            } else {
                toast.error('something went wrong haiii')
            }
        } catch (error) {
            console.log('an error occured', error)
            toast.error("helloooo");
        }
    
    }

  if (!isOpen || !booking) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Rate Your Experience</h2>
        <p className="text-sm text-gray-600 mt-1">
          How would you rate your experience with Dr. {booking?.doctorId?.name}?
          Your feedback helps us improve!
        </p>

        <div className="flex justify-center space-x-2 my-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              className="focus:outline-none"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRatingClick(star)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </motion.button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          color={rating > 0 ? "primary" : "default"}
          disabled={rating === 0}
        >
          Submit Rating
        </Button>
      </div>
    </div>
  );
}

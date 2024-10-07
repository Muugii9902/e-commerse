import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  onRatingSelect: (rating: number) => void; // Үнэлгээ сонгох үед эцэг компонент руу өгөгдөл дамжуулах
}

const Rating = ({ onRatingSelect }: RatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (starRating: number) => {
    setRating(starRating);
    onRatingSelect(starRating);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <FaStar
            key={index}
            size={30}
            className={`cursor-pointer transition duration-200 ${
              starRating <= (hover || rating)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => setHover(starRating)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
      <p className="ml-2">Таны үнэлгээ: {rating}</p>
    </div>
  );
};

export default Rating;

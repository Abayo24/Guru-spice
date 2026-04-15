import { Star } from "lucide-react";
import { cn } from "@/utils";

interface StarsProps {
  rating: number;
  size?:  number;
  className?: string;
}

export function Stars({ rating, size = 11, className }: StarsProps) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          color="#E5B03A"
          fill={i <= Math.round(rating) ? "#E5B03A" : "none"}
        />
      ))}
    </div>
  );
}

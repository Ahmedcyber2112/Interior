"use client";
import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gray-100 px-4 h-fit py-2 rounded-lg flex w-fit items-center gap-2 text-gray-700 font-semibold">
      <span className="text-lg">{timeLeft.days}</span> Days
      <span className="text-lg"> {String(timeLeft.hours).padStart(2, "0")} </span> :
      <span className="text-lg"> {String(timeLeft.minutes).padStart(2, "0")} </span> :
      <span className="text-lg"> {String(timeLeft.seconds).padStart(2, "0")} </span>
    </div>
  );
};

export default Countdown;

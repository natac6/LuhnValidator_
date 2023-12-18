import React, { useState, useEffect } from "react";

const LuhnValidator = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const isValidCard = validCard(cardNumber);
    setIsValid(isValidCard);
  }, [cardNumber]);

  const handleChange = (e) => {
    setCardNumber(e.target.value.replace(/\s/g, ""));
  };

  const validCard = (num) => {
    if (!num || typeof num !== "number") return false;

    const numStr = num.toString();
    const reversedDigits = numStr.split("").reverse().map(Number);

    const doubledDigits = reversedDigits.map((digit, index) => {
      return index % 2 === 1 ? digit * 2 : digit;
    });

    const summedDigits = doubledDigits.map((digit) => (digit > 9 ? digit - 9 : digit));

    const total = summedDigits.reduce((acc, curr) => acc + curr, 0);

    return total % 10 === 0;
  };

  return (
    <div>
      <label>
        Enter Credit Card Number:
        <input type="text" value={cardNumber} onChange={handleChange} />
      </label>
      {isValid !== null && (
        <div>
          {isValid ? <p>Valid Card Number</p> : <p>Invalid Card Number</p>}
        </div>
      )}
    </div>
  );
};

export default LuhnValidator;

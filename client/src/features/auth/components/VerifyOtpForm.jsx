import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const VerifyOtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const location = useLocation()
  useEffect(() => {
    inputsRef[0].current.focus();
    console.log(location)
  }, []);

  function handleInputChange(e, index) {
    const value = e.target.value;
    if (!Number(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < inputsRef.length - 1) {
      inputsRef[index + 1].current.focus();
    }
  }

  function handleBackspace(e, index) {
    if (e.keyCode === 8) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputsRef[index - 1].current.focus();
      }
    }
  }

  function handleOnPaste(e) {
    const pasteValue = e.clipboardData.getData('text');
    if (!Number(pasteValue || pasteValue.length !== otp.length)) {
      return;
    }

    const putOtp = pasteValue.split('');
    setOtp(putOtp);
    inputsRef[5].current.focus();
  }

  return (
    <form className='grid gap-1'>
      <div className="grid grid-cols-6 gap-3">
        {otp.map((digit, ind) => (
          <input
            key={ind}
            type="tel"
            className="text-center"
            maxLength={1}
            ref={inputsRef[ind]}
            value={digit}
            onChange={(e) => handleInputChange(e, ind)}
            onKeyDown={(e) => handleBackspace(e, ind)}
            onPaste={(e) => handleOnPaste(e)}
          />
        ))}
      </div>
      <p className='input-err'></p>
      <button type="submit" className='primary-btn'>Verify</button>
    </form>
  );
};

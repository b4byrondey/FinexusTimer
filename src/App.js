import React, {useState, useEffect, useRef} from 'react';

export default function App(){
  const [seconds,setSeconds] = useState("00");
  const [minutes,setMinutes] = useState("05");
  const [isResend,setIsResend] = useState(false);
  const [isMainTimerUsed,setIsMainTimerUsed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);

  //Adjust the delay here
  useInterval(counter, isMainTimerUsed ? null : 50);

  function counter(){
    setIsResend(false)
    var min = Math.floor(secondsLeft / 60);
    var sec = secondsLeft - (min * 60);
    
    setMinutes(min);
    setSeconds(sec);

      if (sec < 10) {
       setSeconds( "0" + sec)
      }
      if (min < 10) {
      setMinutes("0" + min)
      }
    //Enable the button when the timer reaches 2 minute  
    if (min < 2 & sec >= 0 ) {
        setIsResend(true)
    }
 
     if (min === 0 & sec === 0 ) {
       setIsMainTimerUsed(true)
     }
     setSecondsLeft(secondsLeft - 1);
}

function restartCountDown() {
  setIsMainTimerUsed(false);
  setMinutes("05");
  setSeconds("00");
  setSecondsLeft("300");
  setIsResend(false);
}

//custom hook by https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
  
  return (
    <div style={{textAlign: 'center'}}>
      <label>Your OTP is expiring in <span style={{fontWeight: 'bold'}}>{minutes}:{seconds}</span></label>
    <br />
      <button disabled={!isResend} onClick={restartCountDown}>Resend OTP</button>
    </div>
  )
}
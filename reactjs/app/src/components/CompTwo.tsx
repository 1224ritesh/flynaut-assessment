import React from "react";
import style from "./commonStyle.module.css";

// This component is used to demonstrate the use of useScroll hook
// It will display a message based on the value of the name prop
// If name is passed, it will display a message with the name
// If name is not passed, it will display a message with 'Guest'
interface myProps {
  name: string;
  scroller: Function;
}
const CompTwo = (props: myProps) => {
  const message = props.name ? `Hellow ${props.name}` : `Welcome Guest`;

  return (
    <div className={style.compTwoContainer}>
      <h2>Component Two</h2>
      <h2>{message}</h2>
      <button onClick={() => props.scroller()} className={style.button}>
        Scroll to Next Component
      </button>
    </div>
  );
};

export default React.memo(CompTwo);

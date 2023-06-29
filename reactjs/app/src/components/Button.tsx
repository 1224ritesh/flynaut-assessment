import React, { MouseEventHandler } from "react";
import style from "./commonStyle.module.css";

// this is a button component. This component is responsible for rendering a button and handling the click event on it.
interface myProp {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  children: string;
}
const Button = (props: myProp) => {
  console.log("rendering button");

  return (
    <button className={style.button} onClick={props.clickHandler}>
      {props.children}
    </button>
  );
};

export default React.memo(Button);

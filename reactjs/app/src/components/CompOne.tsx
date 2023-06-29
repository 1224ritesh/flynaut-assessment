/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import style from "./commonStyle.module.css";
import Button from "./Button";

interface myProp {
  passingHandler: Function;
}

const CompOne = (props: myProp) => {
  const [count, setCount] = useState(0);
  const [inpValue, setInpValue] = useState("");
  var interv: any = null;

  //
  useEffect(() => {
    interv = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // replicat componentWillUnmount
    return () => {
      clearInterval(interv);
    };
  }, []);

  // use callback is used here to cached the function when there is no change in
  // 'inpValue' the function will not re-initialize hence preventing 'Button'
  // component from re-rendering as its props doesnt change.
  const myBtnClick = useCallback(() => {
    props.passingHandler(inpValue);
  }, [inpValue]);

  return (
    <div className={style.compOneContainer}>
      <h1>Timer : {count}</h1>
      <label htmlFor="inp">Enter Name</label>

      <input
        id="inp"
        type="text"
        placeholder="XYZ"
        className={style.compOneInput}
        value={inpValue}
        onChange={(e) => setInpValue(e.target.value)}
      />

      <Button clickHandler={myBtnClick}>
        Click here to pass name to the second component
      </Button>
    </div>
  );
};

export default React.memo(CompOne);

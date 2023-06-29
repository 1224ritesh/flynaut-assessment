import React from "react";
import ReactDom from "react-dom";
import styles from "./loader.module.css";

// forwarding ref to select the current div element inside parent component
const Loader = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  //it will attach the html to a different root called 'modal-root'
  // which prevents it from accidently obtaining any styling of the default 'app' root
  return ReactDom.createPortal(
    <div className={styles.container} ref={ref}>
      <p className={styles.text}>Loading...</p>
    </div>,
    document.getElementById("modal-root")!
  );
});

export default Loader;

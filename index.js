import React, { forwardRef, useLayoutEffect, useState } from "react";
import "./typer.css";

let index = 0;

const LOOP_TYPES = {
  START: "start",
  REVERSE: "reverse",
};

/**
 * @param {Object} props
 * @param {string} props.value The value to be typed with effect
 * @param {number} props.speed The speed of the effect in milliseconds
 * @param {React.Component} props.Wrapper The wrapper component to be used
 * @param {React.RefObject} ref The ref to be used by the component
 * @example 
 *    <Typer
        value="Hi I'm Musa. I'm a software engineer. I love to code."
        speed="100"
        Wrapper={Wrapper}
      />
 */
const Typer = forwardRef((props, ref) => {
  const { value, speed, Wrapper, ...rest } = props;

  const [mode, setMode] = useState(() => LOOP_TYPES.START);
  const [innerHTML, setInnerHTML] = useState("");

  useLayoutEffect(() => {
    if (mode === LOOP_TYPES.START) {
      setTimeout(() => {
        if (index === value.length) {
          setMode(LOOP_TYPES.REVERSE);
          return;
        }
        setInnerHTML(innerHTML + value[index]);
        index++;
      }, speed);
    } else if (mode === LOOP_TYPES.REVERSE)
      setTimeout(() => {
        setInnerHTML((prev) => prev.slice(0, index));
        if (index === 0) {
          index === 0 && setMode(LOOP_TYPES.START);
          return;
        }
        index = index - 1;
      }, speed);
  }, [mode, innerHTML]);

  const WrapperComponent = Wrapper || React.Fragment;
  return (
    <WrapperComponent ref={ref} {...rest}>
      {innerHTML}
      <span className={`${"react-typer-blink"}`}> |</span>
    </WrapperComponent>
  );
});

/**
 * @param {Object} props
 * @param {string} props.value The value to be typed with effect
 * @param {number} props.speed The speed of the effect in milliseconds
 * @param {React.Component} props.Wrapper The wrapper component to be used
 * @param {React.RefObject} ref The ref to be used by the component
 * @example 
 *    <Typer
        value="Hi I'm Musa. I'm a software engineer. I love to code."
        speed="100"
        Wrapper={Wrapper}
      />
 */
export default Typer;

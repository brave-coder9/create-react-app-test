import React, { useRef, useEffect } from "react";

const RefTest = () => {
  const r = useRef({ val: 100 });

  useEffect(() => {
    r.current.val++;
    console.log(r.current.val); // This will log 124 after the component mounts
  }, [r.current]);

  return <div>Value: {r.current.val}</div>;
};

export default RefTest;

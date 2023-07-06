import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1,
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const blurValue = 20 - loadingProgress / 5;

  return (
    <div
      className="loaderbody"
      style={{ backdropFilter: `blur(${blurValue}px)` }}
    >
      <div className="ldr-holder">
        <div className="loader ldr-1">
          <div id="div1">
            <div id="div2">
              <div id="div3">
                <div id="div4">
                  <div id="div5">
                    <div id="div6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

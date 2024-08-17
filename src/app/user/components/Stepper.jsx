import React, { useEffect, useRef, useState } from 'react';

function CheckoutStepper({ stepsConfig = [], currentStep, setCurrentStep }) {
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    if (stepRef.current.length > 0) {
      setMargins({
        marginLeft: stepRef.current[0]?.offsetWidth / 2,
        marginRight: stepRef.current[stepsConfig.length - 1]?.offsetWidth / 2,
      });
    }
  }, [stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBar = () => {
    if (stepsConfig.length > 1) {
      return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
    }
    return 0;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="w-[90%] relative flex justify-between items-center mb-[20px]">
        {stepsConfig.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => (stepRef.current[index] = el)}
            className={`step flex flex-col items-center relative ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
            <div className="step-number w-[30px] h-[30px] bg-default-200 rounded-[50%] flex justify-center items-center z-10">
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name text-lg">{step.name}</div>
          </div>
        ))}
        <div
          className="absolute h-[6px] bg-default-200 top-1/4 left-0"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div className="h-full bg-light-green transition-all duration-300" style={{ width: `${calculateProgressBar()}%` }}></div>
        </div>
      </div>
      <ActiveComponent />
    </>
  );
}

export default CheckoutStepper;

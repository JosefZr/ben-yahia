import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import Stars from "./Stars";

export default function Review() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const starSize = width <= 440 ? 15 : 30;

  return (
    <Card className="max-w-[500px] max-sm:mx-5 max-md:mx-auto my-10 mx-5 pb-5 pt-4 px-5 max-lg:md:px-2" shadow="md" isPressable="true" isHoverable="true">
      <CardHeader className="max-[350px]:px-0 px-3 py-0 text-small text-default-400 flex flex-col items-start">
        <h1 className="text-default-700">
          <p className="font-bold text-9xl text-primary-100 h-20 w-10 max-lg:text-8xl max-lg:h-14">❝</p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure! Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </h1>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between ">
          <div className="flex flex-row gap-4 items-start justify-center">
            <Avatar isBordered radius="full" size={`${width==="350px"?"lg":"md"}`} src="https://nextui.org/avatars/avatar-1.png" />
            <div className="flex flex-col items-start gap-1">
              <h4 className="text-2xl font-semibold leading-none text-default-800 max-lg:text-lg max-[350px]:text-sm">Zoey Lang</h4>
              <h5 className="text-small tracking-tight text-default-400 max-[350px]:text-xs">August 1, 2021</h5>
            </div>
          </div>
          <div className="flex items-end">
            <Stars size={starSize} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

import React from "react";
import { EqualApproximatelyIcon, CheckCircle, Headphones } from "lucide-react";
const SubscribtionProperties = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 mt-28 grid-cols-1">
      <div className="flex items-center flex-col gap-4">
        <EqualApproximatelyIcon className="h-14 w-14" />
        <div className="text-center">
          {" "}
          <h4 className="text-lg text-slate-900 font-semibold">
            Easy Exchange Policy
          </h4>{" "}
          <p className="text-gray-400">We offer hassle free exchange policy</p>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4">
        <CheckCircle className="h-14 w-14" />
        <div className="text-center">
          {" "}
          <h4 className="text-lg text-slate-900 font-semibold">
            7 Days Return Policy
          </h4>{" "}
          <p className="text-gray-400">We provide 7 days free return policy</p>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4">
        <Headphones className="h-14 w-14" />
        <div className="text-center">
          {" "}
          <h4 className="text-lg text-slate-900 font-semibold">
            Best customer support
          </h4>{" "}
          <p className="text-gray-400">we provide 24/7 customer support</p>
        </div>
      </div>
    </div>
  );
};

export default SubscribtionProperties;

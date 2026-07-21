import React from "react";
import Hero from "../components/Hero";
import ItemsDisplay from "../components/ItemsDisplay";
import Subscribtion from "../components/Subscribtion";
import SubscribtionProperties from "../components/SubscribtionProperties";
const Home = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Hero />
      <ItemsDisplay
        header1="LATEST "
        header2="COLLECTIONS "
        isBestSeller={false}
        count={8}
        inRow={5}
      />
      <ItemsDisplay
        header1="BEST  "
        header2="SELLERS "
        isBestSeller={true}
        count={4}
        inRow={5}
      />
      <SubscribtionProperties />
      <Subscribtion />
    </div>
  );
};

export default Home;

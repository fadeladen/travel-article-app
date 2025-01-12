import { memo } from "react";
import { Button } from "../../../components/ui";
import HeroImage from "../../../assets/images/home.png"; // Import the image

const Hero = ({ scrollToArticles }: { scrollToArticles: () => void }) => {
  return (
    <div className="pt-6 pb-20 flex flex-col sm:flex-row gap-5 items-center">
      <div className="flex justify-center items-center flex-1">
        <img
          className="h-[24rem] w-auto object-cover"
          src={HeroImage}
        />
      </div>
      <div className="flex-1 flex flex-col gap-3 justify-center sm:justify-start text-center sm:text-left">
        <h1 className="text-3xl font-bold">Travel Article App</h1>
        <p className="text-sm text-slate-500 w-full sm:w-10/12">
          Learn about the latest travel innovations and how they're changing the
          way we explore the world and find tips, guides, and expert advice to
          plan your dream vacation with ease.
        </p>
        <Button
          onClick={scrollToArticles}
          classname="!w-[200px] mx-auto sm:mx-0"
        >
          Explore now
        </Button>
      </div>
    </div>
  );
};

export default memo(Hero);

import HeroImage from "../assets/hero_img.png";

const Hero = () => {
  return (
    <section className=" mx-auto border flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-20 px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-12 h-[2px] bg-black"></span>
            <p className="uppercase tracking-wide text-gray-700 font-medium">
              Our Bestsellers
            </p>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-gray-700 my-6">
            Latest Arrivals
          </h1>

          <button className="flex items-center gap-3 uppercase font-medium tracking-wide group">
            Shop Now
            <span className="w-12 h-[2px] bg-black transition-all group-hover:w-16"></span>
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2">
        <img
          src={HeroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;

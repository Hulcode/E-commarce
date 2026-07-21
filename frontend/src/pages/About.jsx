import AboutImage from "../assets/about_img.png";

const About = () => {
  return (
    <section className="max-w-5xl mx-auto  py-16">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-2xl text-gray-500 font-light">
          ABOUT <span className="font-semibold text-black">US</span>
          <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
        </h1>
      </div>

      {/* About */}
      <div className="flex flex-col lg:flex-row gap-14 items-center">
        <div className="lg:w-1/2">
          <img src={AboutImage} alt="About" className="w-full object-cover" />
        </div>

        <div className="lg:w-1/2 text-gray-600 space-y-8 leading-8">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <div>
            <h3 className="font-semibold text-black text-xl mb-3">
              Our Mission
            </h3>

            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-24">
        <h2 className="text-xl font-light mb-10">
          WHY <span className="font-semibold">CHOOSE US</span>
          <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
        </h2>

        <div className="grid md:grid-cols-3 border">
          <div className="border-r border-b md:border-b-0 p-10">
            <h3 className="font-semibold mb-5">Quality Assurance:</h3>

            <p className="text-gray-600 leading-7">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>

          <div className="border-r border-b md:border-b-0 p-10">
            <h3 className="font-semibold mb-5">Convenience:</h3>

            <p className="text-gray-600 leading-7">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>

          <div className="p-10">
            <h3 className="font-semibold mb-5">
              Exceptional Customer Service:
            </h3>

            <p className="text-gray-600 leading-7">
              Our team of dedicated professionals is here to assist you every
              step of the way, ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

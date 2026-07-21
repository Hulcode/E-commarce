const Subscribtion = () => {
  return (
    <section className="max-w-7xl mx-auto py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Subscribe now & get 20% off
        </h2>

        <p className="mt-5 text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <form className="mt-10 flex flex-col sm:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 h-14 border border-gray-300 px-5 outline-none"
          />

          <button
            type="submit"
            className="w-full sm:w-48 h-14 bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribtion;

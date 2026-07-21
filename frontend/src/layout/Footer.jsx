import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-0 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Left */}
        <div className="lg:col-span-2">
          <img src={Logo} alt="Forever" className="w-44 mb-8" />

          <p className="max-w-md text-gray-600 text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold mb-8">COMPANY</h3>

          <ul className="space-y-2 text-gray-600">
            <li className="cursor-pointer hover:text-black transition">Home</li>
            <li className="cursor-pointer hover:text-black transition">
              About us
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Delivery
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Privacy policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-8">GET IN TOUCH</h3>

          <div className="space-y-2 text-gray-600">
            <p>+1-212-456-7890</p>
            <p>contact@foreveryou.com</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t mt-16 pt-8 text-center text-gray-700">
        Copyright 2026 © forever.com - All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;

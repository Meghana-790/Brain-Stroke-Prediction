import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-600 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">NeuroPulse</h3>
            <p className="text-teal-100 leading-relaxed">
              Advanced brain stroke prediction tool using AI and machine learning to help prevent and detect strokes early. Empowering health through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/info" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Info
                </Link>
              </li>
              <li>
                <Link to="/predict" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Predict
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-teal-100 hover:text-white transition-colors duration-300">
                  Chatbot
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-teal-100">
              <li>
                <span className="block">Email: support@neuropulse.com</span>
              </li>
              <li>
                <span className="block">Phone: +91 9182379029</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-500 mt-8 pt-4 text-center">
          <p className="text-teal-100">
            &copy; {currentYear} NeuroPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

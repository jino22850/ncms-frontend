import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* About System Section */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">About This System</h1>
      <p className="text-gray-600">
        This system is designed to manage correspondent details, coverage reports, and payment processing with a simple, efficient interface. It helps track coverage details, associate payments, and generate reports for easier management.
      </p>

      {/* System Features Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">System Features</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Track and manage correspondent details</li>
          <li>View and manage coverage reports</li>
          <li>Associate payments with coverage reports</li>
          <li>Generate reports for coverage and payment status</li>
          <li>User-friendly admin panel with authentication</li>
          <li>Secure password management with encryption</li>
          <li>Easy to use interface with a clean and responsive design</li>
        </ul>
      </div>

      {/* Developer Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Developer</h2>
        <p className="text-gray-600">👨‍💻 Developed by: <span className="font-medium">R.M.J.N.Rajapaksha</span></p>
      </div>

      {/* Technologies Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Technologies Used</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Frontend: React.js, Tailwind CSS</li>
          <li>Backend: Node.js, Express.js</li>
          <li>Database: MongoDB</li>
          <li>Authentication: JWT & Bcrypt</li>
          <li>Testing: Postman</li>
        </ul>
      </div>

      {/* Additional Information Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Additional Information</h2>
        <p className="text-gray-600">
          This system is designed to streamline the workflow between correspondents, reporters, and payment processing in the organization. The system helps in managing reports, keeping track of payments, and generating various types of coverage and payment-related reports. It is ideal for news agencies, media organizations, and similar industries.
        </p>
      </div>
    </div>
  );
};

export default About;


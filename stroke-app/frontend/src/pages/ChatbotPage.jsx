import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-white text-gray-800 flex flex-col">
      <Navbar />

      {/* Centered professional chat widget */}
      <div className="flex-grow flex items-center justify-center pt-16 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-teal-600 text-white py-3 px-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">NeuroCare</h2>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div> {/* Status indicator */}
          </div>

          {/* Optional description */}
          <div className="p-3 text-center text-gray-700 text-sm">
            Ask me anything about brain stroke prediction and related health topics.
          </div>

          {/* Chat iframe */}
          <div className="flex-grow h-[400px]">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/k8M1U1zDm_HdU__OkTPPT"
              title="NeuroCare Chatbot"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ borderRadius: '0 0 16px 16px' }}
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

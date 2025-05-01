'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Inquiry',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', type: 'Inquiry', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    description: 'Get in touch with us for inquiries, support, or feedback. Were here to help!',
    url: 'https://Whowe.io/contact',
  };

  return (
    <>
      <Head>
        <title>Contact Us | Your Brand</title>
        <meta
          name="description"
          content="Reach out to us via our contact form for support, inquiries, or feedback. We're here to help you!"
        />
        <meta
          name="keywords"
          content="contact, support, customer service, inquiries, feedback"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/contact" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <style>{`
          select option {
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            padding: 8px;
          }
          select option:hover {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          select.custom-select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23C6E1E7' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
            background-position: right 0.75rem center;
            background-size: 1.5rem;
            background-repeat: no-repeat;
          }
        `}</style>
      </Head>

      <main className="max-h-screen bg-var(--foreground) flex items-center justify-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <section
            className="text-center mb-8"
            aria-labelledby="contact-heading"
          >
            <h1
              id="contact-heading"
              className="text-4xl font-bold text-white mb-4"
            >
              {structuredData.name}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              {structuredData.description}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/6 p-6 rounded-sm shadow-lg"
              aria-label="Contact form"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#C6E1E7] transition-colors duration-300 rounded-sm hover:bg-white/6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#C6E1E7] hover:bg-white/6 rounded-sm transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="custom-select w-full px-4 py-2 border border-[#C6E1E7]/30 rounded-sm bg-white/15 backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-white/20 transition-all duration-200 cursor-pointer appearance-none shadow-inner"
                >
                  <option value="Support">Support</option>
                  <option value="Inquiry">Inquiry</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-[#C6E1E7] rounded-sm hover:bg-white/6 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white/6 text-white py-2 px-4 rounded-md hover:bg-white/12 transition-all duration-300 cursor-pointer active:scale-95"
              >
                Send Message
              </button>

              {status && (
                <p
                  className={`mt-4 text-sm ${
                    status.includes('Error') ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {status}
                </p>
              )}
            </form>

            {/* Contact Information */}
            <div className="bg-white/6 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Get in Touch
              </h2>
              <div className="space-y-3">
                <p className="text-white">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:support@yourdomain.com"
                    className="fill-[#C6E1E7] hover:underline"
                  >
                    support@yourdomain.com
                  </a>
                </p>
                <p className="text-white">
                  <strong>Phone:</strong>{' '}
                  <a
                    href="tel:+1234567890"
                    className="fill-[#C6E1E7] hover:underline"
                  >
                    +1 (636) 793-2071
                  </a>
                </p>
                <p className="text-white">
                  <strong>Address:</strong> Fenton, MO 63026
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  Follow Us
                </h3>
                <div className="flex items-center justify-left space-x-4">
                  <Link
                    href="https://twitter.com/whowe"
                    aria-label="Follow us on Twitter"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-[#C6E1E7] hover:fill-white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://linkedin.com/company/whowe"
                    aria-label="Follow us on LinkedIn"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-[#C6E1E7] hover:fill-white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.852 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.048c.476-.9 1.636-1.852 3.365-1.852 3.6 0 4.269 2.368 4.269 5.455v6.288zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com/whowe"
                    aria-label="Follow us on Facebook"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 fill-[#C6E1E7] hover:fill-white">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V15.65H7.904v-2.572h2.601V10.94c0-2.562 1.558-3.968 3.83-3.968 1.088 0 2.025.081 2.296.117v2.66h-1.576c-1.236 0-1.475.588-1.475 1.452v1.903h2.945l-.384 2.572h-2.561v6.225C18.307 21.153 22 17.013 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
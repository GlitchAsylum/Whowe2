import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var{--background}]">
      <Head>
        <title>Privacy Policy | Whowe</title>
        <meta name="description" content="Privacy Policy for Whowe, a social media platform" />
      </Head>

      <header className="">
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white/6 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-200">
                  Welcome to Whowe, a social history platform designed to capture and share your story. We are committed to protecting your privacy and ensuring transparency about how your personal information is handled. This Privacy Policy explains how we collect, use, share, and protect your data when you use Whowe.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p className="text-gray-200 mb-2">
                  We collect information to provide and improve our social history services. The types of information we collect include:
                </p>
                <ul className="list-disc pl-5 text-gray-200">
                  <li><strong>Account Information:</strong> Name, username, email address, phone number, and profile details you provide.</li>
                  <li><strong>User-Generated Content:</strong> Posts, comments, messages, photos, videos, and other content you share on Whowe.</li>
                  <li><strong>Social Interactions:</strong> Information about your connections, follows, likes, and other interactions with users.</li>
                  <li><strong>Usage Data:</strong> Details about how you use our platform, such as pages visited, features used, and time spent on the app.</li>
                  <li><strong>Device and Location Information:</strong> IP address, device type, browser, operating system, and, if enabled, location data.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-200">
                  We use your information to deliver a personalized and engaging social media experience. Specifically, we use it to:
                </p>
                <ul className="list-disc pl-5 text-gray-200">
                  <li>Facilitate account creation, authentication, and profile customization.</li>
                  <li>Display your posts and content to other users based on your privacy settings.</li>
                  <li>Recommend connections, content, and features tailored to your interests.</li>
                  <li>Enable communication through messages, comments, and other interactions.</li>
                  <li>Analyze usage trends to improve our platform’s functionality and user experience.</li>
                  <li>Detect and prevent fraudulent or unauthorized activity.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing Your Information</h2>
                <p className="text-gray-200">
                  Your information may be shared in the following ways:
                </p>
                <ul className="list-disc pl-5 text-gray-200">
                  <li><strong>With Other Users:</strong> Content you post, such as photos or comments, may be visible to other users depending on your privacy settings.</li>
                  <li><strong>With Your Consent:</strong> We may share information when you explicitly allow it, such as integrating with third-party apps.</li>
                  <li><strong>Service Providers:</strong> We work with trusted third-party providers (e.g., cloud storage, analytics) who process data on our behalf under strict confidentiality agreements.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information to comply with legal obligations, such as responding to court orders or government requests.</li>
                  <li><strong>Safety and Security:</strong> We may share information to protect the safety of our users or to enforce our Community Guidelines.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                <p className="text-gray-200">
                  We employ industry-standard security measures, including encryption and access controls, to protect your data from unauthorized access or misuse. However, no online platform can guarantee absolute security, and we encourage you to use strong passwords and secure devices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">6. Your Privacy Choices</h2>
                <p className="text-gray-200">
                  You have control over your privacy on Whowe:
                </p>
                <ul className="list-disc pl-5 text-gray-200">
                  <li><strong>Privacy Settings:</strong> Adjust who can see your posts, profile, and activity.</li>
                  <li><strong>Data Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Data Deletion:</strong> Request the deletion of your account and associated data.</li>
                  <li><strong>Marketing Preferences:</strong> Opt out of personalized ads or promotional communications.</li>
                </ul>
                <p className="text-gray-200">
                  To exercise these rights, visit your account settings or contact us at privacy@Whowe.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Integrations</h2>
                <p className="text-gray-200">
                  Whowe may allow you to connect your account to third-party services (e.g., sharing posts to other platforms). These services have their own privacy policies, and we encourage you to review them before connecting.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">8. Children’s Privacy</h2>
                <p className="text-gray-200">
                  Whowe is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware of such data, we will take steps to delete it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-200">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page and updating the effective date below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
                <p className="text-gray-200 mb-4">
                  If you have questions or concerns about this Privacy Policy, please reach out to us:
                </p>
                <p className="text-gray-200">
                  Email: support@Whowe.com<br />
                  Address: Whowe Inc., 110 Winter Lake Blvd., Fenton, MO 63026
                </p>
              </section>

              <p className="text-gray-500 text-sm">
                Effective Date: April 30, 2025
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

const Footer = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Whowe, Inc.',
    url: 'https://www.whowe.io',
    logo: 'https://www.logo.io/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-636-793-2071',
      contactType: 'Customer Service',
      email: 'support@whowe.io',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '110 Winter Lake Blvd.',
      addressLocality: 'Fenton',
      addressRegion: 'Missouri',
      postalCode: '63026',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.5123,
      longitude: -90.4568,
    },
    sameAs: [
      'https://twitter.com/whowe',
      'https://www.linkedin.com/company/whowe',
      'https://www.facebook.com/whowe',
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <footer
        className="fixed bottom-0 left-0 right-0 h-14 bg-[var(--background)] text-gray-200 z-50 flex items-center justify-between px-4 border-t border-black"
        role="contentinfo"
        aria-label="Main footer"
      >
        {/* Company Info */}
        <div className="flex items-center space-x-2">
          <Image
            src="/whowe_logo_noText.svg"
            alt="Whowe, Inc. Logo"
            width={24}
            height={12}
            priority
          />
          <p className="text-xs" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">Whowe, Inc.</span> © {new Date().getFullYear()} - Empowering Innovation
          </p>
        </div>

        {/* Social Media Links - Centered to viewport */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Link
            href="https://twitter.com/whowe"
            aria-label="Follow us on Twitter"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:scale-110 transition-transform duration-300"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-gray-400">
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
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-gray-400">
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
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-gray-400">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V15.65H7.904v-2.572h2.601V10.94c0-2.562 1.558-3.968 3.83-3.968 1.088 0 2.025.081 2.296.117v2.66h-1.576c-1.236 0-1.475.588-1.475 1.452v1.903h2.945l-.384 2.572h-2.561v6.225C18.307 21.153 22 17.013 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex items-center space-x-4">
          <Link href="/about" className="text-xs hover:text-gray-400">
            About Us
          </Link>
          <Link href="/services" className="text-xs hover:text-gray-400">
            Services
          </Link>
          <Link href="/privacy" className="text-xs hover:text-gray-400" rel="nofollow">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs hover:text-gray-400" rel="nofollow">
            Terms of Service
          </Link>
          <Link href="/sitemap.xml" className="text-xs hover:text-gray-400" rel="nofollow">
            Sitemap
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
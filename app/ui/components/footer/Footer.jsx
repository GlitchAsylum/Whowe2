import Link from 'next/link';
import Image from "next/image";
import Script from 'next/script';
import styles from './Footer.module.css';

const Footer = () => {
  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Whowe, inc.',
    url: 'https://www.whowe.io',
    logo: 'https://www.logo.io/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-636-793-2071',
      contactType: 'Customer Service',
      email: 'support@whowe.io',
    },
    sameAs: [
      'https://twitter.com/whowe',
      'https://www.linkedin.com/company/whowe',
      'https://www.facebook.com/whowe',
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <footer
       className="fixed bottom-0 left-0 shadow-top-lg right-0 text-gray-200 z-50"
        role="contentinfo"
        aria-label="Main footer"
      >
        <div className={styles.container}>

          {/* Company Info */}
          <div className="flex items-center gap-4">
            <Image
            className="svg-component"
            src="/whowe_logo_noText.svg"
            alt="Whowe logo"
            width={16}
            height={16}
            priority
            />
            <p className="text-sm" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Whowe, Inc.</span> &copy; {new Date().getFullYear()}
            </p>
            <p className="text-sm">
              <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">110 Winter Lake Blvd.</span>,{' '}
                <span itemProp="addressLocality">Fenton</span>,{' '}
                <span itemProp="addressRegion">Missouri</span>{' '}
                <span itemProp="postalCode">63026</span>
              </span>
            </p>
          </div>
 {/* Social Media Links */}
 <div className="auto">
                <div className="flex justify-center gap-8">
                    <Link href="https://twitter.com/whowe" 
                        aria-label="Follow us on Twitter"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={styles.navItem}>
                        <svg viewBox="0 0 20 20" aria-hidden="true" class="size-8 fill-gray-400"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path></svg>
                    </Link>

                    <Link
                        href="https://linkedin.com/whowe/whowe"
                        aria-label="Follow us on LinkedIn"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={styles.navItem}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="size-8 fill-gray-400"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M22.0367422,22 L17.8848745,22 L17.8848745,15.5036305 C17.8848745,13.9543347 17.85863,11.9615082 15.7275829,11.9615082 C13.5676669,11.9615082 13.237862,13.6498994 13.237862,15.3925291 L13.237862,22 L9.0903683,22 L9.0903683,8.64071385 L13.0707725,8.64071385 L13.0707725,10.4673257 L13.1276354,10.4673257 C13.6813927,9.41667396 15.0356049,8.3091593 17.0555507,8.3091593 C21.2599073,8.3091593 22.0367422,11.0753215 22.0367422,14.6734319 L22.0367422,22 Z M4.40923804,6.81585163 C3.07514653,6.81585163 2,5.73720584 2,4.40748841 C2,3.07864579 3.07514653,2 4.40923804,2 C5.73720584,2 6.81585163,3.07864579 6.81585163,4.40748841 C6.81585163,5.73720584 5.73720584,6.81585163 4.40923804,6.81585163 L4.40923804,6.81585163 Z M6.48604672,22 L2.32980492,22 L2.32980492,8.64071385 L6.48604672,8.64071385 L6.48604672,22 Z"></path> </g></svg>
                    </Link>
                    <Link
                    href="https://facebook.com/whowe"
                    aria-label="Follow us on Facebook"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={styles.navItem}>
                    <svg viewBox="6 0 20 20" aria-hidden="true" class="size-7 fill-gray-400"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path></g></svg>
                    </Link>
                </div>
            </div>
          {/* Navigation Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className={`${styles.navItem} !text-sm`}
              rel="nofollow"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`${styles.navItem} !text-sm`}
              rel="nofollow"
            >
              Terms of Service
            </Link>
            <Link
              href="/terms"
              className={`${styles.navItem} !text-sm`}
              rel="nofollow"
            >
              Credits
            </Link>
          </nav>
        
        </div>
       
        </footer>
    </>
  );
};

export default Footer;
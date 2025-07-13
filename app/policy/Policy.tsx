import React from 'react';
import { styles } from '../styles/style';


type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div className="w-[95%] 800px:!w-[92%] m-auto py-2 dark:text-white text-black px-3">
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Conditions
        </h1>
        <ul style={{ listStyle: 'unset', marginLeft: '15px' }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            By accessing and using the BGC Geeks platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you must not use our services.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            All content on this platform, including tutorials, videos, graphics, and articles, is the intellectual property of BGC Geeks. You may not reproduce, distribute, or exploit any part without our written consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            Users are responsible for maintaining the confidentiality of their accounts. Sharing login credentials or engaging in unauthorized access may result in account suspension or termination.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            We reserve the right to modify or terminate our services at any time without prior notice. Continued use after changes are made will indicate your acceptance of the new terms.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            Our platform may contain links to third-party sites. BGC Geeks is not responsible for the content or privacy practices of any external websites.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whiteSpace-pre-line">
            Violation of these terms can lead to legal action or permanent removal from the BGC Geeks platform. We are committed to maintaining a safe and respectful environment for all users.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;

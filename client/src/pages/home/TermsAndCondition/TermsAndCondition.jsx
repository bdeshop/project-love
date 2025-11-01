import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const TermsAndCondition = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-500 min-h-screen">
      <div className="bg-black text-white p-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white flex items-center"
        >
          <AiOutlineArrowLeft className="mr-1 text-2xl" />
        </button>
        <p className="font-bold text-xl">Terms and Conditions</p>
      </div>

      <div className="bg-white rounded-2xl p-8 space-y-5 text-lg text-gray-800">
        <p className="text-base">
          These Terms and Conditions (the “Terms”) govern your access to and use
          of the website operated under the URL{" "}
          <span className="font-semibold">www.enjoy365.online</span> (the
          “Website”) and any related or connected services (collectively, the
          “Service”). By opening an account (the “Account”) or using any part of
          the Service, you agree to be bound by these Terms (as amended from
          time to time).
        </p>

        <h2 className="text-xl font-bold">1. Operator & Contact</h2>
        <p>
          The Service is supplied by{" "}
          <span className="font-semibold">enjoy365.online</span>. Transactions
          and payment services (where applicable) may be operated on behalf of
          the Website by its appointed providers.
        </p>
        <p>
          For any questions about these Terms, please contact us via the details
          in the “Contact” section below.
        </p>

        <h2 className="text-xl font-bold">2. Acceptance of Terms</h2>
        <p>
          If you do not agree with these Terms, you must stop using the Service
          immediately. Registering an Account, placing any transactions, or
          continuing to use the Website will be deemed confirmation of your full
          agreement with these Terms and the Privacy Policy.
        </p>

        <h2 className="text-xl font-bold">3. Changes to the Terms</h2>
        <p>
          We may amend these Terms at any time. Where changes are material, you
          may be notified in advance or asked to re-confirm acceptance. If you
          object to any change, you must stop using the Service. Any unsettled
          transactions initiated prior to the effective date of a change will be
          governed by the pre-existing Terms.
        </p>

        <h2 className="text-xl font-bold">4. Eligibility</h2>
        <p>
          You represent and warrant that you are at least the legal age of
          majority in your jurisdiction and that your use of the Service is
          lawful where you reside. You must not use the Service if doing so is
          prohibited by applicable law or regulation.
        </p>

        <h2 className="text-xl font-bold">
          5. Account Registration & Security
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You must provide accurate, complete, and current information during
            registration and keep it up to date.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activities under your Account.
          </li>
          <li>
            We may request identity or eligibility verification (KYC) and may
            suspend or close Accounts where verification is not completed or
            where we reasonably suspect misuse.
          </li>
        </ul>

        <h2 className="text-xl font-bold">6. Permitted & Prohibited Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Service only for lawful purposes and in good faith.</li>
          <li>
            You must not engage in fraud, abuse, chargeback misuse, unauthorized
            access, scraping, interference, or any activity that may harm the
            Website or other users.
          </li>
          <li>
            You must not use VPN/proxy or other tools to circumvent geo-, age-,
            or legal restrictions where prohibited by law.
          </li>
        </ul>

        <h2 className="text-xl font-bold">
          7. Services, Content & Availability
        </h2>
        <p>
          We may modify, suspend, or discontinue any part of the Service at any
          time without liability. While we strive for accuracy, the Website and
          its content are provided on an “as is” and “as available” basis and
          may contain errors or interruptions.
        </p>

        <h2 className="text-xl font-bold">8. Payments, Fees & Refunds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Where payments apply, you agree to pay all applicable fees, charges,
            and taxes associated with your use of the Service.
          </li>
          <li>
            Payment methods may be provided by third-party processors subject to
            their terms. Processing times and limits may vary.
          </li>
          <li>
            Refunds (if any) are at our discretion and subject to compliance,
            risk checks, and applicable laws.
          </li>
        </ul>

        <h2 className="text-xl font-bold">9. Intellectual Property</h2>
        <p>
          All trademarks, logos, graphics, text, software, and other content on
          the Website are owned by or licensed to us and are protected by
          intellectual property laws. You are granted a limited, non-exclusive,
          non-transferable, revocable license to access and use the Service for
          personal, non-commercial purposes only.
        </p>

        <h2 className="text-xl font-bold">10. Privacy & Cookies</h2>
        <p>
          Your use of the Service is also governed by our Privacy Policy, which
          explains how we collect, use, and protect your personal information.
          We use cookies for web analytics and to improve login experience. See
          our Privacy Policy for details.
        </p>

        <h2 className="text-xl font-bold">11. Suspension & Termination</h2>
        <p>
          We may suspend, restrict, or terminate your access to the Service at
          any time where we reasonably believe you have breached these Terms or
          applicable law, or where required for security, compliance, or
          operational reasons.
        </p>

        <h2 className="text-xl font-bold">12. Disclaimers</h2>
        <p>
          To the maximum extent permitted by law, the Service is provided “as
          is” without warranties of any kind, whether express or implied,
          including without limitation implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement.
        </p>

        <h2 className="text-xl font-bold">13. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, in no event shall we be liable
          for any indirect, incidental, special, consequential, or punitive
          damages, or any loss of profits or revenues, whether incurred directly
          or indirectly, or any loss of data, use, goodwill, or other intangible
          losses, arising out of or related to your use of the Service.
        </p>

        <h2 className="text-xl font-bold">14. Indemnity</h2>
        <p>
          You agree to indemnify and hold us harmless from any claims, damages,
          liabilities, losses, and expenses (including legal fees) arising from
          your breach of these Terms or misuse of the Service.
        </p>

        <h2 className="text-xl font-bold">
          15. Governing Law & Dispute Resolution
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws applicable to the operator of the Website. Disputes shall be
          subject to the exclusive jurisdiction of the competent courts of such
          jurisdiction, unless mandatory local consumer law provides otherwise.
        </p>

        <h2 className="text-xl font-bold">16. Severability & Waiver</h2>
        <p>
          If any provision of these Terms is held invalid or unenforceable, the
          remaining provisions shall remain in full force. Our failure to
          enforce any right or provision shall not constitute a waiver of such
          right or provision.
        </p>

        <h2 className="text-xl font-bold">17. Contact</h2>
        <p>
          For support or legal notices, please contact:{" "}
          <a
            href="https://www.oraclesoft.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.oraclesoft.info
          </a>
        </p>

        <div className="border-t border-gray-300 pt-4 space-y-1">
          <p className="font-semibold">Developed by: Oracle Technology LLC</p>
          <p>
            Gaming API Provided By:{" "}
            <a
              href="https://www.oracleapi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.oracleapi.net
            </a>
          </p>
          <p>
            Certified Partners:{" "}
            <span className="font-semibold">
              Gaming Alliance — DST Play VIP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;

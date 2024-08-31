import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
            <article className="prose lg:prose-l">
                <h2>Terms of Service</h2>
                <p>Effective Date: August 30, 2024</p>
                <p>Welcome to EmeraldCityStays! By accessing or using our website, https://emeraldcitystays.com (the &quot;Site&quot;), you agree to 
                    comply with and be bound by the following terms and conditions (the &quot;Terms&quot;). Please read them carefully.
                </p>
                <h2>Services Provided </h2>
                <p>EmeraldCityStays provides guests with furnished rental properties in the Seattle area.</p>
                <h2>User Data</h2>
                <p>We collect personal information such as your name, email address, and payment information. We also collect non-personal 
                    data through web cookies to improve your experience. For details on how we handle your personal information, please 
                    refer to our Privacy Policy.</p>
                <h2>Booking and Cancellation Policy</h2>
                <p>Bookings are subject to the cancellation policy in place at the time of the booking. This policy will be shown to you 
                    for review before completing your booking.</p>
                <h2>Governing Law</h2>
                <p>These Terms are governed by the laws of the United States.</p>
                <h2>Updates to Terms</h2>
                <p>We may update these Terms from time to time. Any changes will be communicated to you via email.</p>
                <h2>Contact Information</h2>
                <p>If you have any questions or concerns regarding these Terms, please contact us at charles@emeraldcitystays.com.</p>
                <p>By using our Site, you acknowledge that you have read, understood, and agree to these Terms.</p>
            </article>
        </pre>
      </div>
    </main>
  );
};

export default TOS;

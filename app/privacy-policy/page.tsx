import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
            <article className="prose lg:prose-l">
                <p>Effective Date: August 30, 2024</p>

                <p>Welcome to Emerald City Stays. This Privacy Policy outlines how we collect, use, and protect your personal information 
                    when you use our website, https://emeraldcitystays.com (the &quot;Site&quot;).</p>
                <h2>Information We Collect</h2>
                <ul>
                    <li>Personal Information: We collect your name, email address, and payment information when you make a booking or contact us.
                        </li>
                    <li>Non-Personal Information: We use web cookies to collect non-personal data to enhance your experience on our Site.</li>
                </ul>
                <h2>Purpose of Data Collection</h2>
                <p>We use your personal information for order processing and first-party marketing purposes.</p>
                <h2>Data Sharing</h2>
                <p>We do not share your personal information with any third parties.</p>
                <h2>Children&apos;s Privacy</h2>
                <p>We do not collect any data from children under the age of 13.</p>
                <h2>Updates to Privacy Policy</h2>
                <p>We may update this Privacy Policy periodically. Any updates will be posted on this page, and we may notify you via email about significant changes.</p>
                <h2>Contact Information</h2>
                <p>For any questions or concerns regarding this Privacy Policy, please contact us at charles@emeraldcitystays.com.</p>
                <p>By using our Site, you consent to the collection and use of your information as described in this Privacy Policy.</p>

---
            </article>
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

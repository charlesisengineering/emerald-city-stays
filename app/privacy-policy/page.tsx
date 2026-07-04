import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// Privacy policy tailored to what the site actually does:
// - Analytics are cookieless (Plausible + Vercel) — no tracking cookies.
// - The only first-party cookie is a Supabase auth session, for logged-in users.
// - Bookings/payments are handled by third parties (Hospitable/Airbnb/Vrbo),
//   not collected on this site.
// - Embedded/processing third parties: Vercel (hosting), Supabase (auth),
//   Google Maps, Hospitable (booking widget + reviews).
// If these practices change, update the copy below to match.

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
                <p>Effective Date: July 3, 2026</p>

                <p>Welcome to Emerald City Stays. This Privacy Policy explains what information we collect, how we use it,
                    and the third-party services involved when you use our website, https://emeraldcitystays.com (the &quot;Site&quot;).</p>

                <h2>Information We Collect</h2>
                <ul>
                    <li><strong>If you contact us:</strong> When you email us or reach out for support, we receive the information you
                        provide, such as your name and email address.</li>
                    <li><strong>If you create an account:</strong> If you sign in (for example, to view a house manual), we use a
                        secure session cookie to keep you logged in. Account sign-in is handled by our authentication provider.</li>
                    <li><strong>Analytics:</strong> We use privacy-friendly, <strong>cookieless</strong> analytics (Plausible and
                        Vercel Analytics) to understand aggregate, anonymous usage of the Site. These tools do not use tracking
                        cookies and do not identify you personally.</li>
                    <li><strong>Bookings and payments:</strong> Reservations and payments are processed by our booking partners
                        (such as Hospitable, Airbnb, and Vrbo) through their own platforms and widgets. We do not collect or store
                        your payment card details on this Site.</li>
                </ul>

                <h2>Cookies</h2>
                <p>We do not use advertising or tracking cookies. The only cookie we set is a session cookie for signed-in users,
                    which is necessary to keep you logged in. Third-party services embedded on the Site (see below) may set their
                    own cookies when their content loads.</p>

                <h2>Third-Party Services</h2>
                <p>We rely on the following third parties to operate the Site. Each processes limited data under its own privacy policy:</p>
                <ul>
                    <li><strong>Vercel</strong> — website hosting and cookieless performance/analytics.</li>
                    <li><strong>Supabase</strong> — account authentication for signed-in users.</li>
                    <li><strong>Google Maps</strong> — embedded maps on property pages.</li>
                    <li><strong>Hospitable</strong> — the booking search/availability widget and guest reviews shown on the Site.</li>
                    <li><strong>Plausible</strong> — cookieless website analytics.</li>
                </ul>
                <p>We do not sell your personal information, and we do not share it with third parties for their own marketing.</p>

                <h2>Children&apos;s Privacy</h2>
                <p>The Site is not directed to children, and we do not knowingly collect personal information from children under the age of 13.</p>

                <h2>Updates to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new effective date.</p>

                <h2>Contact Information</h2>
                <p>For any questions or concerns regarding this Privacy Policy, please contact us at charles@emeraldcitystays.com.</p>
            </article>
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

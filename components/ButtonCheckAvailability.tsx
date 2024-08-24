import Link from "next/link";
import React from 'react'

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = "Check Availability",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  return (
    <Link
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href={"/#properties"}
    >
      {text}
    </Link>
  );
};

export default ButtonSignin;

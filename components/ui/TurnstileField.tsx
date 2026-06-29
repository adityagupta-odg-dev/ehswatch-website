"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileFieldProps {
  onToken: (token: string) => void;
  onExpire?: () => void;
}

export default function TurnstileField({ onToken, onExpire }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";
  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={onExpire}
      options={{ size: "normal" }}
    />
  );
}

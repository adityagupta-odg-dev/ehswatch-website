const FALLBACK_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.2356997895853!2d151.20407!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sau!4v1";

export default function SupportMap({ embedUrl }: { embedUrl?: string }) {
  return (
    <section className="bg-white pb-12 md:pb-20 px-4 md:px-6">
      <div className="max-w-[1160px] mx-auto">
        <div
          className="w-full rounded-[16px] overflow-hidden border border-[#e2e8f0]"
          style={{ height: "420px", boxShadow: "0 2px 16px rgba(20,31,56,0.06)" }}
        >
          <iframe
            title="EHSWatch Office Location"
            src={embedUrl || FALLBACK_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

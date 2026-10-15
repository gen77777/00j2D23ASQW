import Link from "next/link";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import type { ContentData } from "@/types/content";

export default function Footer({ data }: { data: ContentData["footer"] }) {
  const [user, domain] = data.email.split("@");
  return (
    <footer className="editorial-footer">
      <div className="section-kicker"><span>LET’S MAKE SOMETHING MEANINGFUL.</span><span>{data.location}</span></div>
      <Link href="/contact/" className="footer-invitation" data-cursor="話す"><span>LET’S TALK.</span><span className="footer-arrow" aria-hidden="true">↗</span></Link>
      <div className="footer-contact"><p>採用・制作のご相談はこちらから。</p>{user && domain && <ObfuscatedEmail user={user} domain={domain} className="editorial-link break-all" />}</div>
      <div className="footer-baseline"><p>© {new Date().getFullYear()} {data.copyrightName}</p><div>{data.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>)}<Link href="/privacy-policy/">プライバシーポリシー</Link><a href="#top">BACK TO TOP ↑</a></div></div>
    </footer>
  );
}

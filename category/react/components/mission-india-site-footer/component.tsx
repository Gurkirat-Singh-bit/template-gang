import asset0 from "./assets/linkedin-social.svg";
import asset1 from "./assets/x-social.svg";
import asset2 from "./assets/youtube-social.svg";
import asset3 from "./assets/discord-social.svg";
import asset4 from "./assets/github-social.svg";
import Link from "next/link";
import Image from "next/image";
export function SiteFooter() {
  return (
    <footer className="mi-site-footer relative z-0 bg-mi-ink md:sticky md:bottom-0 md:min-h-[40svh]">
      <div className="mi-footer-base">
        <div className="mi-container">
          <div className="mi-footer-details">
            <div className="mi-footer-contact">
              <p>A student GPU platform in development.</p>
              <a href="mailto:hello@yuvacompute.com">hello@yuvacompute.com</a>
            </div>
            <nav className="mi-footer-social" aria-label="Social links">
              <a
                href="https://www.linkedin.com/company/yuvacompute"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={asset0.src}
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
              <a
                href="https://x.com/Yuvacompute"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={asset1.src}
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
              <a
                href="https://youtube.com/@yuvacompute"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={asset2.src}
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
              <a
                href="https://discord.gg/uutCBC5QV"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={asset3.src}
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
              <a
                href="https://github.com/YuvaCompute"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={asset4.src}
                  alt=""
                  width={26}
                  height={26}
                  unoptimized
                />
              </a>
            </nav>
          </div>
          <hr className="mi-footer-divider" />
          <div className="mi-footer-signature-crop">
            <Link
              prefetch={false}
              className="mi-footer-signature"
              href="/"
              aria-label="YuvaCompute home"
            >
              yuva<span>compute</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

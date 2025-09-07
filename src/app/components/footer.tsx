"use client";

import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiFacebook, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
	return (
		<footer className="bg-dark text-light py-10 px-6 mt-16">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
				{/* Logo/tagline */}
				<div className="flex flex-col items-center md:items-start gap-3">
					<Link href="/" aria-label="Pidgeotour home">
						<Image
							src="/assets/Pidgeotour-logo.png"
							alt="Pidgeotour logo"
							width={160}
							height={50}
							className="h-auto w-auto"
							loading="lazy"
						/>
					</Link>
					<p className="text-sm text-light/70">
						Explore the world with Pidgeotour
					</p>
				</div>

				{/* Quick Links */}
				<nav
					aria-label="Footer navigation"
					className="flex flex-col items-center gap-3"
				>
					<h4 className="font-semibold text-pink">Quick Links</h4>
					<div className="grid grid-cols-2 gap-x-6 gap-y-2">
						<Link href="/" className="hover-text-pink transition-colors">
							Home
						</Link>
						<Link href="/tours" className="hover-text-pink transition-colors">
							Tours
						</Link>
						<Link href="/about" className="hover-text-pink transition-colors">
							About
						</Link>
						<Link href="/contact" className="hover-text-pink transition-colors">
							Contact
						</Link>
					</div>
				</nav>

				{/* Social media */}
				<div
					className="flex flex-col items-center gap-3"
					aria-label="Social media"
				>
					<h4 className="font-semibold text-pink">Follow us</h4>
					<div className="flex gap-4">
						<a
							href="https://instagram.com"
							aria-label="Instagram"
							title="Instagram"
							className="hover-text-pink transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SiInstagram size={22} />
						</a>
						<a
							href="https://facebook.com"
							aria-label="Facebook"
							title="Facebook"
							className="hover-text-pink transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SiFacebook size={22} />
						</a>
						<a
							href="https://x.com"
							aria-label="Twitter/X"
							title="Twitter/X"
							className="hover-text-pink transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SiX size={22} />
						</a>
						<a
							href="https://youtube.com"
							aria-label="YouTube"
							title="YouTube"
							className="hover-text-pink transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SiYoutube size={22} />
						</a>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="border-t border-light/20 mt-8 pt-4 text-center text-xs text-light/60">
				© {new Date().getFullYear()} Pidgeotour. All rights reserved.
			</div>
		</footer>
	);
}

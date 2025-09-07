"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type HeaderProps = {
	transparent?: boolean;
};

export default function Header({ transparent = false }: HeaderProps) {
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement | null>(null);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/tours", label: "Tours" },
		{ href: "/about", label: "About Us" },
		{ href: "/contact", label: "Contact Us" },
	];

	// ESC to close overlay
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// Click outside to close overlay
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (!panelRef.current) return;
			if (open && !panelRef.current.contains(e.target as Node)) setOpen(false);
		};
		if (open) document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, [open]);

	// Disable scroll when menu open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
	}, [open]);

	const baseClasses = transparent
		? "absolute top-0 left-0 z-30 bg-transparent text-light"
		: "relative z-20 bg-dark text-light";

	return (
		<header
			className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${baseClasses}`}
		>
			{/* Logo */}
			<Link href="/" aria-label="Pidgeotour home" className="block">
				<div className="relative w-[160px] h-[50px] sm:w-[200px] sm:h-[60px]">
					<Image
						src="/assets/Pidgeotour-logo.png"
						alt="Pidgeotour logo"
						width={200}
						height={60}
						style={{ width: "100%", height: "auto", display: "block" }}
						sizes="(max-width: 640px) 160px, 200px"
						className="object-contain"
						priority
					/>
				</div>
			</Link>

			{/* Desktop nav */}
			<nav className="hidden xl:flex items-center gap-10 px-4">
				{navLinks.map((l) => (
					<Link
						key={l.href}
						href={l.href}
						className="transition-colors hover-text-pink text-lg font-medium cursor-pointer"
					>
						{l.label}
					</Link>
				))}
			</nav>

			{/* Mobile menu button */}
			<button
				onClick={() => setOpen((s) => !s)}
				aria-label={open ? "Close menu" : "Open menu"}
				aria-expanded={open}
				aria-controls="mobile-menu"
				className="xl:hidden p-2 rounded-md bg-dark/80 hover:bg-dark/90 transition grid place-items-center"
			>
				{open ? (
					<X className="w-6 h-6 text-light" />
				) : (
					<Menu className="w-6 h-6 text-light" />
				)}
			</button>

			{/* Overlay/Drawer */}
			{open && (
				<div className="fixed inset-0 z-40 xl:hidden" aria-hidden={!open}>
					{/* Semi-transparent overlay */}
					<div
						className="absolute inset-0 bg-black/45 transition-opacity opacity-100"
						onClick={() => setOpen(false)}
					/>
					<div
						ref={panelRef}
						id="mobile-menu"
						className="absolute top-0 right-0 h-full w-[84vw] max-w-[360px] bg-dark shadow-2xl transform transition-transform duration-300 translate-x-0"
						role="dialog"
						aria-modal="true"
						aria-labelledby="mobile-menu-title"
					>
						<div className="p-4 flex items-center justify-between border-b border-border">
							<h2
								id="mobile-menu-title"
								className="text-lg font-semibold text-light"
							>
								Menu
							</h2>
							<button
								onClick={() => setOpen(false)}
								aria-label="Close"
								className="p-2 rounded hover:bg-muted/20"
							>
								<X className="w-6 h-6 text-light" />
							</button>
						</div>

						<div className="p-4 flex flex-col gap-4">
							{navLinks.map((l) => (
								<Link
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className="w-full text-left py-3 px-2 rounded transition-colors font-medium text-light cursor-pointer hover-text-pink"
								>
									{l.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

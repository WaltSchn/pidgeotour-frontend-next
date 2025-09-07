"use client";

import Image from "next/image";
import Link from "next/link";

type CardProps = {
	imageSrc: string;
	title: string;
	description: string;
	tags?: string[];
	price?: number;
	buttonText?: string;
	buttonHref?: string;
};

export default function Card({
	imageSrc,
	title,
	description,
	tags = [],
	price,
	buttonText = "View Tour",
	buttonHref = "#",
}: CardProps) {
	const href =
		!buttonHref || buttonHref === "#"
			? "#"
			: buttonHref.startsWith("/")
			? buttonHref
			: `/tours/${String(buttonHref)}`;

	return (
		<article className="backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 bg-dark text-light w-full max-w-[360px] mx-auto flex flex-col">
			<div className="relative w-full aspect-[500/400]">
				<Image
					src={imageSrc}
					alt={`Tour: ${title}`}
					fill
					sizes="(max-width: 768px) 100vw, 360px"
					className="object-cover object-top"
					loading="lazy"
				/>

				<div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark/95 to-transparent z-10" />
			</div>

			<div className="p-6 flex flex-col gap-4 flex-grow">
				<div>
					<h3 className="text-lg font-bold h-[3rem] leading-snug line-clamp-2 text-light">
						{title}
					</h3>
					<p className="text-sm line-clamp-3 text-light/90">{description}</p>
				</div>

				<div className="flex items-center justify-between gap-2 flex-wrap">
					<div className="flex gap-2 flex-wrap" aria-label="Tags">
						{tags.map((tag, i) => (
							<span
								key={i}
								className="px-2 py-1 rounded-full text-xs font-semibold bg-pink text-dark"
							>
								{tag}
							</span>
						))}
					</div>

					{price !== undefined && (
						<div
							className="font-semibold text-orange text-right"
							aria-label={`Price: ${price} Pokedollars`}
						>
							<span className="pokedollar text-lg mr-1">$</span>
							<span>{price.toLocaleString()}</span>
						</div>
					)}
				</div>

				<div className="mt-auto">
					<Link
						href={href}
						className="btn-solid btn-blue w-full text-center"
						aria-label={buttonText}
					>
						{buttonText}
					</Link>
				</div>
			</div>
		</article>
	);
}

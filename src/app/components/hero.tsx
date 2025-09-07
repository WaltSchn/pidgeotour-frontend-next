type HeroProps = {
	title: string;
	subtitle?: string;
	ctaText?: string;
	ctaHref?: string;
	bgVideo?: string;
};

export default function Hero({
	title,
	subtitle = "Local favorites and unique experiences, made simple.",
	ctaText,
	ctaHref,
	bgVideo,
}: HeroProps) {
	return (
		<section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
			{bgVideo && (
				<video
					className="absolute inset-0 w-full h-full object-cover -z-20"
					src={bgVideo}
					autoPlay
					muted
					loop
					playsInline
				/>
			)}

			{/* overlay */}
			<div className="absolute inset-0 -z-10 bg-black/50" />

			<div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 leading-tight text-light tracking-widest">
					{title}
				</h1>

				<p className="text-xl text-light md:text-xl font-medium mb-32 max-w-3xl mx-auto tracking-[0.02em]">
					{subtitle}
				</p>

				{ctaText && ctaHref && (
					<a
						href={ctaHref}
						role="button"
						aria-label={ctaText}
						className="inline-flex items-center gap-3 sm:gap-5 md:gap-8 rounded-full btn-solid btn-pink sm:!px-12 md:!px-24 sm:!py-5 md:!py-6 transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:shadow-[0_0_0_4px_rgba(102,180,219,0.12)]"
					>
						<span className="sm:text-2xl md:text-3xl font-bold leading-none">
							{ctaText}
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transform transition-transform duration-200"
							aria-hidden="true"
						>
							<path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor" />
						</svg>
					</a>
				)}
			</div>
		</section>
	);
}

"use client";

import Header from "@/app/components/header";
import Image from "next/image";

export default function AboutPage() {
	return (
		<main className="flex flex-col min-h-screen">
			<Header transparent={false} />

			<section className="py-8 px-12 lg:px-24">
				<div className="text-left ml-12 mb-10 inline-block">
					<p className="text-sm font-semibold uppercase tracking-wide text-pink">
						Who We Are
					</p>
					<h1 className="text-3xl font-bold text-dark mt-1">About Us</h1>
					<div className="w-25 h-[3px] bg-blue mt-2 ml-1"></div>
				</div>

				<div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 max-w-6xl mx-auto">
					<div className="flex-1 text-dark text-lg leading-relaxed space-y-6">
						<p>
							Pidgeotour was created with one goal in mind: making every journey
							unique and unforgettable. We carefully handpick destinations and
							experiences so you can focus on what truly matters, enjoying the
							adventure.
						</p>
						<p>
							Our team is passionate about travel, culture, and storytelling.
							From exotic getaways to local gems, we’re here to help you
							discover the world in new and exciting ways.
						</p>
						<p className="font-semibold text-pink">Let’s explore together!</p>
					</div>
					<div className="hidden lg:block flex-shrink-0 w-[300px]">
						<Image
							src="/assets/MegaPidgeot.png"
							alt="Pidgeotour Mascot"
							width={300}
							height={300}
							className="object-contain"
							priority
						/>
					</div>
				</div>
			</section>
		</main>
	);
}

"use client";

import Header from "./components/header";
import Hero from "./components/hero";
import TourCarousel from "./components/tourCarousel";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/tours";
import Head from "next/head";
import { Tour } from "@/types/tours";

function FeaturedTours({
	tours,
	isLoading,
	error,
}: {
	tours?: Tour[];
	isLoading: boolean;
	error: unknown;
}) {
	const featured = (tours ?? []).filter((t: Tour) => t.featured);

	if (isLoading)
		return (
			<div className="py-12 flex items-center justify-center">
				<p>Loading featured tours...</p>
			</div>
		);

	if (error)
		return (
			<div className="py-12 text-center text-red-500">Error loading tours.</div>
		);

	if (featured.length === 0)
		return <div className="py-6 text-center">No featured tours right now.</div>;

	return (
		<div className="animate-fadeIn">
			<TourCarousel tours={featured} />
		</div>
	);
}

export default function Home() {
	const {
		data: tours,
		isLoading,
		error,
	} = useQuery<Tour[]>({
		queryKey: ["tours"],
		queryFn: getTours,
	});

	return (
		<>
			<Head>
				<title>Pidgeotour | Explore the world</title>
				<meta
					name="description"
					content="Handpicked tours for every traveler"
				/>
			</Head>

			<main className="flex flex-col min-h-screen">
				<Header transparent />

				{/* Hero */}
				<Hero
					title="Explore the world with Pidgeotour"
					subtitle="Unforgettable journeys, crafted just for you."
					ctaText="Start Your Journey"
					ctaHref="/tours"
					bgVideo="/assets/hero-video.mp4"
				/>

				{/* Featured Tours */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-left mb-10 relative inline-block">
							<h2 className="relative inline-block text-3xl font-bold text-dark tracking-wider">
								Featured Tours
							</h2>
							<div className="mt-4 absolute left-0 w-24 h-[3px] bg-blue" />
						</div>

						<FeaturedTours tours={tours} isLoading={isLoading} error={error} />
					</div>
				</section>
			</main>
		</>
	);
}

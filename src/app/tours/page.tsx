"use client";

import Header from "@/app/components/header";
import Card from "@/app/components/card";
import { useState } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/tours";

export default function ToursPage() {
	const {
		data: tours,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: getTours,
	});

	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	if (isLoading) return <p>Loading tours...</p>;
	if (error) return <p>Failed to load tours</p>;
	if (!tours) return null;

	const allTypes = Array.from(new Set(tours.flatMap((t) => t.type)));
	const filteredTours = activeFilter
		? tours.filter((t) => t.type.includes(activeFilter))
		: tours;

	return (
		<main className="flex flex-col min-h-screen">
			<Header transparent={false} />
			<section className="py-8 px-12 lg:px-24">
				<div className="text-left ml-12 mb-10 inline-block">
					<p className="text-sm font-semibold uppercase tracking-wide text-pink">
						Discover
					</p>
					<h1 className="text-3xl font-bold text-dark mt-1">Tours</h1>
					<div className="w-25 h-[3px] bg-blue mt-2 ml-1"></div>
				</div>
				<div className="mb-8 flex flex-wrap justify-center items-center gap-4 bg-dark p-4 rounded-2xl shadow-sm overflow-x-auto">
					<span className="font-bold text-base text-pink mr-4">
						Filter by Category:
					</span>

					{allTypes.map((type) => (
						<button
							key={type}
							className={`px-4 py-2 rounded-full font-semibold border-2 transition-colors ${
								activeFilter === type
									? "bg-pink text-dark "
									: "text-light hover-bg-pink"
							}`}
							onClick={() =>
								setActiveFilter(activeFilter === type ? null : type)
							}
						>
							{type}
						</button>
					))}
					<button
						className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold border-2 transition-colors ${
							activeFilter
								? "bg-dark text-light border-light hover-bg-pink"
								: "bg-dark text-light border-light opacity-50 cursor-not-allowed"
						}`}
						onClick={() => setActiveFilter(null)}
						disabled={!activeFilter}
					>
						<X />
						Clear
					</button>
				</div>
				<div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{filteredTours.map((tour) => (
						<Card
							key={tour._id.toString()}
							imageSrc={tour.images[0]}
							title={tour.title}
							description={tour.description}
							tags={tour.type}
							price={tour.price}
							buttonText="View Tour"
							buttonHref={`/tours/${tour._id}`}
						/>
					))}
				</div>
			</section>
		</main>
	);
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import DatePicker from "react-datepicker";
import { Calendar, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTourById } from "@/services/tours";

export default function TourDetailsPage() {
	const { id } = useParams();
	const tourId = Array.isArray(id) ? id[0] : id;
	const router = useRouter();

	const {
		data: tour,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tour", tourId],
		queryFn: () => getTourById(tourId!),
		enabled: !!tourId,
		staleTime: 1000 * 60 * 2,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [showModal, setShowModal] = useState(false);

	const availableDates = useMemo(() => {
		if (!tour?.availableDates) return [];
		return tour.availableDates.map((d: string | number | Date) => new Date(d));
	}, [tour]);

	useEffect(() => {
		if (availableDates.length) setSelectedDate(availableDates[0]);
		else setSelectedDate(null);
		setSelectedIndex(0);
	}, [tour, availableDates]);

	if (isLoading)
		return (
			<main className="min-h-screen flex items-center justify-center">
				<p>Loading tour...</p>
			</main>
		);

	if (error || !tour)
		return (
			<main className="min-h-screen">
				<Header transparent={false} />
				<section className="py-12 px-6 max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4 text-dark">Tour not found</h2>
					<p className="mb-6 text-dark">Oops — não encontramos esse passeio.</p>
					<div className="flex justify-center gap-3">
						<Link href="/tours" className="btn-outline outline-blue">
							Voltar para Tours
						</Link>
						<button
							onClick={() => router.push("/")}
							className="btn-outline outline-pink"
						>
							Ir para Home
						</button>
					</div>
				</section>
			</main>
		);

	const images =
		tour.images && tour.images.length
			? tour.images
			: ["/assets/images/Cinnabar.jpg"];

	return (
		<main className="min-h-screen">
			<Header transparent={false} />

			<section className="py-10 px-4 lg:px-20 max-w-7xl mx-auto">
				{/* Back Button */}
				<button
					onClick={() => router.push("/tours")}
					className="mb-4 flex items-center gap-1 text-base text-dark hover:text-dark cursor-pointer transition-colors"
				>
					<ChevronLeft className="w-4 h-4" />
					Back to tours
				</button>

				{/* Main Image */}
				<div
					className="relative w-full h-[480px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg mb-6"
					style={{ minHeight: 480 }}
				>
					<Image
						src={images[selectedIndex]}
						alt={tour.title}
						fill
						sizes="(max-width: 1024px) 100vw, 1200px"
						className="object-cover"
						priority
					/>
					<div className="absolute bottom-0 left-0 w-full pointer-events-none h-[140px] bg-gradient-to-t from-dark/70 to-transparent" />
				</div>

				{/* Thumbnails */}
				<div className="flex gap-3 mb-10 overflow-x-auto">
					{images.map((src, i) => (
						<button
							key={i}
							onClick={() => setSelectedIndex(i)}
							className={`relative rounded-lg overflow-hidden transition border-2 ${
								selectedIndex === i ? "border-blue" : "border-transparent"
							}`}
							aria-label={`View image ${i + 1}`}
						>
							<Image
								src={src}
								alt={`Thumbnail ${i + 1}`}
								width={140}
								height={84}
								className="object-cover"
								sizes="140px"
							/>
						</button>
					))}
				</div>

				{/* Title & Price */}
				<div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-6 items-start">
					<div>
						<h1 className="text-3xl lg:text-4xl font-bold text-dark mb-2">
							{tour.title}
						</h1>
						<p className="text-base text-dark/70">{tour.location}</p>
						<div className="flex flex-wrap gap-2 mt-3">
							{tour.type?.map((t, i) => (
								<span
									key={i}
									className="px-4 py-1.5 rounded-full text-base font-semibold bg-pink text-dark"
								>
									{t}
								</span>
							))}
						</div>
					</div>
					<div className="text-4xl font-extrabold text-orange mt-2 lg:mt-0">
						<span className="pokedollar mr-1">$</span>
						{tour.price?.toLocaleString()}
					</div>
				</div>

				{/* About */}
				<div className="max-w-4xl mb-10">
					<h3 className="text-2xl font-semibold mb-4 text-dark">
						About this tour
					</h3>
					<p className="text-base text-dark leading-relaxed">
						{tour.description}
					</p>
				</div>

				{/* Date Picker & Book */}
				<div className="py-6 rounded-2xl shadow-sm bg-dark text-light mb-10 px-12 flex flex-col lg:flex-row lg:items-center gap-6">
					<div className="lg:flex-1">
						<label className="block text-lg font-semibold mb-3 text-light">
							Pick your date
						</label>
						<div className="flex items-center gap-3">
							<Calendar className="w-10 h-10 text-light" />
							<DatePicker
								selected={selectedDate}
								onChange={(d) => setSelectedDate(d)}
								includeDates={availableDates}
								dateFormat="PPP"
								placeholderText="Select a date"
								className="w-full px-4 py-2 rounded-lg border-2 border-light bg-dark text-light font-semibold"
								dayClassName={(d) => {
									const isAvailable = availableDates.some(
										(ad) => ad.toDateString() === d.toDateString()
									);
									const isSelected =
										selectedDate?.toDateString() === d.toDateString();
									if (isSelected) return "react-datepicker__day--selected";
									if (isAvailable) return "react-datepicker__day--available";
									return "react-datepicker__day--disabled";
								}}
								renderCustomHeader={({
									monthDate,
									decreaseMonth,
									increaseMonth,
								}) => (
									<div className="flex justify-between items-center mb-2">
										<button
											type="button"
											onClick={decreaseMonth}
											className="text-light px-3 py-1 text-lg cursor-pointer"
										>
											{"<"}
										</button>
										<span className="font-medium text-lg">
											{monthDate.toLocaleString("default", {
												month: "long",
												year: "numeric",
											})}
										</span>
										<button
											type="button"
											onClick={increaseMonth}
											className="text-light px-3 py-1 text-lg cursor-pointer"
										>
											{">"}
										</button>
									</div>
								)}
								popperPlacement="bottom"
								aria-label="Select tour date"
							/>
						</div>
						<small className="block mt-2 text-light/80 text-xs">
							Only available dates are selectable.
						</small>
					</div>

					<div className="lg:flex-1 flex justify-center lg:justify-end">
						<button
							onClick={() => setShowModal(true)}
							className="w-full lg:w-auto btn-book text-center"
							disabled={!selectedDate}
						>
							{selectedDate
								? `Book on ${selectedDate.toLocaleDateString()}`
								: "Book now"}
						</button>
					</div>
				</div>

				{/* Highlights & Amenities */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
					<div className="p-5 rounded-xl bg-light">
						<h4 className="font-semibold mb-3 text-dark text-lg">
							Tour highlights
						</h4>
						<ul className="text-base text-dark/80 space-y-2 list-disc list-inside">
							<li>
								<strong>Start Time:</strong>{" "}
								{tour.startTime ?? "Approx. 4–8 hours"}
							</li>
							<li>
								<strong>Duration:</strong>{" "}
								{tour.duration ?? "Approx. 4–8 hours"}
							</li>
							<li>
								<strong>Group size:</strong> {tour.groupSize ?? "Small groups"}
							</li>
							{tour.meetingPoint && (
								<li>
									<strong>Meeting point:</strong> {tour.meetingPoint}
								</li>
							)}
						</ul>
					</div>

					<div className="p-5 rounded-xl bg-light">
						<h4 className="font-semibold mb-3 text-dark text-lg">
							Amenities & Language
						</h4>
						<div className="text-base text-dark/80 space-y-2">
							<div>
								<strong>What&apos;s included:</strong>{" "}
								{tour.included?.length ? (
									<ul className="list-disc list-inside ml-4">
										{tour.included.map((i, j) => (
											<li key={j}>{i}</li>
										))}
									</ul>
								) : (
									"Guide, snacks, transport"
								)}
							</div>
							<div>
								<strong>Languages:</strong>{" "}
								{tour.languages?.length ? (
									<ul className="list-disc list-inside ml-4">
										{tour.languages.map((lang, j) => (
											<li key={j}>{lang}</li>
										))}
									</ul>
								) : (
									"English"
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Contact CTA */}
				<div
					id="book"
					className="mt-10 p-8 rounded-2xl bg-blue text-dark text-center shadow-md"
				>
					<h4 className="text-xl font-bold mb-1">Need more info?</h4>
					<p className="mb-6">
						If you have any questions about the tour, we&apos;re happy to help!
					</p>
					<Link href="/contact" className="btn-outline outline-dark">
						Contact us
					</Link>
				</div>
			</section>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
					<div className="bg-light rounded-xl max-w-sm w-full p-6 shadow-lg text-center transform transition-transform duration-200 animate-scaleIn">
						<h3 className="text-xl font-bold mb-4 text-dark">
							Booking Confirmed!
						</h3>
						<p className="mb-6 text-dark/80">
							You successfully booked the tour on{" "}
							<strong>{selectedDate?.toLocaleDateString()}</strong>.
						</p>
						<button
							onClick={() => setShowModal(false)}
							className="btn-book w-full"
						>
							Close
						</button>
					</div>
				</div>
			)}

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				@keyframes scaleIn {
					from {
						transform: scale(0.8);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.2s ease-out;
				}
				.animate-scaleIn {
					animation: scaleIn 0.2s ease-out;
				}
			`}</style>
		</main>
	);
}

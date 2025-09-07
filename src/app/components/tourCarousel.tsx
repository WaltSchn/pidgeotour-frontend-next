"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Card from "./card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Tour } from "@/types/tours";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/tours";
import clsx from "clsx";

type TourCarouselProps = {
	tours?: Tour[];
	title?: string;
	className?: string;
};

const FALLBACK_IMAGE = "/assets/images/Cinnabar.jpg";

export default function TourCarousel({
	tours,
	title,
	className,
}: TourCarouselProps) {
	const {
		data: fetchedTours,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: getTours,
		enabled: !tours,
	});

	const items = tours ?? fetchedTours ?? [];

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: "start",
		containScroll: "trimSnaps",
	});

	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(true);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setPrevDisabled(!emblaApi.canScrollPrev());
		setNextDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		return () => {
			emblaApi.off?.("select", onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	// Loading/error states
	if (isLoading)
		return (
			<div role="status" aria-live="polite" className="text-center py-8">
				Carregando passeios...
			</div>
		);
	if (error)
		return (
			<p role="alert" className="text-center text-red-600 py-8">
				Falha ao carregar os passeios
			</p>
		);
	if (items.length === 0)
		return <p className="text-center py-8">Nenhum passeio disponível</p>;

	return (
		<section
			role="region"
			aria-roledescription="carousel"
			aria-labelledby={title ? "carousel-title" : undefined}
			className={clsx("relative max-w-7xl mx-auto py-8 px-6", className)}
		>
			{title && (
				<h3
					id="carousel-title"
					className="text-xl md:text-2xl font-semibold mb-4 text-center text-dark"
				>
					{title}
				</h3>
			)}

			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex gap-3">
						{items.map((tour, index) => {
							const idStr = String(tour._id);
							return (
								<div
									key={idStr}
									data-tour-id={idStr}
									role="group"
									aria-label={`Passeio ${index + 1} de ${items.length}`}
									className="flex-none min-w-[80%] sm:min-w-[60%] md:min-w-[33%] lg:min-w-[25%]"
								>
									<Card
										title={tour.title}
										description={tour.description}
										price={tour.price}
										imageSrc={tour.images?.[0] ?? FALLBACK_IMAGE}
										tags={tour.type}
										buttonHref={idStr}
									/>
								</div>
							);
						})}
					</div>
				</div>

				{/* Carousel navigation buttons */}
				<button
					aria-label="Anterior"
					onClick={scrollPrev}
					disabled={prevDisabled}
					className="absolute top-1/2 -translate-y-1/2 left-2 md:left-[-48px] grid place-items-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-dark text-light transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
				>
					<ArrowLeft className="w-5 h-5" />
				</button>

				<button
					aria-label="Próximo"
					onClick={scrollNext}
					disabled={nextDisabled}
					className="absolute top-1/2 -translate-y-1/2 right-2 md:right-[-48px] grid place-items-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-dark text-light transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
				>
					<ArrowRight className="w-5 h-5" />
				</button>
			</div>
		</section>
	);
}

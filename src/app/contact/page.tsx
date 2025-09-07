import Header from "@/app/components/header";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
	return (
		<main className="flex flex-col min-h-screen">
			<Header transparent={false} />

			<section className="py-12 px-6 sm:px-12 lg:px-24">
				<div className="inline-block mb-10">
					<p className="text-sm font-semibold uppercase tracking-wide text-pink">
						Get in Touch
					</p>
					<h1 className="text-3xl font-bold text-dark mt-1">Contact Us</h1>
					<div className="w-24 h-[3px] bg-blue mt-2"></div>
				</div>

				<div className="max-w-2xl mx-auto space-y-6 text-dark">
					<p>
						Have questions about our tours or just want to say hello? We’d love
						to hear from you! Reach out to us using the info below:
					</p>

					<div className="space-y-4">
						{[
							{ icon: Mail, text: "support@pidgeotour.com" },
							{ icon: Phone, text: "+1 (555) 123-4567" },
							{
								icon: MapPin,
								text: "123 South Boulevard, Lumiose City, Kalos",
							},
						].map((item, i) => {
							const Icon = item.icon;
							return (
								<div
									key={i}
									className="flex items-center gap-3 hover:text-pink transition-colors"
								>
									<Icon className="w-5 h-5" />
									<span>{item.text}</span>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</main>
	);
}

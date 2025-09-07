import Footer from "./components/footer";
import "./globals.css";
import { Lexend_Exa, Montserrat } from "next/font/google";
import Providers from "./providers";

const headingFont = Lexend_Exa({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-heading",
});

const bodyFont = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-body",
});

export const metadata = {
	title: "Pidgeotour",
	description: "Full Stack Travel Website Project",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
			<body className="bg-light">
				<Providers>
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

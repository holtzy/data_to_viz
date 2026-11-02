import { PageShell } from "@/components/layouts";
import { buttonClass } from "@/lib/button";
import { KitForm } from "@/components/newsletter";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/poster.html",
  title: "Data to Viz | A classification of chart types",
  description:
    "Support the Data to Viz project with a high quality A1 poster summarizing its 6 decision trees of chart types, or get the high resolution digital version for free.",
  image: "/img/poster/poster_mockup_croped.jpg",
});

const anchors = [
  { href: "#presentation", label: "Presentation" },
  { href: "#feature", label: "Features" },
  { href: "#postage", label: "Postage" },
  { href: "#order", label: "Order" },
];

const features = [
  { title: "Size", lines: ["Landscape A1", "800mm x 600mm"] },
  { title: "Paper", lines: ["130g/m2", "100% recycled paper"] },
  { title: "Production", lines: ["1 side Offset", "CMYK print"] },
  { title: "Price", lines: ["30 euros", "(Plus shipping cost)"] },
];

const payments = [
  { href: "https://www.paypal.com/ncp/payment/QBPJASEJGXL7J", label: "Payment: FRANCE" },
  { href: "https://www.paypal.com/ncp/payment/9MUQA7YCYX6HJ", label: "Payment: EUROPE" },
  { href: "https://www.paypal.com/ncp/payment/DBGUP5YKPAEQ6", label: "Payment: WORLD" },
];

const photos = [
  { id: "poster_100_one", alt: "A batch of freshly printed Data to Viz posters" },
  { id: "poster_100_two", alt: "Data to Viz posters packed and ready to be shipped" },
  { id: "poster_100_three", alt: "Close-up of a printed Data to Viz poster" },
];

const link = "link";
const largeButton = buttonClass("secondary", "lg");
const sectionTitle = "font-heading text-[28px] leading-9 font-bold tracking-[0.03em] sm:text-[32px] sm:leading-[44px]";

export default function Page() {
  return (
    <PageShell>
      {/* Header */}
      <section id="head" className="border-b pt-16">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h1 className="font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">Poster</h1>
          <p className="mt-4 text-lg text-slate-600">
            Support the{" "}
            <a href="/" className={link}>
              Data to Viz
            </a>{" "}
            project by buying a high quality poster.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap justify-center gap-2">
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className={buttonClass(a.href === "#order" ? "primary" : "secondary")}
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Presentation */}
      <section id="presentation" className="scroll-mt-20 bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-3">
          <img
            src="/img/poster/poster_mockup_croped.jpg"
            alt="Mockup of the Data to Viz poster hanging on a wall"
            loading="lazy"
            className="w-full shadow-md lg:col-span-2"
          />
          <div className="space-y-4 text-center text-foreground/85">
            <p>
              <a href="/" className={link}>
                From Data to Viz
              </a>{" "}
              is a project that provides several decision trees leading from a data format to a set of possible
              graphs.
            </p>
            <p>
              The poster summarizes the 6 decision trees and is a useful tool for your data analytics project, or for
              teaching students the diversity of dataviz.
            </p>
            <a href="#poster_full" className={largeButton}>
              See it full screen
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="feature" className="relative scroll-mt-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/img/parallax/poster_zoom_fadded.png')] bg-cover bg-fixed bg-center"
        />
        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:grid-cols-2 sm:py-32 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-[4px] bg-background/90 p-6 text-center shadow-sm">
              <h2 className="mb-4 border-b pb-2 font-heading text-xl font-bold tracking-[0.03em]">
                {f.title}
              </h2>
              <p className="text-muted-foreground">
                {f.lines[0]}
                <br />
                {f.lines[1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Postage */}
      <section id="postage" className="scroll-mt-20 bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-3">
          <a href="#poster_full" className="lg:col-span-2">
            <img
              src="/img/poster/poster_medium.png"
              alt="The Data to Viz poster: 6 decision trees leading from data format to chart types"
              loading="lazy"
              className="mx-auto w-full max-w-2xl shadow-md"
            />
          </a>
          <div className="space-y-4 text-center text-foreground/85">
            <p>The poster will be sent by mail as soon as the payment is received. It comes in a dedicated box.</p>
            <p>
              I hope you enjoy your print and that it arrives in pristine condition. However, if you are not entirely
              satisfied, note that its value will be fully reimbursed without any discussion.
              <br />
              Contact us at{" "}
              <a href="mailto:info@conor.fr" className={link}>
                info@conor.fr
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Good news */}
      <section id="temp" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={sectionTitle}>Good News!</h2>
            <p className="mt-4 text-foreground/85">
              The first batch of poster has been sold out in a few days. But we just received a new batch of freshly
              printed posters ready to be sent all over the world!
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {photos.map((p) => (
              <a key={p.id} id={p.id} href={`/img/poster/${p.id}.jpg`} className="block overflow-hidden">
                <img
                  src={`/img/poster/${p.id}.jpg`}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full transition hover:scale-[1.02]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="order" className="scroll-mt-20 bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className={sectionTitle}>Order</h2>
          <p className="mt-4 text-foreground/85">
            Click the button below to make a fully secure payment using credit card or paypal. Note that shipping costs
            depend on your location, so please choose the appropriate button. For further enquiries, contact us by
            e-mail at{" "}
            <a href="mailto:info@conor.fr" className={link}>
              info@conor.fr
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {payments.map((p) => (
              <a key={p.href} href={p.href} className={largeButton}>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* High resolution digital poster */}
      <section id="poster_full" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
          <h2 className={sectionTitle}>High Resolution Poster</h2>
          <p className="mt-4 max-w-md text-foreground/85">
            The digital version of the <i>Data to Viz</i> poster in high resolution is pretty heavy. Enter your email
            adress below and I&apos;ll deliver it to your inbox!
          </p>
          <div className="mt-6 w-full">
            <KitForm />
          </div>
          <img
            src="/img/poster/poster_small.png"
            alt="High Resolution Poster"
            loading="lazy"
            className="mt-8 w-full max-w-sm shadow-lg"
          />
          <p className="mt-6 text-foreground/85">
            PS: you can also purchase it as a high-quality{" "}
            <a href="#order" className={link}>
              printed poster
            </a>{" "}
            🎉!
          </p>
        </div>
      </section>
    </PageShell>
  );
}

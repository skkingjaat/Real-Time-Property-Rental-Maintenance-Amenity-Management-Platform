
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Menu,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";



const navigation = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Tenants", href: "#for-tenants" },
];

const workflow = [
  {
    number: "01",
    title: "Create",
    description:
      "Submit a maintenance request or select an available amenity.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Track",
    description:
      "Follow maintenance progress and manage booking information.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "Complete",
    description:
      "Resolve the request or complete amenity usage with clear records.",
    icon: CheckCircle2,
  },
];

const benefits = [
  "Real-time maintenance visibility",
  "Date and time-based amenity booking",
  "Check-in and check-out tracking",
  "Centralized property information",
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111111]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f7f5]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-black text-white">
              <Building2 className="size-5" />
            </div>

            <div className="leading-none">
              <p className="font-bold tracking-tight">PropertyHub</p>

              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-black/45">
                Property Management Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  item.href === "#home"
                    ? "font-medium text-black transition hover:text-black/55"
                    : "font-medium text-black/55 transition hover:text-black"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 font-semibold text-black/70 transition hover:bg-black/5 hover:text-black"
            >
              Sign in
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 font-semibold text-white transition hover:bg-black/80"
            >
              Open Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-lg border border-black/10 bg-white transition hover:bg-black/5 sm:hidden"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-black/10 bg-[#f7f7f5] px-5 py-5 sm:hidden">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-black/70 transition hover:bg-black/5 hover:text-black"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-black/10 pt-4">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                Sign in
              </Link>

              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Dashboard
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-black/10"
      >
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="grid min-h-162.5 items-center gap-10 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-[46px] font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                Better Living.
                <br />
                Smarter Property
                <br />
                <span className="text-black/45">Management.</span>
              </h1>

              <p className="mt-7 max-w-xl leading-7 text-black/60 sm:text-lg">
                A centralized platform for managing maintenance, amenities,
                bookings, and everyday property operations — all in one
                professional workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-bold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black/85"
                >
                  Access Platform
                  <ArrowRight className="size-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 font-bold transition hover:border-black/20 hover:bg-black/3"
                >
                  See How It Works
                  <ChevronRight className="size-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Maintenance Tracking",
                  "Amenity Booking",
                  "Usage Management",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 font-semibold text-black/60"
                  >
                    <Check className="size-3.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative min-h-105 overflow-hidden rounded-[28px] lg:min-h-140">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                alt="Modern residential property"
                width={1800}
                height={1200}
                priority
                className="absolute inset-0 size-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/10" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/45">
                      Property Overview
                    </p>

                    <p className="mt-1 text-lg font-bold tracking-tight">
                      Operational Dashboard
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black px-2.5 py-1 text-[10px] font-bold text-white">
                    <span className="size-1.5 rounded-full bg-white" />
                    Live
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  <DashboardMetric value="24" label="Requests" />
                  <DashboardMetric value="08" label="Pending" />
                  <DashboardMetric value="16" label="Completed" />
                  <DashboardMetric value="12" label="Bookings" />
                </div>

                <div className="mt-4 rounded-xl border border-black/10 bg-[#f7f7f5] p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-bold">Recent Activity</p>

                    <span className="text-[10px] font-semibold text-black/40">
                      View all
                    </span>
                  </div>

                  <div className="space-y-2">
                    <ActivityRow
                      title="Bathroom water leakage"
                      type="Maintenance Request"
                      status="In Progress"
                    />

                    <ActivityRow
                      title="Community Hall"
                      type="Amenity Booking"
                      status="Confirmed"
                    />

                    <ActivityRow
                      title="Electrical inspection"
                      type="Maintenance Request"
                      status="Pending"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-360 grid-cols-1 divide-y divide-black/10 px-5 sm:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4 lg:px-12">
          <ValueItem
            icon={Building2}
            title="Organized Living"
            description="Everything you need in one secure platform."
          />

          <ValueItem
            icon={Users}
            title="Transparent Communication"
            description="Clear updates for tenants, owners, and staff."
          />

          <ValueItem
            icon={ShieldCheck}
            title="Conflict-Free Bookings"
            description="Real-time availability for shared amenities."
          />

          <ValueItem
            icon={Clock3}
            title="Operational Efficiency"
            description="Save time with structured workflows."
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#f7f7f5] py-20 sm:py-28">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
              Platform capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Everything important,
              <br />
              <span className="text-black/45">in one place.</span>
            </h2>

            <p className="mt-5 leading-7 text-black/55">
              Designed around the everyday workflows that matter most in
              property operations.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <FeatureImageCard
              image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85"
              icon={Wrench}
              eyebrow="Maintenance Management"
              title="Keep every maintenance request visible."
              description="Create requests, track their status, and maintain clear visibility from pending through completion."
            />

            <FeatureImageCard
              image="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85"
              icon={CalendarCheck}
              eyebrow="Amenity Booking"
              title="Make shared amenities easier to manage."
              description="View availability and manage date and time-based bookings while preventing scheduling conflicts."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-y border-black/10 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-300 px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Simple. Clear. Effective.
            </h2>

            <p className="mt-4 text-black/50">
              From request to resolution, every step is structured.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {workflow.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="relative rounded-2xl border border-black/10 bg-[#f7f7f5] p-7 text-center"
                >
                  <span className="absolute right-5 top-5 text-[10px] font-bold tracking-widest text-black/25">
                    {item.number}
                  </span>

                  <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-black/10 bg-white">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold">
                    {item.number}. {item.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs leading-6 text-black/50">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Visibility */}
      <section className="bg-[#f7f7f5] py-20 sm:py-28">
        <div className="mx-auto grid max-w-360 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
          <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white p-2 shadow-2xl shadow-black/10">
            <div className="relative overflow-hidden rounded-[18px]">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
                alt="Professional property management workspace"
                width={1800}
                height={1200}
                className="h-105 w-full object-cover sm:h-130"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
                      Dashboard
                    </p>

                    <p className="mt-1 font-bold">Property overview</p>
                  </div>

                  <span className="rounded-lg border border-black/10 px-2 py-1 text-[10px] font-semibold">
                    Today
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat title="Maintenance" value="24" />
                  <MiniStat title="Pending" value="08" />
                  <MiniStat title="Bookings" value="12" />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
              Your property, at a glance
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Make better decisions with{" "}
              <span className="text-black/45">
                real-time visibility.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-black/55">
              A centralized dashboard brings important property activity
              together so your team can understand what needs attention and
              what has already been completed.
            </p>

            <div className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 font-semibold"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
                    <Check className="size-3.5" />
                  </span>

                  {benefit}
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-bold text-white transition hover:bg-black/80"
            >
              Open Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section
        id="for-tenants"
        className="border-y border-black/10 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/45">
              Built for everyone
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Supporting the entire property community.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <AudienceCard
              image="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1000&q=85"
              icon={Users}
              title="Tenants"
              description="Raise requests, book amenities, and stay informed effortlessly."
            />

            <AudienceCard
              image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=85"
              icon={Building2}
              title="Property Owners"
              description="Maintain property operations with structured information and visibility."
            />

            <AudienceCard
              image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              icon={Users}
              title="Staff"
              description="Manage requests and bookings with clarity and efficiency."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-350 flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] lg:flex-row lg:items-center">
          <div className="relative min-h-60 flex-1 overflow-hidden lg:min-h-75">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
              alt="Modern residential property"
              width={1400}
              height={1050}
              className="absolute inset-0 size-full object-cover opacity-90"
            />
          </div>

          <div className="flex-1 px-7 py-10 text-white sm:px-10 lg:px-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
              Get started
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              Ready for a smarter property experience?
            </h2>

            <p className="mt-4 max-w-xl leading-6 text-white/85">
              Sign in to access the Property Management Platform and simplify
              everyday property operations.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-white/90"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white">
        <div className="mx-auto flex max-w-360 flex-col gap-7 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white text-black">
              <Building2 className="size-4" />
            </div>

            <div>
              <p className="font-bold">PropertyHub</p>

              <p className="text-[9px] uppercase tracking-[0.15em] text-white/85">
                Property Management Platform
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/85">
            <a href="#home" className="transition hover:text-white">
              Home
            </a>

            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>

            <a href="#for-tenants" className="transition hover:text-white">
              Property Community
            </a>
          </div>

          <p className="text-white/35">Property operations, simplified.</p>
        </div>
      </footer>
    </main>
  );
}

function DashboardMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-2.5">
      <p className="font-bold">{value}</p>

      <p className="mt-0.5 truncate text-[8px] font-medium text-black/40">
        {label}
      </p>
    </div>
  );
}

function ActivityRow({
  title,
  type,
  status,
}: {
  title: string;
  type: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-black/5 bg-white px-3 py-2.5">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-black text-white">
        <CheckCircle2 className="size-3.5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-bold">{title}</p>

        <p className="mt-0.5 truncate text-[8px] text-black/40">
          {type}
        </p>
      </div>

      <span className="shrink-0 rounded-full bg-black/6 px-2 py-1 text-[8px] font-bold text-black/60">
        {status}
      </span>
    </div>
  );
}

function ValueItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 px-5 py-7 lg:px-8">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#f7f7f5]">
        <Icon className="size-4" />
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 leading-5 text-black/45">{description}</p>
      </div>
    </div>
  );
}

function FeatureImageCard({
  image,
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  image: string;
  icon: typeof Wrench;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <article className="group relative min-h-130 overflow-hidden rounded-[24px] bg-black">
      <Image
        src={image}
        alt={eyebrow}
        width={1800}
        height={1200}
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/5" />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-black text-white">
          <Icon className="size-5" />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
          {eyebrow}
        </p>

        <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>

        <p className="mt-3 max-w-xl leading-6 text-black/50">
          {description}
        </p>

        <Link
          href="/login"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 font-bold text-white transition hover:bg-black/80"
        >
          Learn More
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-3">
      <p className="font-bold">{value}</p>

      <p className="mt-1 text-[8px] text-black/40">{title}</p>
    </div>
  );
}

function AudienceCard({
  image,
  icon: Icon,
  title,
  description,
}: {
  image: string;
  icon: typeof Users;
  title: string;
  description: string;
}) {
  return (
    <article className="group relative min-h-95 overflow-hidden rounded-2xl bg-black">
      <Image
        src={image}
        alt={title}
        width={1000}
        height={750}
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/40 bg-white/95 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-black text-white">
            <Icon className="size-4" />
          </div>

          <h3 className="font-bold">{title}</h3>
        </div>

        <p className="mt-3 leading-6 text-black/50">{description}</p>
      </div>
    </article>
  );
}

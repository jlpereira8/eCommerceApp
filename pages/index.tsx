import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import sampleProduct from "./images/sample-product.jpg";
import LinenShirt from "./images/ln_1.jpg";
import Ln2 from "./images/ln_2.jpg";
import Ln3 from "./images/ln_3.jpg";
import Ln4 from "./images/ln_4.jpg";
import Ln5 from "./images/ln_5.jpg";
import Ln6 from "./images/ln_6.jpg";
import Ln7 from "./images/ln_7.jpg";
import Ln8 from "./images/ln_8.jpg";
import Ln9 from "./images/ln_9.jpg";
import Ln10 from "./images/ln_10.jpg";
import Ln11 from "./images/ln_11.jpg";
import Ln12 from "./images/ln_12.jpg";
import Ln13 from "./images/ln_13.jpg";
import Ln14 from "./images/ln_14.jpg";
import Ln15 from "./images/ln_15.jpg";
import Ln16 from "./images/ln_16.jpg";

// Deterministic pseudo-random price based on numeric id (SSR-safe)
function getStablePrice(id: number) {
  // Linear congruential generator-ish, stable across server/client
  const seed = (id * 9301 + 49297) % 233280;
  const r = seed / 233280; // 0..1
  const price = 20 + r * 100; // €20..€120
  return price;
}

export default function HomeTemplate() {
  const [showSubscribed, setShowSubscribed] = useState(false);
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full p-6 space-y-10 min-h-screen flex flex-col">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          <div className="md:col-span-3 col-span-1">
            <div className="rounded-2xl bg-offwhite dark:bg-gray-900 ring-1 ring-line shadow p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Image */}
                <div className="w-full overflow-hidden rounded-xl bg-inputbackground dark:bg-gray-800 ring-1 ring-line">
                  <Image
                    src={sampleProduct}
                    alt="Featured product preview"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Copy */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20">
                      New Arrival
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                      Limited
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-title dark:text-offwhite">
                    Retro Linen Overshirt
                  </h2>

                  <p className="mt-2 text-sm md:text-base text-body dark:text-offwhite/80">
                    Lightweight, breathable, and cut with a relaxed silhouette. Finished with corozo buttons and reinforced seams,
                    because quality is a feature, not a marketing slogan.
                  </p>

                  {/* Meta / Price */}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="text-xl md:text-2xl font-semibold text-title dark:text-offwhite">$129</div>
                    <div className="text-sm text-label">In stock · Free shipping over $100</div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-offwhite shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.99]"
                    >
                      Add to Cart
                    </button>
                    <a
                      href="/collections"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-line text-title hover:bg-offwhite/70 dark:hover:bg-gray-800"
                    >
                      View Details
                    </a>
                  </div>

                  {/* Tiny bullets */}
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-label">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Organic fabric
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Made responsibly
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span> 30-day returns
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="md:col-span-3 col-span-1">
            <h2 className="mb-3 text-xl font-semibold text-title dark:text-offwhite">Recommended for You</h2>
            <div className="overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {[
                  { id: 1, title: 'Linen Shirt', category: 'Men', color: '#A8715A', price: 89, rating: 4 },
                  { id: 2, title: 'Wrap Dress', category: 'Women', color: '#DD8560', price: 139, rating: 5 },
                  { id: 3, title: 'Canvas Tote', category: 'Accessories', color: '#333333', price: 49, rating: 4 },
                  { id: 4, title: 'Relaxed Tee', category: 'Men', color: '#888888', price: 35, rating: 3 },
                  { id: 5, title: 'Silk Scarf', category: 'Accessories', color: '#E0CFBA', price: 59, rating: 5 },
                  { id: 6, title: 'Evening Blazer', category: 'Women', color: '#000000', price: 219, rating: 4 },
                  { id: 7, title: 'Wool Cardigan', category: 'Men', color: '#556B2F', price: 99, rating: 4 },
                  { id: 8, title: 'Leather Boots', category: 'Women', color: '#654321', price: 179, rating: 5 },
                  { id: 9, title: 'Denim Jacket', category: 'Unisex', color: '#1E3A8A', price: 129, rating: 4 },
                ].map((p) => (
                  <a
                    key={p.id}
                    href="#"
                    className="snap-start min-w-[200px] w-56 shrink-0 rounded-2xl ring-1 ring-line bg-offwhite dark:bg-gray-900 shadow hover:shadow-md transition-shadow mt-4 first:ml-6 last:mr-4"
                  >
                    <div className="p-3">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-inputbackground dark:bg-gray-800 ring-1 ring-line">
                        <Image
                          src={
                            p.id === 1 ? LinenShirt :
                            p.id === 2 ? Ln2 :
                            p.id === 3 ? Ln3 :
                            p.id === 4 ? Ln4 :
                            p.id === 5 ? Ln5 :
                            p.id === 6 ? Ln6 :
                            p.id === 7 ? Ln14 :
                            p.id === 8 ? Ln15 :
                            Ln16
                          }
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="224px"
                          priority={false}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-label">
                        <span className="uppercase tracking-wide">{p.category}</span>
                        <span
                          className="h-3 w-3 rounded-full ring-1 ring-line"
                          style={{ backgroundColor: p.color }}
                          aria-label={`Color ${p.color}`}
                        />
                      </div>
                      <div className="mt-1 text-sm font-semibold text-title dark:text-offwhite">{p.title}</div>
                      <div className="mt-1 flex items-center gap-1 text-[11px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            aria-hidden
                            viewBox="0 0 20 20"
                            className={i < p.rating ? 'h-3.5 w-3.5 text-primary' : 'h-3.5 w-3.5 text-placeholder'}
                            fill="currentColor"
                          >
                            <path d="M10 15l-5.878 3.09L5.82 11.545.943 7.41l6.09-.885L10 1l2.967 5.525 6.09.885-4.878 4.135 1.697 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-title dark:text-offwhite tabular-nums">
                        €{getStablePrice(p.id).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop by Category */}
          <div className="md:col-span-3 col-span-1">
            <h2 className="mb-3 text-xl font-semibold text-title dark:text-offwhite">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Men', href: '/collections/men' },
                { title: 'Women', href: '/collections/women' },
                { title: 'Accessories', href: '/collections/accessories' },
              ].map((c) => (
                <a key={c.title} href={c.href} className="group relative overflow-hidden rounded-2xl bg-offwhite dark:bg-gray-900 ring-1 ring-line shadow">
                  <div className="relative w-full h-64 overflow-hidden rounded-t-2xl bg-inputbackground dark:bg-gray-800">
                    <Image
                      src={
                        c.title === 'Men' ? Ln7 :
                        c.title === 'Women' ? Ln8 :
                        Ln9
                      }
                      alt={c.title}
                      width={480}
                      height={480}
                      className="object-cover w-full h-full"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-4 backdrop-blur-sm bg-offwhite/70 dark:bg-gray-900/70 ring-1 ring-line">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-title dark:text-offwhite">{c.title}</div>
                        <span className="text-sm font-semibold text-primary group-hover:underline">Explore →</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Featured Collections */}
          <div className="md:col-span-2 col-span-1">
            <div className="rounded-2xl bg-offwhite dark:bg-gray-900 ring-1 ring-line shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-title dark:text-offwhite">Featured Collections</h2>
                <a href="/collections" className="text-sm font-semibold text-primary hover:underline">View all</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{title:'Summer Linen',href:'/collections/summer-linen'},{title:'Classic Tees',href:'/collections/classic-tees'},{title:'Evening Wear',href:'/collections/evening'},{title:'Vintage Finds',href:'/collections/vintage'}].map((col) => (
                  <a key={col.title} href={col.href} className="group overflow-hidden rounded-2xl ring-1 ring-line bg-offwhite dark:bg-gray-900 shadow">
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-inputbackground dark:bg-gray-800">
                      <Image
                        src={
                          col.title === 'Summer Linen' ? Ln10 :
                          col.title === 'Classic Tees' ? Ln11 :
                          col.title === 'Evening Wear' ? Ln12 :
                          Ln13
                        }
                        alt={col.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="font-semibold text-title dark:text-offwhite">{col.title}</div>
                      <span className="text-sm font-semibold text-primary group-hover:underline">Shop →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Side card: Why shop with us */}
          <div className="md:col-span-1 col-span-1">
            <div className="bg-offwhite dark:bg-gray-900 text-title dark:text-offwhite rounded-2xl ring-1 ring-line shadow p-6 h-full">
              <h2 className="text-2xl font-semibold mb-4">Why Évoque?</h2>
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">Sustainable Materials</div>
                    <div className="text-label">Organic fabrics and responsible manufacturing.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">Free Shipping $100+</div>
                    <div className="text-label">Fast, tracked delivery on qualifying orders.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">30‑Day Returns</div>
                    <div className="text-label">No fuss. Love it or send it back.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">Exclusive Designs</div>
                    <div className="text-label">Limited collections you won’t find anywhere else.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">Customer Support</div>
                    <div className="text-label">Friendly assistance to help you shop with confidence.</div>
                  </div>
                </li>
              </ul>

              <div className="my-5 border-t border-line"></div>

              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setShowSubscribed(true); }}>
                <label className="block text-sm font-semibold">Get 10% off your first order</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-inputbackground px-3 py-2 ring-1 ring-line placeholder:text-placeholder focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-offwhite hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
        {showSubscribed && (
          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-6"
          >
            <div className="fixed inset-0 bg-black/40" />
            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-offwhite dark:bg-gray-900 ring-1 ring-line shadow-xl p-6 text-center">
              <div className="mt-3 mb-1 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-14 w-14 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-2.823a.75.75 0 10-1.22-.906l-3.884 5.234-1.86-1.86a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4.387-5.939z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-title dark:text-offwhite">You’ve successfully subscribed</h3>
              <p className="mt-2 text-sm text-body dark:text-offwhite/80">
                Thanks for joining Évoque. Check your inbox for a welcome email.
              </p>
              <button
                type="button"
                onClick={() => setShowSubscribed(false)}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-offwhite hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  );
}
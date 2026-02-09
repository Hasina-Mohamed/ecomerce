import React from 'react';
import { Check } from 'lucide-react';

const OurStory = () => {
  return (
    <div className="font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop"
            alt="Forest Landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light text-slate-200">
            Crafting a legacy of sustainable luxury since 2024.
          </p>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              From the Forest <br /> to the <span className="text-luxe-green">Atelier</span>.
            </h2>
            <p className="text-slate-500 leading-loose text-lg">
              Luxe Retail was born from a quiet walk through the emerald forests of the Pacific Northwest. We realized that true luxury isn't about excess—it's about intention.
              <br /><br />
              We set out to create a brand that honors the raw beauty of natural materials while upholding the highest standards of modern craftsmanship. Every piece in our collection is a dialogue between nature and design.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-[#FDFBF7] p-6 rounded-xl border border-slate-100">
                <h3 className="text-4xl font-black text-luxe-green mb-2">100%</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Ethical Sourcing</p>
              </div>
              <div className="bg-[#FDFBF7] p-6 rounded-xl border border-slate-100">
                <h3 className="text-4xl font-black text-luxe-green mb-2">0%</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Carbon Footprint</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-luxe-gold/10 transform translate-x-6 translate-y-6 rounded-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop"
              alt="Craftsmanship"
              className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Luxe Standard</h2>
            <p className="text-slate-500">We believe in quality over quantity, and that style should never come at the cost of the planet.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Sustainable Materials', desc: 'We only use organic, recycled, or upcycled fabrics in our collections.', img: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=600&auto=format&fit=crop' },
              { title: 'Artisan Craftsmanship', desc: 'Each garment is hand-finished by master tailors in our Portugal studio.', img: 'https://images.unsplash.com/photo-1456428740021-365979890984?q=80&w=600&auto=format&fit=crop' },
              { title: 'Transparency', desc: 'We believe you have the right to know exactly where your clothes come from.', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-luxe-green text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-serif italic leading-tight mb-8">
            "We don't just design clothes. We design a way of living that respects the rhythm of nature."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt="Founder"
              className="w-16 h-16 rounded-full border-2 border-white/30 object-cover"
            />
            <div className="text-left">
              <p className="font-bold text-lg">Elena V.</p>
              <p className="text-emerald-200 text-sm uppercase tracking-widest font-bold">Founder & Creative Director</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurStory;
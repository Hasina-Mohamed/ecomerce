import React from 'react';
import { MapPin, Mail, Phone, Send, Share2, Globe, Aperture } from 'lucide-react'; // Icons

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12 lg:py-24">

        {/* Header Section */}
        <div className="mb-16 max-w-2xl">
          <p className="text-luxe-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            We'd love to hear from <br /> you.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Our concierge team is available to assist with private viewings, order inquiries, and design consultations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-12">

            {/* Info Cards */}
            <div className="space-y-8">
              {/* Atelier */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-luxe-green shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Our Atelier</h3>
                  <p className="text-slate-500 leading-relaxed">
                    123 Forest Avenue, Suite 400<br />
                    Green Grove, NY 10012
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-luxe-green shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                  <p className="text-slate-500 mb-1">concierge@luxeretail.com</p>
                  <p className="text-xs text-slate-400">Average response: 24h</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-luxe-green shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us</h3>
                  <p className="text-slate-500 mb-1">+1 (555) 010-9988</p>
                  <p className="text-xs text-slate-400">Mon-Fri: 9am - 6pm EST</p>
                </div>
              </div>
            </div>

            {/* Map Image Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative pt-[60%] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                alt="Map Location"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Map Pin Overlay */}
                <div className="bg-luxe-green text-white p-2 rounded-full shadow-xl">
                  <MapPin size={24} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Connect Section */}
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-6">Connect With Us</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"><Share2 size={18} /></button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"><Globe size={18} /></button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"><Aperture size={18} /></button>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-luxe-green/20 outline-none transition-all placeholder:text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-luxe-green/20 outline-none transition-all placeholder:text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <select className="w-full px-4 py-3 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-luxe-green/20 outline-none transition-all text-slate-600 cursor-pointer">
                    <option>Select an option</option>
                    <option>Order Inquiry</option>
                    <option>Product Information</option>
                    <option>Press & Media</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea rows="6" placeholder="How can we help you?" className="w-full px-4 py-3 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-luxe-green/20 outline-none transition-all placeholder:text-slate-400 resize-none"></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                    Send Message <Send size={18} />
                  </button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                  By submitting this form, you agree to our <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service</span>.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
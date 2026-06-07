import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Star, ShieldCheck, Clock, MapPin, 
  Briefcase, Plane, Users, Car, Calendar, Phone, Mail, 
  Building, CheckCircle2, ArrowRight, Globe, Smartphone, 
  Leaf, Shield, Award, FileText, Map, Navigation
} from 'lucide-react';

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-center justify-center select-none cursor-pointer">
    <div className="flex items-baseline">
      <span 
        className="font-heading text-[42px] font-black italic text-navy-900 leading-none tracking-tighter" 
        style={{ transform: 'skewX(-12deg)', paddingRight: '4px' }}
      >
        ATC
      </span>
    </div>
    <div className="w-full h-[3px] bg-red-600 mt-0.5 mb-1"></div>
    <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-wide text-navy-900 uppercase whitespace-nowrap">
      Anshika Travel Company
    </span>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-200 rounded-sm";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    secondary: "bg-navy-900 text-white hover:bg-navy-800 shadow-sm",
    outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-50",
    ghost: "text-navy-900 hover:bg-gray-100"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const TopBar = () => (
  <div className="hidden lg:block bg-navy-900 text-white text-xs py-2">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <span className="flex items-center"><Phone className="w-3 h-3 mr-2 text-red-600" /> 24/7 Support Available</span>
        <span className="flex items-center"><Mail className="w-3 h-3 mr-2 text-red-600" /> corporate@atcindia.com</span>
        <span className="flex items-center text-gray-300"><FileText className="w-3 h-3 mr-2 text-red-600" /> GST Registered: MH & DL</span>
      </div>
      <div className="flex items-center space-x-6">
        <a href="#compliance" className="hover:text-red-600 transition-colors">Corporate Compliance</a>
        <a href="#offices" className="hover:text-red-600 transition-colors">Our Offices</a>
        <a href="#" className="flex items-center font-semibold text-red-600 hover:text-white transition-colors">
          Corporate Login <ChevronRight className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  </div>
);

const Header = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Value Prop', href: '#value' },
    { name: 'Network', href: '#offices' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-0 bg-white shadow-md py-3' : 'top-0 lg:top-8 bg-white/95 backdrop-blur-md py-4 lg:py-5 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="z-50"><Logo /></a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-navy-900 hover:text-red-600 transition-colors">
                {link.name}
              </a>
            ))}
            <Button onClick={onOpenQuote}>Request Quote</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden z-50 p-2 text-navy-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-navy-900 py-3 border-b border-gray-50"
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full mt-4 py-4" onClick={() => { setIsMobileMenuOpen(false); onOpenQuote(); }}>
                Request Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState('corporate');

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
          alt="Corporate Transport" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-navy-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20">
              Anshika Travel Company India Pvt. Ltd.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-white leading-[1.1] mb-6">
              Corporate Mobility & <span className="text-red-600">Travel Solutions.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light mx-auto lg:mx-0">
              Delivering reliable, professional, and scalable transportation solutions for businesses and individuals across India.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button className="w-full sm:w-auto text-base px-8 py-4">
                Explore Services
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-4 border-white text-white hover:bg-white/10">
                Partner With Us
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'corporate', label: 'Corporate' },
                  { id: 'local', label: 'Local Taxi' },
                  { id: 'outstation', label: 'Outstation' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === tab.id ? 'text-navy-900 border-b-2 border-red-600 bg-white' : 'text-gray-500 hover:text-navy-900 hover:bg-gray-50 border-b-2 border-transparent bg-gray-50/50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-heading font-bold text-navy-900 mb-4">Quick Booking Inquiry</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Pick-up Location" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-navy-900 font-medium" />
                  </div>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Drop-off Location" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-navy-900 font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-navy-900 font-medium" />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input type="time" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-navy-900 font-medium" />
                    </div>
                  </div>
                </div>
                <Button className="w-full py-4 text-base mt-2">Check Availability</Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  24/7 Availability • Doorstep Pickup • Transparent Pricing
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Company Overview</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-6">
              Professional Travel & Transport Service Provider
            </h3>
            <div className="w-20 h-1 bg-red-600 mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              <strong className="text-navy-900 font-bold">Anshika Travel Company India Pvt. Ltd.</strong> is a professional travel and transport service provider offering reliable car rental and mobility solutions across India. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We position ourselves as a premier Corporate Mobility and Travel Solutions Provider. Our core focus is on delivering unparalleled customer satisfaction, maintaining affordability, and ensuring maximum operational efficiency for both individual and business clients.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <ShieldCheck className="w-8 h-8 text-red-600 mb-2" />
                <h4 className="font-bold text-navy-900">Reliability</h4>
                <p className="text-sm text-gray-600">On-time service guaranteed</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Award className="w-8 h-8 text-red-600 mb-2" />
                <h4 className="font-bold text-navy-900">Professionalism</h4>
                <p className="text-sm text-gray-600">Verified & trained drivers</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop" 
                alt="Corporate Fleet" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-navy-900 text-white p-8 rounded-xl shadow-xl hidden md:block border-b-4 border-red-600">
              <div className="text-4xl font-heading font-black text-white mb-2">24/7</div>
              <div className="text-sm font-bold uppercase tracking-wider text-red-500">Operations & Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { number: "500+", label: "Corporate Clients" },
    { number: "10k+", label: "Monthly Trips" },
    { number: "20+", label: "Cities Covered" },
    { number: "99%", label: "On-Time Record" }
  ];

  return (
    <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-heading font-black text-red-500 mb-2">{stat.number}</div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      icon: <Briefcase />, 
      title: "Corporate Travel", 
      desc: "Dedicated fleet for employee transportation, executive movement, and client visits.",
      features: ["Monthly billing cycles", "Dedicated account managers", "GPS tracking & reporting", "Customized corporate packages"],
      img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      icon: <Car />, 
      title: "Local Taxi Services", 
      desc: "Point-to-point city transfers, full-day and half-day rentals (8hrs/80km, 4hrs/40km).",
      features: ["Doorstep pickup & drop", "Experienced local chauffeurs", "Clean & sanitized vehicles", "Flexible hourly packages"],
      img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      icon: <MapPin />, 
      title: "Outstation Travel", 
      desc: "Intercity travel with flexible booking options including one-way drops or round trips.",
      features: ["Transparent per-km pricing", "Toll & tax management", "Highway-experienced drivers", "24/7 roadside assistance"],
      img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop"
    },
    { 
      icon: <Plane />, 
      title: "Airport Transfers", 
      desc: "Punctual pickup and drop services for all major airports. Never miss a flight.",
      features: ["Real-time flight tracking", "Meet-and-greet services", "Waiting time flexibility", "Luggage assistance"],
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
    },
    { 
      icon: <Calendar />, 
      title: "Event & Wedding Transport", 
      desc: "Comprehensive ground transportation management for large-scale events and weddings.",
      features: ["Dedicated event coordinators", "Luxury vehicle options", "Bulk booking discounts", "Seamless guest mobility"],
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Core Services</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-4">Our Mobility Solutions</h3>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">Comprehensive travel services tailored for individual and enterprise needs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 flex items-center text-white">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <h4 className="text-xl font-heading font-bold">{service.title}</h4>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{service.desc}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="inline-flex items-center font-bold text-red-600 hover:text-navy-900 transition-colors text-sm uppercase tracking-wide mt-auto">
                  Explore Service <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueProposition = () => {
  const features = [
    { icon: <Clock />, title: "24/7 Availability", desc: "Round-the-clock service and support." },
    { icon: <MapPin />, title: "Doorstep Pickup & Drop", desc: "Ultimate convenience for every ride." },
    { icon: <FileText />, title: "Transparent Pricing", desc: "No hidden costs, clear billing." },
    { icon: <ShieldCheck />, title: "Verified Drivers", desc: "Professional, trained, and background-checked." },
    { icon: <Car />, title: "Well-Maintained Vehicles", desc: "Clean, sanitized, and regularly serviced." },
  ];

  const values = [
    "Safe and comfortable travel experience",
    "On-time service guarantee",
    "Affordable and competitive pricing",
    "Customized travel solutions for businesses",
    "Expanding pan-India presence"
  ];

  return (
    <section id="value" className="py-24 bg-navy-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Key Features */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Key Features</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-10">Why Choose ATC</h3>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mr-4 flex-shrink-0">
                    {React.cloneElement(feature.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white text-navy-900 rounded-2xl p-8 md:p-12 shadow-2xl h-full flex flex-col justify-center border-t-8 border-red-600">
              <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Value Proposition</h2>
              <h3 className="text-3xl font-heading font-black mb-8">Delivering Excellence</h3>
              
              <ul className="space-y-6">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 mr-4 flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-gray-500 italic">
                  "Our focus remains steadfast on customer satisfaction, affordability, and operational efficiency."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "ATC has transformed our employee transportation. Their automated billing and GPS tracking ensure 100% compliance and safety.",
      author: "Rajesh Kumar",
      role: "VP Operations, Tech Mahindra",
      rating: 5
    },
    {
      quote: "The level of professionalism from their drivers and the condition of their luxury fleet is unmatched in the industry.",
      author: "Priya Sharma",
      role: "Event Director, Global Summits",
      rating: 5
    },
    {
      quote: "We rely on ATC for all our executive airport transfers across Mumbai and Delhi. They have never missed a pickup.",
      author: "Amit Desai",
      role: "CEO, FinServe India",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Client Success</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-6">What Our Partners Say</h3>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="flex text-red-500 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-600 italic mb-8 relative z-10">"{t.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 font-bold text-lg mr-4">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">{t.author}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Fleet = () => {
  const categories = [
    { name: "Sedans", models: "Dzire, Etios", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" },
    { name: "SUVs", models: "Innova, Ertiga", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop" },
    { name: "Luxury Cars", models: "BMW, Mercedes", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop" },
    { name: "High Capacity", models: "Tempo Travellers and Buses", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" },
  ];

  return (
    <section id="fleet" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Fleet Information</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-6">Vehicles for Every Requirement</h3>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">From economical sedans to luxury coaches, our meticulously maintained fleet ensures comfort and safety.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-gray-900 border border-gray-200 shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-10 h-1 bg-red-600 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h4 className="text-2xl font-heading font-bold text-white mb-1">{cat.name}</h4>
                <p className="text-gray-300 font-medium text-sm">{cat.models}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Technology = () => {
  return (
    <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-10 object-cover mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Tech-Enabled Mobility</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-6">Smart Transport Solutions</h3>
            <div className="w-20 h-1 bg-red-600 mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              We leverage cutting-edge technology to provide seamless, secure, and transparent mobility solutions for our corporate partners.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Smartphone className="text-red-500" />, title: "Mobile Application", desc: "Easy booking, real-time tracking, and instant invoicing." },
                { icon: <Map className="text-red-500" />, title: "GPS Tracking", desc: "Live vehicle monitoring for enhanced safety and compliance." },
                { icon: <Shield className="text-red-500" />, title: "Automated Billing", desc: "Transparent, error-free corporate invoicing and MIS reports." }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Technology Dashboard" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center space-x-4">
                <Globe size={32} />
                <div>
                  <div className="text-2xl font-heading font-black">100%</div>
                  <div className="text-xs font-bold uppercase tracking-wider">Digital Compliance</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    "IT & ITES", "Banking & Finance", "Manufacturing", 
    "Healthcare", "Consulting", "Retail & FMCG"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Sectors We Serve</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-6">Trusted by Industry Leaders</h3>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">We provide specialized mobility solutions tailored to the unique operational requirements of various industries.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {industries.map((ind, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center hover:bg-navy-900 hover:text-white transition-colors duration-300 group cursor-pointer shadow-sm"
            >
              <Building className="w-8 h-8 mx-auto mb-4 text-red-600 group-hover:text-red-500 transition-colors" />
              <h4 className="font-bold text-lg">{ind}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Clientele = () => {
  // Placeholder logos for B2B clients
  const clients = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/2560px-Toyota_carlogo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by Leading Enterprises</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {clients.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt="Client Logo" 
              className="h-6 md:h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CorporateCompliance = () => {
  return (
    <section id="offices" className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Pan-India Presence</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-black text-navy-900 mb-6">Registered Corporate Offices</h3>
          <p className="text-lg text-gray-600">Anshika Travel Company India Pvt. Ltd. operates as a fully compliant, GST-registered corporate entity across major Indian hubs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Maharashtra Office */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">HEAD OFFICE</div>
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 mr-4">
                <Building size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-heading font-bold text-navy-900">Mumbai, Maharashtra</h4>
                <p className="text-sm font-semibold text-gray-500">Jurisdictional Office: MUMBAI</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  1st Floor, Office No. 9A/55, Samitha Complex,<br/>
                  C.T.S. Number Off A K Road Sakinaka,<br/>
                  Mohili Village, Mumbai Suburban,<br/>
                  Maharashtra - 400072
                </p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-md border border-gray-100">
                <FileText className="w-5 h-5 text-navy-900 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">GSTIN Registration</p>
                  <p className="text-navy-900 font-mono font-bold">27AAZCA3318F1ZG</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delhi Office */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-navy-900 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">REGIONAL OFFICE</div>
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 mr-4">
                <Building size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-heading font-bold text-navy-900">New Delhi, Delhi</h4>
                <p className="text-sm font-semibold text-gray-500">Jurisdictional Office: DELHI</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  F/F, Building No. H-83,<br/>
                  KH NO 21/14, Adhyapak Nagar Nangloi,<br/>
                  West Delhi, New Delhi,<br/>
                  Delhi - 110041
                </p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-md border border-gray-100">
                <FileText className="w-5 h-5 text-navy-900 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">GSTIN Registration</p>
                  <p className="text-navy-900 font-mono font-bold">07AAZCA3318F1ZI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leadership */}
        <div className="bg-navy-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">Corporate Governance</h4>
            <h5 className="text-2xl font-heading font-bold mb-6">Board of Directors</h5>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Indu</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Director</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Harish</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const CTASection = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  return (
    <section className="py-24 bg-red-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
          Ready to Upgrade Your Corporate Mobility?
        </h2>
        <p className="text-xl text-red-100 mb-10 font-medium">
          Partner with Anshika Travel Company for scalable, professional, and tech-driven transport solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" className="text-lg px-10 py-4" onClick={onOpenQuote}>
            Request a Proposal <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="text-lg px-10 py-4 border-white text-white hover:bg-white/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="mb-6 bg-white inline-block p-4 rounded-lg"><Logo /></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Anshika Travel Company India Pvt. Ltd. is a premier Corporate Mobility and Travel Solutions Provider, ensuring safe, reliable, and professional mobility across India.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6 text-white">Core Services</h4>
            <ul className="space-y-3">
              {['Local Taxi Services', 'Outstation Travel', 'Airport Transfers', 'Corporate Travel', 'Event & Wedding Transport'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6 text-white">Mumbai Head Office</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">1st Floor, Office No. 9A/55, Samitha Complex, Sakinaka, Mumbai, MH - 400072</span>
              </li>
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-mono">GST: 27AAZCA3318F1ZG</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6 text-white">Delhi Regional Office</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">F/F, H-83, KH NO 21/14, Adhyapak Nagar Nangloi, New Delhi, DL - 110041</span>
              </li>
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-mono">GST: 07AAZCA3318F1ZI</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 font-medium">
            © {new Date().getFullYear()} Anshika Travel Company India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
            <div>
              <h3 className="text-2xl font-heading font-black text-navy-900">Request a Proposal</h3>
              <p className="text-sm text-gray-500 mt-1">Fill out the form below and our corporate sales team will contact you.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition-colors bg-white p-2 rounded-full shadow-sm">
              <X size={20} />
            </button>
          </div>
          
          <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Quote request submitted successfully!'); onClose(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">Company Name *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="Your Company" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">Contact Person *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">Corporate Email *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">Phone Number *</label>
                <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">Service Required *</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50 text-navy-900">
                  <option>Local Taxi Services</option>
                  <option>Outstation Travel</option>
                  <option>Airport Transfers</option>
                  <option>Corporate Travel</option>
                  <option>Event & Wedding Transport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-2">City of Operation</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="e.g. Mumbai, Delhi" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-900 mb-2">Additional Requirements</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all bg-gray-50" placeholder="Tell us more about your fleet size requirements, shifts, etc..."></textarea>
            </div>
            <div className="pt-4 flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919899173772"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
      </svg>
      <span className="absolute right-full mr-4 bg-white text-navy-900 px-3 py-1 rounded-md text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

// --- Main App ---

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 selection:bg-red-600 selection:text-white">
      <TopBar />
      <Header onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <main>
        <Hero />
        <Clientele />
        <About />
        <Stats />
        <Services />
        <ValueProposition />
        <Testimonials />
        <Fleet />
        <Technology />
        <Industries />
        <CorporateCompliance />
        <CTASection onOpenQuote={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

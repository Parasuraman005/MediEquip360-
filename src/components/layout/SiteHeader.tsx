import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone, Mail, ChevronDown, Stethoscope, ArrowRight, LifeBuoy } from 'lucide-react';
import { categories } from '../../data/categories';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium text-xs xl:text-sm transition-colors py-2 px-1 border-b-2 ${
      isActive
        ? 'text-[#0f3b6c] border-[#0f3b6c]'
        : 'text-slate-600 border-transparent hover:text-[#0f3b6c] hover:border-slate-300'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-slate-200">
      {/* Top contact bar */}
      <div className="bg-[#0f3b6c] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-sky-200">
              <Phone className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span>+91 00000 00000 (Demo)</span>
            </span>
            <span className="flex items-center gap-1.5 text-sky-200">
              <Mail className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span>demo@mediequip360.example</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-200">
            <span>Smarter Medical Equipment. Better Healthcare.</span>
            <span>|</span>
            <span className="bg-sky-800/80 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-sky-200">Demo Platform</span>
          </div>
        </div>
      </div>

      {/* Main header navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0f3b6c] flex items-center justify-center text-white shadow-md group-hover:bg-[#0b2d52] transition-colors shrink-0">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f3b6c]">
                MediEquip<span className="text-[#0284c7]">360</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Healthcare Procurement Demo
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/catalog" className={navLinkClass}>
              Equipment Catalog
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-medium text-xs xl:text-sm text-slate-600 hover:text-[#0f3b6c] transition-colors py-2"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/catalog"
                    className="block px-4 py-2.5 text-sm font-semibold text-[#0f3b6c] hover:bg-sky-50 border-b border-slate-100"
                    onClick={() => setCategoriesDropdownOpen(false)}
                  >
                    All Equipment Categories
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/catalog?category=${cat.name}`}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-[#0f3b6c] transition-colors"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/support-ticket" className={navLinkClass}>
              <span className="flex items-center gap-1">
                <LifeBuoy className="w-3.5 h-3.5 text-sky-600" />
                <span>Product Support</span>
              </span>
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>

          {/* Search and Action Buttons */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4">
            <form onSubmit={handleSearchSubmit} className="relative w-36 xl:w-48">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-1.5 pl-3.5 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f3b6c]">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <Link
              to="/request-quote"
              className="bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-3 xl:px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center gap-1.5 shrink-0"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#0f3b6c] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-4 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <Link
            to="/"
            className="block py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className="block py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Equipment Catalog
          </Link>
          <div className="pl-4 space-y-1.5 border-l-2 border-slate-100 my-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categories</div>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.name}`}
                className="block py-1 text-xs sm:text-sm text-slate-600 hover:text-[#0f3b6c]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link
            to="/services"
            className="block py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/support-ticket"
            className="flex items-center gap-2 py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LifeBuoy className="w-4 h-4 text-sky-600" />
            <span>Product Support</span>
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-sm sm:text-base font-medium text-slate-800 hover:text-[#0f3b6c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          <div className="pt-2">
            <Link
              to="/request-quote"
              className="w-full text-center block bg-[#0f3b6c] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm shadow uppercase tracking-wider"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

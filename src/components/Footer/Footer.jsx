import { Link } from "react-router-dom"
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Facebook, Twitter, Instagram, Mail, Phone, Clock, Stethoscope } from "lucide-react"
import logo from '../../assets/logo/logo2.png';

function Footer() {
  console.log('entered footer')
  return (
    <footer className="bg-gray-50 text-gray-900 mt-5">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            className="h-16 w-39 mb-4  "
            alt="DocNow Logo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-black-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-black-600 transition-colors">Our Services</Link></li>
              <li><Link href="/doctors" className="hover:text-black-600 transition-colors">Our Doctors</Link></li>
              <li><Link href="/appointments" className="hover:text-black-600 transition-colors">Book Appointment</Link></li>
              <li><Link href="/faq" className="hover:text-black-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-black-600" />
                <a href="mailto:info@medicare-clinic.com" className="hover:text-black-600 transition-colors">info@medicare-clinic.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-black-600" />
                <a href="tel:+1234567890" className="hover:text-black-600 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-black-600" />
                Mon-Fri: 9am-5pm
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-black-600 hover:text-black-800 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-black-600 hover:text-black-800 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-black-600 hover:text-black-800 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white text-black-900 border-black-200 focus:border-black-400 focus:ring-black-400"
              />
              <Button type="submit" className="bg-black-600 text-white hover:bg-black-700 transition-colors">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black-200 text-center">
          <p>&copy; {new Date().getFullYear()} MediCare Clinic. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-sm hover:text-black-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-black-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import logo from '../../assets/logo/logo2.png';
import { fetchAdmin } from "../../services/User/userService";
import { fetchAdminInDoctor } from "../../services/Doctor/doctorService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Footer({adminData}) {
  const [admin, setAdmin] = useState({});
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { doctor, isDoctorAuthenticated } = useSelector((state) => state.doctor);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if ( user && isAuthenticated) {
          response = await fetchAdmin();
        } else if ( doctor && isDoctorAuthenticated) {
          response = await fetchAdminInDoctor();
        } else {
          response = await fetchAdmin()
        }

        if (response && response.status === 200) {
          setAdmin(response.data.data);
        } else {
          toast.error('Error in fetching admin data');
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    };

    fetchData();
  }, [ user, doctor]);

  return (
    <footer className="bg-gray-50 text-gray-900 mt-5">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="h-16 w-39 mb-4" alt="DocNow Logo" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-9">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-black-600 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-black-600 transition-colors">Our Services</Link></li>
              <li><Link to="/doctors" className="hover:text-black-600 transition-colors">Our Doctors</Link></li>
              <li><Link to="/doctors" className="hover:text-black-600 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black-800">Contact Us</h3>
            <ul className="space-y-2">
              {admin.email && (
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-black-600" />
                  <a href={`mailto:${admin.email}`} className="hover:text-black-600 transition-colors">{admin.email}</a>
                </li>
              )}
              {admin.mobile && (
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-black-600" />
                  <a href={`tel:+91${admin.mobile}`} className="hover:text-black-600 transition-colors">+91 {admin.mobile}</a>
                </li>
              )}
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
        </div>
        <div className="mt-8 pt-8 border-t border-black-200 text-center">
          <p>&copy; {new Date().getFullYear()} DocNow. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-sm hover:text-black-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:text-black-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

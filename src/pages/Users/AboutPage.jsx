import { motion } from "framer-motion";
import doctorImage from "../../assets/images/pediatrics.jpg"; 
import appointmentImage from "../../assets/images/orthopedics.jpg";
import {Chip} from "@nextui-org/react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
         <div className="text-center mb-6">
            <Chip color="primary" variant="bordered" size="lg">
              About DocNow
            </Chip>
          </div>
          <p className="text-lg text-gray-700 font-serif text-center">
            Our app provides an all-in-one solution for seamless healthcare services, including appointment booking, chat, video calls, and more.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            
            <Chip color="danger" variant="shadow" size="lg">Seamless Appointments</Chip>
            <p className="text-gray-600 font-serif">
              Book appointments with trusted doctors from the comfort of your home. Manage your schedule with ease.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={appointmentImage}
              alt="Appointment Booking"
              className="rounded-lg shadow-md"
            />
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={doctorImage}
              alt="Doctor Consultation"
              className="rounded-lg shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            
            <Chip color="danger" variant="shadow" size="lg"> Expert Consultations</Chip>
            <p className="text-gray-600 font-serif">
              Access a network of highly qualified doctors specializing in various fields to meet your healthcare needs.
            </p>
          </motion.div>
        </div>

        {/* Chat & Video Call Features */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white shadow-md rounded-lg p-6 space-y-4 text-center"
        >
          <h2 className="text-2xl font-semibold font-serif text-blue-500">
            Additional Features
          </h2>
          <p className="text-gray-600 font-serif">
            Enhance your healthcare experience with these state-of-the-art features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="block text-blue-500 text-4xl">💬</span>
              <h3 className="text-lg font-medium font-serif">Chat Support</h3>
              <p className="text-sm text-gray-600 font-serif">
                Communicate with doctors instantly for quick consultations.
              </p>
            </div>
            <div className="space-y-2">
              <span className="block text-blue-500 text-4xl">📹</span>
              <h3 className="text-lg font-medium font-serif">Video Calls</h3>
              <p className="text-sm text-gray-600 font-serif">
                Engage in secure video consultations for more personalized care.
              </p>
            </div>
            <div className="space-y-2">
              <span className="block text-blue-500 text-4xl">📆</span>
              <h3 className="text-lg font-medium font-serif">Scheduling</h3>
              <p className="text-sm text-gray-600 font-serif">
                Effortlessly manage and reschedule your appointments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import cardiology from '../../assets/images/cardiology.jpg'
import dermatology from '../../assets/images/dermatology.jpg'
import neurology from '../../assets/images/neurology.jpg'
import pediatrics from '../../assets/images/pediatrics.jpg'
import orthopedics from '../../assets/images/orthopedics.jpg'
import oncology from '../../assets/images/oncology.jpg'

const SpecializationsSection = () => {
  const navigate = useNavigate();
  const specializations = [
    { title: 'Cardiology', description: 'Heart and blood vessel specialists.', imageUrl: cardiology },
    { title: 'Dermatology', description: 'Skin, hair, and nail specialists.', imageUrl: dermatology },
    { title: 'Neurology', description: 'Brain and nervous system specialists.', imageUrl: neurology },
    { title: 'Pediatrics', description: 'Child and adolescent specialists.', imageUrl: pediatrics },
    { title: 'Orthopedics', description: 'Bone, joint, and muscle specialists.', imageUrl: orthopedics},
    { title: 'Oncology', description: 'Cancer specialists.', imageUrl: oncology },
  ];

  const handleSpecializationClick = (specialization) => {
    navigate(`/doctors/${specialization}`);
  };

  return (
    <section className="bg-lightLavender text-darkGray">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Find Your Specialist</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our range of doctor specializations to find the right care for your needs.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specializations.map((specialization, index) => (
            <div
              key={index}
              className="relative group block rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
              onClick={() => handleSpecializationClick(specialization.title)}
            >
              <img
                src={specialization.imageUrl}
                alt={`${specialization.title} image`}
                className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{specialization.title}</h2>
                <p className="text-sm mt-1">{specialization.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-block rounded bg-calmBlue px-12 py-3 text-lg font-medium text-white hover:bg-teal transition-transform hover:-translate-y-1"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;

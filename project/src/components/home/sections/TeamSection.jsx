import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { teamData } from '../../../data/teamData';

function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Meet Our Team
        </motion.h2>

        {/* Project Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl p-8 mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-600">{teamData.projectGuide.name}</h3>
            <p className="text-gray-600">{teamData.projectGuide.role}</p>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-center mb-6">
            {teamData.projectGuide.bio}
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              <strong>Specialization:</strong> {teamData.projectGuide.specialization}
            </p>
          </div>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.id}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-700">
                  <FaLinkedin size={20} />
                </a>
                <a href={member.social.github} className="text-gray-700 hover:text-gray-800">
                  <FaGithub size={20} />
                </a>
                <a href={`mailto:${member.social.email}`} className="text-red-600 hover:text-red-700">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
import { motion } from 'framer-motion';
import ProjectGuide from '../components/team/ProjectGuide';
import TeamMember from '../components/team/TeamMember';
import { teamData } from '../data/teamData';
import eyeImage from '../assets/eye-closeup.jpg';

function Team() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-700 mb-8"
      >
        Meet Our Team
      </motion.h1>

      {/* Project Guide Section */}
      <ProjectGuide guide={teamData.projectGuide} />

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {teamData.teamMembers.map((member, index) => (
          <TeamMember key={member.id} member={member} index={index} />
        ))}
      </div>

      {/* Eye Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <img
          src={eyeImage}
          alt="Close-up of human eye"
          className="w-full rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Motto Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Our Motto</h2>
        <div className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform duration-300">
          <p className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Early Detection, Better Vision
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Team;
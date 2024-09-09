import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const teamMembers = [
  { id: 1, name: "Mayuri Goswami", photo: "Mayuri.jpeg" },
  { id: 2, name: "Bhavansh Gali", photo: "Bhavansh.jpeg" },
  { id: 3, name: "Naren Sri Sai", photo: "Naren.jpeg" },
  { id: 4, name: "Keerthana B", photo: "Keerthana.jpeg" },
  { id: 5, name: "Arvind Kumar", photo: "path/to/photo5.jpg" },
];

export default function Team() {
  return (
    <div className="team-container">
      <motion.h1
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="team-title"
      >
        Meet Our Team
      </motion.h1>
      <div className="team-members">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="team-member"
          >
            <img src={member.photo} alt={member.name} />
            <h5>{member.name}</h5>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

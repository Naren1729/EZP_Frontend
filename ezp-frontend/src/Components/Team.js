import React from 'react';

const teamMembers = [
  { id: 1, name: 'Mayuri Goswami', photo: 'path/to/photo1.jpg' },
  { id: 2, name: 'Bhavansh Gali', photo: 'path/to/photo2.jpg' },
  { id: 3, name: 'Naren Sri Sai', photo: 'path/to/photo3.jpg' },
  { id: 4, name: 'Keerthana B', photo: 'path/to/photo4.jpg' },
  { id: 5, name: 'Arvind Kumar', photo: 'path/to/photo5.jpg' },
];

export default function Team() {
  return (
    <div className="team-container">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-members">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member">
            <img src={member.photo} alt={member.name} />
            <h5>{member.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

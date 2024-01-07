import React from "react";
import { Card, Badge } from "react-bootstrap"; // Import Card and Badge from react-bootstrap

const Project = ({ project, onClick }) => {
  return (
    <div className="cursor" key={project.id} onClick={() => onClick(project)}>
      <h3>{project.title}</h3>
    </div>
  );
};

// const Project = ({ project, onClick }) => {
//   return (
//     <Card className="cursor" key={project.id} onClick={() => onClick(project)}>
//       {/* Placeholder text for the icon */}
//       <Card.Text>📂</Card.Text>

//       <Card.Body>
//         <Card.Title>{project.title}</Card.Title>

//         {/* Number of tasks */}
//         <Card.Text>
//           <Badge bg="info">{project.tasks.length} Tasks</Badge>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

export default Project;

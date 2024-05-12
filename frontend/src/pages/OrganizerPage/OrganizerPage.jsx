import React from "react";
import { useEffect, useState } from "react";

import { Organizer } from "../../components/Organizer/Organizer";

export const OrganizerPage = () => {
  const [organise, setorganise] = useState(null);

  useEffect(() => {
    async function getorgranise() {
      const response = await fetch(`http://localhost:5000/organise`);
      if (!response.ok) {
        const erromsg = `an error occurred :${response.statusText}`;
        console.error(erromsg);
        return;
      }
      const organises = await response.json();

      setorganise(organises);
    }
    getorgranise();
    return;
  }, []);

  return (
    <div className="organise">
      <h2>organise</h2>
      <div className="organise-items">
        {organise &&
          organise.map((organise) => (
            <Organizer key={organise._id} organise={organise} />
          ))}
      </div>
    </div>
  );
};

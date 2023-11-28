import React, { useState } from "react";
import "./santa.css";

interface Person {
  id: number;
  name: string;
  pairingId: string;
  pairing?: string; // New property to store the paired name
}

const SecretSantaGenerator: React.FC = () => {
  const [names, setNames] = useState<string>("");
  const [people, setPeople] = useState<Person[]>([]);

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNames(event.target.value);
  };

  const handleGeneratePairings = () => {
    const namesArray = names.split("\n").map((name) => name.trim());

    if (namesArray.length < 2) {
      alert("Please enter at least two names.");
      return;
    }

    const shuffledNames = shuffleArray(namesArray);

    const generatedPeople = namesArray.map((name, index) => ({
      id: index + 1,
      name,
      pairingId: btoa(shuffledNames[index]),
      pairing: shuffledNames[index], // Set the paired name
    }));

    setPeople(generatedPeople);
  };

  const shuffleArray = (array: string[]) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleShareOnWhatsApp = (person: Person) => {
    const whatsappLink = `https://wa.me/?text=Secret%20Santa%20Pairing%0A${encodeURIComponent(
      `${person.name} - Keep this secret: ./pairing/${encodeURIComponent(
        person.name
      )}/${encodeURIComponent(person.pairingId)}`
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="container">
      <h1>Secret Santa Generator</h1>
      <div className="part">
        <form>
          <textarea
            className="input"
            value={names}
            onChange={handleNameInputChange}
          />
        </form>

        <button onClick={handleGeneratePairings} className="generate">
          Generate Pairings
        </button>
      </div>
      <div className="result">
        {people.map((person) => (
          <div key={person.id}>
            {person.name} -{" "}
            <a
              href={`./pairing/${encodeURIComponent(person.name)}/${encodeURIComponent(person.pairingId)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Keep this secret
            </a>{" "}
            - Paired with: {person.pairing}{" "}
            <button onClick={() => handleShareOnWhatsApp(person)}>
              Share on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretSantaGenerator;

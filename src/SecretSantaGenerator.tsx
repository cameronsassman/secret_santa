// App.tsx
import React, { useState } from "react";
import "./santa.css";

interface Person {
  name: string;
  pairing: string;
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
      name,
      pairing: shuffledNames[index],
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
          <div key={person.name}>
            {person.name} -{" "}
            <a
              href={`./pairing/${encodeURIComponent(person.name)}/${encodeURIComponent(person.pairing)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Keep this secret
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretSantaGenerator;

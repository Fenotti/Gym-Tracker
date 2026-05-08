import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const [peso, setPeso] = useState("");
  const [altezza, setAltezza] = useState("");
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("workouts");
    if (saved) setWorkouts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  // + e - SERIE
  function addSet() {
    setSets(sets + 1);
  }

  function removeSet() {
    if (sets > 0) setSets(sets - 1);
  }

  // + e - RIPETIZIONI
  function addRep() {
    setReps(reps + 1);
  }

  function removeRep() {
    if (reps > 0) setReps(reps - 1);
  }

  function addWorkout() {
    if (!exercise) return;

    setWorkouts([
      ...workouts,
      { exercise, sets, reps, weight }
    ]);

    setExercise("");
    setSets(0);
    setReps(0);
    setWeight("");
  }

  function calcBMI() {
    if (!peso || !altezza) return;

    const result = parseFloat(peso) / (parseFloat(altezza) ** 2);
    setBmi(result.toFixed(2));
  }

  return (
    <div className="page">

      <h1 className="title">Gym Tracker</h1>

      {/* ALLENAMENTO */}
      <div className="card blue">
        <h2>Nuovo Allenamento</h2>

        <input
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Esercizio"
        />

        <div className="counter">
          <p>Serie: {sets}</p>
          <div>
            <button onClick={removeSet}>-</button>
            <button onClick={addSet}>+</button>
          </div>
        </div>

        <div className="counter">
          <p>Ripetizioni: {reps}</p>
          <div>
            <button onClick={removeRep}>-</button>
            <button onClick={addRep}>+</button>
          </div>
        </div>

        <input
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso (kg)"
        />

        <button onClick={addWorkout}>Aggiungi</button>
      </div>

      {/* STORICO */}
      <div className="card purple">
        <h2>Storico Allenamenti</h2>

        {workouts.length === 0 && <p>Nessun allenamento ancora</p>}

        {workouts.map((w, i) => (
          <div key={i} className="item">
            <b>{w.exercise}</b> — {w.sets}x{w.reps} — {w.weight}kg
          </div>
        ))}
      </div>

      {/* BMI */}
      <div className="card green">
        <h2>Calcolo BMI</h2>

        <input
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso (kg)"
        />

        <input
          value={altezza}
          onChange={(e) => setAltezza(e.target.value)}
          placeholder="Altezza (m)"
        />

        <button onClick={calcBMI}>Calcola</button>

        {bmi && <h3>BMI: {bmi}</h3>}
      </div>

    </div>
  );
}
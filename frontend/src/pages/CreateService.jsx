import { useState } from "react";
import api from "../services/api";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    await api.post("/services", {
      title,
      description,
      priority: "MEDIUM",
    });
    alert("Service Created");
  };

  return (
    <div className="card">
      <h2>Create Service</h2>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
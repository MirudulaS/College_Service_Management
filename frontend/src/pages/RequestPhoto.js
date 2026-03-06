import { useParams } from "react-router-dom";

export default function RequestPhoto() {
  const { filename } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e6f0ff",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/${filename}`}
        alt="Request"
        style={{
          maxWidth: "80%",
          maxHeight: "80%",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}
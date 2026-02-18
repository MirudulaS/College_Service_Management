export default function ServiceCard({ service }) {
  return (
    <div className="card">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span>Status: {service.status}</span>
    </div>
  );
}
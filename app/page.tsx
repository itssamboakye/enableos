export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "var(--spacing-8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: 500,
          marginBottom: "var(--spacing-4)",
          color: "var(--color-text-primary)",
        }}
      >
        EnableOS
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--spacing-8)",
        }}
      >
        Sales Readiness Platform
      </p>
      <a
        href="/discovery-practice"
        className="primary-button-link"
      >
        Start Discovery Practice
      </a>
    </main>
  );
}

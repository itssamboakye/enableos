export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-medium mb-4 text-foreground">
        EnableOS
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sales Readiness Platform
      </p>
      <a
        href="/discovery-practice"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Start Discovery Practice
      </a>
    </main>
  );
}

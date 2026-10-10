"use client";

// Last-resort fallback when the root layout itself fails, so it renders its own <html> and inline styles.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#ffffff",
          color: "#0f172a",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 12px" }}>Something went wrong</h1>
          <p style={{ color: "#475569", margin: "0 0 32px" }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: 999,
              background: "#1D7CE0",
              color: "#fff",
              padding: "12px 28px",
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest && <p style={{ marginTop: 32, fontSize: 12, color: "#94a3b8" }}>Reference: {error.digest}</p>}
        </div>
      </body>
    </html>
  );
}

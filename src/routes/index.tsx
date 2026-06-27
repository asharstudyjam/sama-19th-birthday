import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday ❤️ — A Love Letter In Pixels" },
      { name: "description", content: "A brutalist, interactive birthday wish made just for you — photos, gifts, music, and confetti." },
      { property: "og:title", content: "Happy Birthday ❤️ — A Love Letter In Pixels" },
      { property: "og:description", content: "A brutalist, interactive birthday wish made just for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Happy Birthday ❤️" },
      { name: "twitter:description", content: "A brutalist, interactive birthday wish made just for you." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/birthday/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#FFD93D", fontFamily: "system-ui", color: "#111" }}>
      <a href="/birthday/index.html" style={{ padding: "16px 24px", border: "5px solid #111", background: "#FF4FA3", color: "#fff", fontWeight: 800, boxShadow: "8px 8px 0 #111" }}>
        Open the birthday site →
      </a>
    </div>
  );
}

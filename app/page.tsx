"use client";

import { useState } from "react";

export default function Home() {
  const [authors, setAuthors] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [pubType, setPubType] = useState("journal");
  const [volume, setVolume] = useState("");
  const [pages, setPages] = useState("");
  const [journal, setJournal] = useState("");
  const [publisher, setPublisher] = useState("");
  const [citation, setCitation] = useState("");

  const generateCitation = () => {
    // Format authors (IEEE style: Initial. Lastname, …)
    const formattedAuthors = authors
      .split(",")
      .map((a) => {
        const parts = a.trim().split(" ");
        if (parts.length === 1) return parts[0]; // fallback
        const lastName = parts.pop();
        const initials = parts.map((p) => p[0] + ".").join(" ");
        return `${initials} ${lastName}`;
      })
      .join(", ");

    let result = "";

    if (pubType === "journal") {
      result = `${formattedAuthors}, "${title}," ${journal}, vol. ${volume}, pp. ${pages}, ${year}.`;
    } else if (pubType === "conference") {
      result = `${formattedAuthors}, "${title}," in *Proceedings of ${journal}*, pp. ${pages}, ${year}.`;
    } else if (pubType === "book") {
      result = `${formattedAuthors}, *${title}*. ${publisher}, ${year}.`;
    } else {
      result = `${formattedAuthors}, "${title}," ${year}.`;
    }

    setCitation(result);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          IEEE Citation Generator
        </h1>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Authors (comma-separated, e.g. John Doe, Alice Smith)"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <select
            value={pubType}
            onChange={(e) => setPubType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="journal">Journal Article</option>
            <option value="conference">Conference Paper</option>
            <option value="book">Book</option>
            <option value="other">Other</option>
          </select>

          {pubType === "journal" && (
            <>
              <input
                type="text"
                placeholder="Journal/Source Name"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Pages (e.g. 123-130)"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </>
          )}

          {pubType === "conference" && (
            <>
              <input
                type="text"
                placeholder="Conference Name"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </>
          )}

          {pubType === "book" && (
            <input
              type="text"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full border p-2 rounded"
            />
          )}

          <button
            onClick={generateCitation}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Generate Citation
          </button>
        </div>

        {citation && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold">Generated IEEE Citation:</h2>
            <p className="mt-2">{citation}</p>
          </div>
        )}
      </div>
    </main>
  );
}

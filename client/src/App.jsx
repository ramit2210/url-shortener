import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      "https://url-shortener-beta-bice.vercel.app/create-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      },
    );

    const data = await res.json();
    // console.log(data);
    setShortUrl(data.shortUrl);
  }
  return (
    <div className="main">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="url" className="url-label">
            Enter Url:
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;

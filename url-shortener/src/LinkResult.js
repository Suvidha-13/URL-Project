import React, { useEffect, useState } from 'react'
import axios from "axios"
import './App.css';

const LinkResult = ({ inputValue }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrlAndSetUrl = async () => {
      const result = await axios.get("http://localhost:4000/app/all");
      setUrls(result.data);
    };
    fetchUrlAndSetUrl();
  }, [urls]);

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Long Url</th>
            <th>Short Url</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.longUrl}</td>
              <td>
                <a href={`http://localhost:4000/app/${url.urlId}`}>{url.shortUrl}</a>
              </td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinkResult;

// import axios from "axios";
// import { useEffect, useState } from "react"
// import {CopyToClipboard} from "react-copy-to-clipboard";

// const LinkResult = ({ inputValue }) => {
//   const [shortenLink, setShortenLink] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
//       setShortenLink(res.data.result.full_short_link);
//     } catch(err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if(inputValue.length) {
//       fetchData();
//     }
//   }, [inputValue]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCopied(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [copied]);

//   if(loading) {
//     return <p className="noData">Loading...</p>
//   }
//   if(error) {
//     return <p className="noData">Something went wrong :(</p>
//   }


//   return (
//     <>
//       {shortenLink && (
//         <div className="result">
//           <p>{shortenLink}</p>
//           <CopyToClipboard
//             text={shortenLink}
//             onCopy={() => setCopied(true)}
//           >
//             <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
//           </CopyToClipboard>
//         </div>
//       )}
//     </>
//   )
// }

// export default LinkResult
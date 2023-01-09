import { useState } from "react";
import axios from "axios";

const InputShortener = ({ setInputValue }) => {
    const [url, setUrl] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        if (!url) {
            alert("please enter something");
            return;
        }
        axios.post("http://localhost:4000/app/shorten", { longUrl: url })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });

        console.log(url)
        setInputValue(url);
    }

    return (
        <div className="inputContainer">
            <h1>URL <span>Shortener</span></h1>
            <div>
                <input
                    type="text"
                    placeholder="Paste a link to shorten it"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <button onClick={handleClick}>Shorten</button>
            </div>
        </div>
    )
}

export default InputShortener
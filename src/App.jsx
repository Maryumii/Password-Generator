import { useEffect, useState, useRef } from "react";

function App() {
  const [pass, setPass] = useState("");
  const [checked, setChecked] = useState(false); //numbers
  const [checkedCh, setCheckedCh] = useState(false); //characters
  const [isRange, setRange] = useState(8);

  // useRef to copy to clipboard
  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  };

  const handleCheck = (v) => {
    setChecked(v);
  };
  const handleCheckCharacters = (v) => {
    setCheckedCh(v);
  };
  const handleRange = (e) => {
    let num = e.target.value;
    setRange(num);
  };

  const updateString = () => {
    let ch = "abcdefghijklmnoyzABCDEFGHIPQRSTUVWXYZ";

    // Numbers checkbox
    if (checked === true) {
      let num = "0123456789";
      ch = ch + num;
    }

    // Characters checkbox
    if (checkedCh === true) {
      let specialCh = "?|><{}!@#$%&*,;:-=";
      ch = ch + specialCh;
    }

    // range change logic
    let tillRange;
    if (isRange !== 8) {
      tillRange = isRange;
    } else {
      tillRange = 8;
    }

    //testing values
    console.log(checked);
    console.log("length: ", ch.length);
    console.log("range also ----- ", tillRange);

    let val = "";
    for (let i = 0; i < tillRange; i++) {
      let randomIndex = Math.floor(Math.random() * ch.length);
      val = val + ch[randomIndex];
    }
    setPass(val);
  };

  useEffect(() => {
    updateString();
  }, [checked, checkedCh, isRange]);

  return (
    <>
      <div className="flex justify-center m-3.5 text-gray-100 pt-10">
        <div className="flex flex-col gap-3 border h-24 p-4 bg-gray-900 border-amber-950 items-center justify-center rounded-xl">
          <div>
            <input
              type="text"
              id="myInput"
              value={pass}
              ref={passwordRef}
              readOnly
              className="outline-none w-80 py-0.5 px-1 bg-gray-100 text-gray-950"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-900 text-white rounded-r-xl px-5 py-0.5"
            >
              Copy
            </button>
          </div>

          <div className="flex gap-1.5">
            <input
              type="range"
              min="0"
              max="20"
              defaultValue={isRange}
              onChange={(e) => handleRange(e)}
              className=""
            ></input>
            <span>Length({isRange})</span>
            <input
              type="checkbox"
              id="myCheck"
              onChange={() => handleCheck(!checked)}
            ></input>
            <span>Numbers</span>
            <input
              type="checkbox"
              id="myCheck"
              onChange={() => handleCheckCharacters(!checkedCh)}
            />
            <span>Characters</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

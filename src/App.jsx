import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [addNumbers, setNumbers] = useState(false);
  const [addSymbols, setSymbols] = useState(false);

  //useRef hook
  const refPass = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (addNumbers) str += "0123456789";
    if (addSymbols) str += '!@#$%^&*()-=?>|<":}{';

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, addNumbers, addSymbols, setPassword]);

  const copyToClipboard = useCallback(() => {
    refPass.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, addNumbers, addSymbols, passwordGenerator]);

  return (
    <>
      <div className="bg-gray-800 h-screen w-full pt-10">
        <div className="border-2 border-gray-700 w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 bg-gray-900 text-gray-300">
          <div className="mx-1.5 flex flex-col gap-2.5">
            <h1>Password Generator</h1>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={password}
                ref={refPass}
                className="border border-gray-700 rounded-l-lg rounded-r-none w-full py-1 px-3"
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className=" bg-green-600 hover:bg-green-800 rounded-r-lg rounded-l-none px-2 py-0.5 font-bold"
              >
                copy
              </button>
            </div>

            <label htmlFor="rangeChange">Length ({length})</label>
            <input
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-green-600 w-full cursor-pointer "
            />

            <div className="flex justify-between">
              <label htmlFor="numberInput">Numbers</label>
              <input
                type="checkbox"
                onChange={() => setNumbers((prev) => !prev)}
                className="accent-green-600"
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="symbolInput">Symbols</label>
              <input
                type="checkbox"
                onChange={() => setSymbols((prev) => !prev)}
                className="accent-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

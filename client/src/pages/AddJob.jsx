import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    // Inialte Quil Only Once
    if (!quillRef.current && editRef.current) {
      quillRef.current = new Quill(editRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <div>
      <form
        className="container p-4 flex flex-col w-full items-start gap-3"
        action=""
      >
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input
            className=" w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Job Title"
            required
          />
        </div>
        <div className="w-full max-w-lg ">
          <p className="my-2">Job Description</p>
          <div ref={editRef}></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Job Category</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setCategory(e.target.value)}
            >
              {JobCategories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Job Location</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLocation(e.target.value)}
            >
              {JobLocations.map((location, index) => (
                <option value={location} key={index}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Job Level</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner Level">Beginner Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Senior Level"> Senior Level</option>
            </select>
          </div>
        </div>
        <div>
          <p>Job Salry</p>
          <input
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="2500"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
            min={0}
          />
        </div>
        <button className="w-28 py-3 mt-4 bg-black text-white rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddJob;

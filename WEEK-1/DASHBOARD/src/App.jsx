import React, { useEffect, useState } from "react";
import logo from './assets/logo.png';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const candidates = [
  { name: "Alice", votes: 120, fill: "#FF0000" },    // red
  { name: "Bob", votes: 80, fill: "#0000FF" },       // blue
  { name: "Charlie", votes: 50, fill: "#008000" },   // green
];

function App() {
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateBars(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-[#2e003e] via-[#150050] to-[#ff512f] p-6 overflow-auto">
      {/* Top Right Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute top-10 right-16 w-20 h-20 object-contain drop-shadow-md"
      />

      <div className="h-full w-full flex flex-col">
        {/* Header */}
        <header className="bg-black rounded-lg shadow-md px-8 py-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-300 font-bebas flex items-center">
            <span>🗳️</span>
            <span className="ml-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
              Voting Dashboard
            </span>
          </h1>
          <p className="mt-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Visual overview of vote counts
          </p>
        </header>

        {/* TWO DASHBOARDS */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dashboard 1: Vote Summary */}
          <div className="bg-black rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Candidates</h2>
            <ul className="space-y-4 mb-6">
              {candidates.map(({ name, votes }) => (
                <li
                  key={name}
                  className="flex justify-between items-center px-4 py-2 rounded border border-gray-700 shadow-sm bg-gray-900"
                >
                  <span className="text-lg font-medium text-gray-200">{name}</span>
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        name === "Alice"
                          ? "#FF6666"
                          : name === "Bob"
                          ? "#6666FF"
                          : "#66AA66",
                    }}
                  >
                    {votes} votes
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Vote Distribution</h2>
            <div className="space-y-6">
              {candidates.map(({ name, votes }) => {
                const percent = ((votes / totalVotes) * 100).toFixed(1);
                return (
                  <div key={name}>
                    <div className="flex justify-between mb-1 text-sm font-medium text-gray-400">
                      <span>{name}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateBars ? `${percent}%` : "0%",
                          backgroundColor:
                            name === "Alice"
                              ? "#FF0000"
                              : name === "Bob"
                              ? "#0000FF"
                              : "#008000",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-400">Total Votes</p>
              <h2 className="text-4xl font-bold text-indigo-400">{totalVotes}</h2>
            </div>
          </div>

          {/* Dashboard 2: Bar Graph */}
          <div className="bg-black rounded-lg shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-300 mb-6 text-center">Bar Graph</h2>
            <div className="flex-1 flex justify-center items-center">
              <ResponsiveContainer width={400} height={300}>
                <BarChart data={candidates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#222", borderColor: "#555", color: "#eee" }}
                    itemStyle={{ color: "#eee" }}
                    cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  />
                  <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                    {candidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from "recharts";
import "./MoodTracker.css";

function MoodTracker({ entries }) {
  const moodMap = {
    "😡": 1,
    "😟": 2,
    "😐": 3,
    "😊": 4,
    "😍": 5
  };

  // Group entries by month
  const groupedData = entries.reduce((acc, entry) => {
    const formattedMonth = new Date(entry.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

    if (!acc[formattedMonth]) {
      acc[formattedMonth] = [];
    }

    acc[formattedMonth].push(entry);

    return acc;
  }, {});

  // Create data for the chart
  const moodData = Object.keys(groupedData).flatMap(formattedMonth => {
    const monthEntries = groupedData[formattedMonth];
    return monthEntries.map(entry => ({
      date: new Date(entry.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      mood: entry.mood,
      formattedDate: entry.formattedDate,
    }));
  });

  // Reverse the moodData array
  moodData.reverse();

  // Generate an array of y-axis tick values using the moodMap
  const yTicks = Object.keys(moodMap);

  return (
    <div className="MoodTracker">
      <h1>Mood Tracker</h1>
      <div className="Graph">
        <LineChart width={800} height={500} data={moodData}>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => value.split(',')[0]}
          />
          <YAxis
            domain={[1, 5]}
            ticks={Object.values(moodMap)}
            tickFormatter={(value) => yTicks[Object.values(moodMap).indexOf(value)]}
          />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={1.5} />
          <ReferenceLine y={3} stroke="red" strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => `Mood: ${value.toFixed(2)}`}
            labelFormatter={() => ''}
            content={<CustomTooltip moodMap={moodMap} />}
          />
        </LineChart>
      </div>
    </div>
  );
}

// Custom tooltip component
function CustomTooltip({ active, payload, label, moodMap }) {
  if (active && payload && payload.length) {
    const moodNumber = payload[0].payload.mood;
    const moodEmoji = Object.keys(moodMap).find(key => moodMap[key] === moodNumber);

    return (
      <div className="custom-tooltip">
        <p>Date: {label}</p>
        <p>Mood: {moodEmoji}</p>
      </div>
    );
  }
  return null;
}

export default MoodTracker;
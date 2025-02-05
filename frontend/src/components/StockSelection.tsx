import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock, fetchStockData, selectStock } from "../redux/stockSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import StockChart from "./StockChart";

const StockSelectionWithButton = () => {
  const dispatch = useDispatch();
  const { selectedStock, stockData, status } = useSelector(selectStock);

  const [stocks, setStocks] = useState<{ id: string; name: string; symbol: string; available: string[] }[]>([]);
  const [selected, setSelected] = useState<{ id: string; name: string; symbol: string; available: string[] } | null>(
    selectedStock ? stocks.find((s) => s.id === selectedStock) || null : null
  );
  const [durations, setDurations] = useState<string[]>([]); // State to hold available durations
  const [selectedDuration, setSelectedDuration] = useState<string>("1d"); // Default duration

  const BASE_URL = "http://localhost:5321";

  // Fetch stock list from API
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/stocks`); // Adjust API URL if needed
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  // Update the durations when a stock is selected
  useEffect(() => {
    if (selected) {
      setDurations(selected.available); // Set available durations for selected stock
      setSelectedDuration(selected.available[0] || "1d"); // Default to first available duration
    }
  }, [selected]);

  // Fetch stock data when button is clicked
  const handleButtonClick = () => {
    if (selected && selectedDuration) {
      dispatch(setSelectedStock(selected.id));
      dispatch(fetchStockData({ stock: selected.symbol, duration: selectedDuration }) as any);
    }
  };

  return (
    <>
    <div className="w-full flex p-6 m-4 justify-center items-center gap-4">
      {/* Autocomplete for stock selection */}
      <Autocomplete
        options={stocks}
        getOptionLabel={(option) => option.name}
        value={selected}
        onChange={(_, newValue) => setSelected(newValue)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Stock" />}
      />

      {/* Autocomplete for duration selection */}
      <Autocomplete
        options={durations}
        value={selectedDuration}
        onChange={(_, newValue) => setSelectedDuration(newValue || "1d")}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label="Select Duration" />}
      />

      {/* Fetch Data Button */}
      <Button
        variant="contained"
        sx={{ bgcolor: "blue.500", color: "white", "&:hover": { bgcolor: "blue.600" } }}
        onClick={handleButtonClick}
      >
        Fetch Data
      </Button>
    </div>
    <div>
      {/* Display the chart */}
      {status === "loading" && <p>Loading data...</p>}
      {status === "failed" && <p>Error fetching data</p>}
      {status === "idle" && stockData.length > 0 && <StockChart data={stockData} />}
    </div>
    </>
  );
};

export default StockSelectionWithButton;

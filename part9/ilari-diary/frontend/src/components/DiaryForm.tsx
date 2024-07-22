import React, { useState } from "react";
import { Entry } from "../types/types";
import { createDiaryEntry } from "../services/diaryService";
import { TextField, Button, Box, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { Visibility, Weather } from "../types/types";
import axios from "axios";

interface DiaryFormProps {
  diaryEntries: Entry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ValidationError {
  errors: Record<string, string[]>
}

const DiaryForm: React.FC<DiaryFormProps> = ({ diaryEntries, setDiaryEntries, setErrorMessage }) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: Entry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
      id: diaryEntries.length + 1,
    };
    try {
      const createdEntry = await createDiaryEntry(newEntry);
      setDiaryEntries(diaryEntries.concat(createdEntry));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        const errorMessage = JSON.stringify(error.response?.data) || "Validation error occurred";
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };


  return (
    <Box component="form" onSubmit={diaryCreation} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, margin: 'auto' }}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl>
        <FormLabel>Weather</FormLabel>
        <RadioGroup name="weather" value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
          <FormControlLabel value={Weather.Sunny} control={<Radio />} label="Sunny" />
          <FormControlLabel value={Weather.Rainy} control={<Radio />} label="Rainy" />
          <FormControlLabel value={Weather.Cloudy} control={<Radio />} label="Cloudy" />
          <FormControlLabel value={Weather.Stormy} control={<Radio />} label="Stormy" />
          <FormControlLabel value={Weather.Windy} control={<Radio />} label="Windy" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Visibility</FormLabel>
        <RadioGroup name="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
          <FormControlLabel value={Visibility.Great} control={<Radio />} label="Great" />
          <FormControlLabel value={Visibility.Good} control={<Radio />} label="Good" />
          <FormControlLabel value={Visibility.Ok} control={<Radio />} label="Okay" />
          <FormControlLabel value={Visibility.Poor} control={<Radio />} label="Poor" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Comment"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add entry
      </Button>
    </Box>
  );
};

export default DiaryForm;

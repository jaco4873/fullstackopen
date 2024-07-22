import { useState, useEffect } from "react";
import { Entry } from "./types/types";
import { fetchDiaryEntries } from "./services/diaryService";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import ErrorMessage from "./components/ErrorMessage";
import { Container, Typography } from '@mui/material';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchDiaryEntries()
      .then((entries) => {
        setDiaryEntries(entries);
      })
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Ilari's Flight Diary
      </Typography>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <br></br>
      <DiaryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} setErrorMessage={setErrorMessage} />
      <DiaryList diaryEntries={diaryEntries} />
    </Container>
  );
}

export default App;

import React from "react";
import { Entry } from "../types/types";
import { List, ListItem, ListItemText, Box } from '@mui/material';

interface DiaryListProps {
  diaryEntries: Entry[];
}

const DiaryList: React.FC<DiaryListProps> = ({ diaryEntries }) => {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <List>
        {diaryEntries.map((entry) => (
          <ListItem key={entry.id}>
            <ListItemText 
              primary={`${entry.date} - ${entry.weather}`} 
              secondary={`Visibility: ${entry.visibility} - Comment: ${entry.comment}`} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DiaryList;

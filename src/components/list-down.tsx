import { Grid, Typography } from '@mui/material';

const MyList = () => {
  // Sample data for the list
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    // Add more items as needed
  ];

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={4} key={item.id}>
          <Typography variant="body1">{item.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyList;

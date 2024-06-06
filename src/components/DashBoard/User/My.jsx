// MyComponent.js

import { Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  console.log('Current theme:', theme);

  return (
    <div>
      <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
        This is a themed text.
      </Typography>
      <Button variant="contained" color="primary">Test Button</Button>
    </div>
  );
};

export default MyComponent;

import './App.css';
import React from 'react';
import { Container } from '@mui/material';
import PropertyList from './components/Property/PropertyList';

function App() {
  return (
    <Container>
          <h1>Property Listings</h1>
          <PropertyList />
    </Container>
  );
}

export default App;

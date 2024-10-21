import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const people = [
  { id: 1, name: 'Milkman', named: 'milkMan', image: require('../../../../assets/Images/SocietyAdmin/service.png') },
  { id: 2, name: 'Plumber', named: 'plumber', image: require('../../../../assets/Images/SocietyAdmin/plumber.png') },
  { id: 2, name: 'Maid', named: 'maid', image: require('../../../../assets/Images/SocietyAdmin/housekeeper.png') },
  { id: 2, name: 'Cook', named: 'cook', image: require('../../../../assets/Images/SocietyAdmin/cook.png') },
  { id: 3, name: 'Paperboy', named: 'paperBoy', image: require('../../../../assets/Images/SocietyAdmin/paperboy.png') },
  { id: 4, name: 'Driver', named: 'driver', image: require('../../../../assets/Images/SocietyAdmin/driving.png') },
  { id: 5, name: 'Water', named: 'water', image: require('../../../../assets/Images/SocietyAdmin/water.png') },
  { id: 6, name: 'Carpenter', named: 'carpenter', image: require('../../../../assets/Images/SocietyAdmin/carpenter.png') },
  { id: 7, name: 'Electrician', named: 'electrician', image: require('../../../../assets/Images/SocietyAdmin/electrician.png') },
  { id: 8, name: 'Painter', named: 'painter', image: require('../../../../assets/Images/SocietyAdmin/painter.png') },
  { id: 9, name: 'Moving', named: 'moving', image: require('../../../../assets/Images/SocietyAdmin/delivery.png') },
  { id: 9, name: 'Mechanic', named: 'mechanic', image: require('../../../../assets/Images/SocietyAdmin/delivery.png') },
  { id: 10, name: 'Appliance', named: 'appliance', image: require('../../../../assets/Images/SocietyAdmin/electrical-appliances.png') },
  { id: 10, name: 'PestClean', named: 'pestClean', image: require('../../../../assets/Images/SocietyAdmin/Clean.png') },
];

const ImageGrid = () => {
  const navigate = useNavigate();

  const handleClick = (serviceType) => {
    navigate(`/societyAdmin/staffMember/ListPage/${serviceType}`);
  };
  const handleAdd = () => {
    navigate('/societyAdmin/addstaffMember')
  };

  return (
    <Grid container spacing={2}>
      <Box sx={{ marginBottom: 2, marginTop: 2, marginLeft: 2, width: "100%", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
          Staff Members
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginTop:1,
                            width: '500px',
                            height: '50px',
                            fontFamily: 'Red Hat Display, sans-serif',
                        }}
                    /> */}
          <Button
            variant="outlined"
            sx={{
              marginLeft: 2,
              color: '#630000',
              border: '2px solid #630000',
              fontWeight: '600',
              fontFamily: "Red Hat Display, sans-serif",
              '&:hover': {
                backgroundColor: '#630000',
                color: '#fff',
                borderColor: '#630000',
              },
            }}
            onClick={() => handleAdd()}
          >
            ADD
          </Button>
        </Box>
      </Box>
      {people.map((person) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={person.id}>
          <Card onClick={() => handleClick(person.named)}>
            <CardMedia
              component="img"
              sx={{ height: 100, width: 100, objectFit: 'cover', margin: '0 auto' }}
              image={person.image}
              alt={person.name}
            />
            <CardContent>
              <Typography variant="h6" component="div" align="center" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20 }}>
                {person.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;

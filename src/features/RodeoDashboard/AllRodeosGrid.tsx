import ActionAreaCard from "@common/display/ActionAreaCard";
import Grid from "@mui/material/Grid";

const RodeoCard = ({rodeo, onClick}) => {
  const {name, location, date} = rodeo.rodeoDetails
  return (
    <ActionAreaCard 
      title={name}
      bodyLine1={location}
      bodyLine2={date}
      onClick={onClick}
    />
  )
}

const AllRodeosGrid = ({rodeos, onCardClick}) => {
  return (
    <>
      <h1>Rodeos</h1>
      <Grid container spacing={3}>
        {rodeos.map(rodeo => (
          <Grid item xs={12} sm={4} key={rodeo.rodeoId}>
            <RodeoCard 
              rodeo={rodeo}
              onClick={() => onCardClick(rodeo)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AllRodeosGrid;
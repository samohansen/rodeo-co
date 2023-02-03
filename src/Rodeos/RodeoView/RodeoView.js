import TabPanel from '../../common/TabPanel';
import RodeoDetails from './RodeoDetails';
import EventsList from './EventsList';
import { useState } from 'react';
import EventView from './EventView';

const RodeoView = ({rodeo}) => {
  const {rodeoDetails, rodeoEvents} = rodeo;
  const [viewEvent, setViewEvent] = useState(null)

  return (<>
    <h1>{rodeoDetails.name}</h1>
    {!viewEvent ? (
      <TabPanel
        tabNames={["Events List", "Information"]}
      >
        <EventsList events={rodeoEvents} onEventClick={setViewEvent}/>
        <RodeoDetails {...rodeoDetails} />
      </TabPanel>
    ) : (
      <EventView
        event={viewEvent}
      />
    )}
  </>
  )
}

export default RodeoView;
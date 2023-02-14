import styles from './RodeoDetails.module.css';

const RodeoDetails = ({location, date, notes}) => {
  return (
    <div>
      <div className={styles.rodeoDetailsHeaders}>
        Location
      </div>
      <div className={styles.rodeoDetailsData}>
          {location}
      </div>

      <div className={styles.rodeoDetailsHeaders}>
        Date
      </div>
      <div className={styles.rodeoDetailsData}>
          {date}
      </div>


      <div className={styles.rodeoDetailsHeaders}>
        Notes
      </div>
      <div className={styles.rodeoDetailsData}>
          {notes}
      </div>
    </div>
  )
}

export default RodeoDetails;
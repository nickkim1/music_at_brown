// paramter naming auto inference?

import { useEffect } from "react"; 

const FormCard = ( { index, deleteVenueForm, setVenueLink, setVenueLoc, setVenueDate, setVenueTime, packet}) => {

    // Pre-populate
    useEffect(() => {
        if (packet) {
          document.getElementById(`venue-loc-${index}`).value = packet["loc"] ? packet["loc"] : "";
          document.getElementById(`venue-link-${index}`).value = packet["link"] ? packet["link"] : "";
          document.getElementById(`venue-date-${index}`).value = packet["date"] ? packet["date"] : ""; 
          document.getElementById(`venue-time-${index}`).value = packet["time"] ? packet["time"] : ""; 
        }
    }, []);

    return (
      <>
        <li className="venue-card">
          <div className="form-input">
            <label htmlFor={`venue-loc-${index}`}>Venue Location</label>
            <input
              type="text"
              id={`venue-loc-${index}`}
              name="venue-loc"
              placeholder="Venue Location"
              onChange={(e) => setVenueLoc(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor={`venue-link-${index}`}>Concert Tickets Link</label>
            <input
              type="text"
              id={`venue-link-${index}`}
              name="venue-link"
              placeholder="Concert tickets link"
              onChange={(e) => setVenueLink(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor={`venue-date-${index}`}>Venue Date</label>
            <input
              type="date"
              id={`venue-date-${index}`}
              name="venue-date"
              onChange={(e) => setVenueDate(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor={`venue-time-${index}`}>Venue Time</label>
            <input
              type="time"
              id={`venue-time-${index}`}
              name="venue-time"
              onChange={(e) => setVenueTime(e.target.value)}
            />
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={deleteVenueForm}
          >
            X
          </button>
        </li>
      </>
    );
}

export default FormCard;

const VenueCard = ( { venue } ) => {

    // const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // getDay();

    const month = venue["month"];
    const day_number = venue["day_number"];
    const name = venue["name"];
    const day_str = venue["day_str"];
    const time = venue["time"];

    return (
      <a className="sidebar-venue-packet-link" href="#">
        <div className="sidebar-venue-packet">
          <div className="sidebar-venue-packet-date">
            <div className="sidebar-venue-packet-month"> { month } </div>
            <div className="sidebar-venue-packet-day"> { day_number } </div>
          </div>
          <div className="sidebar-venue-packet-description">
            <h4>{ name }</h4>
            <div className="sidebar-venue-packet-description-date">
              <p> { day_str } </p>
              <p> { time } </p>
            </div>
          </div>
        </div>
      </a>
    );
}

export default VenueCard; 
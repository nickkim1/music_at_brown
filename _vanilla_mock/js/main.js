
// Event delegation: attaches click to viewInfo and then 
// handles the event dealing with the delete button itself, removes 
function deleteVenue() {
    let viewInfo = document.getElementById("venues");

    viewInfo.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("delete-button")) {
        // Handle the delete action
        e.preventDefault();

        // https://stackoverflow.com/questions/9334636/how-to-create-a-dialog-with-ok-and-cancel-options
        let res = confirm("Are you sure you want to delete this event?");
        res ? e.target.closest(".venue-card").remove() : console.log('Event not deleted!'); // Remove the parent venue card

      }
    });
}

// Functionality for adding a bunch of venues
function submitVenue() {

  venueSubmit = document.getElementById("venue-submit");

  venueSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let viewInfo = document.getElementById("venues");

    let id = viewInfo.children.length;
    console.log(id);

    let newVenueCard = document.createElement("li");
    newVenueCard.setAttribute("class", "venue-card");

    function createChildren(labelStr, headerStr, type) {
      let one = document.createElement("div");
      one.setAttribute("class", "form-input");
      let oneLabel = document.createElement("label");
      let oneInput = document.createElement("input");
      oneLabel.setAttribute("for", `${labelStr}`);
      oneLabel.innerHTML = `${headerStr}`;
      oneInput.setAttribute("type", `${type}`);
      oneInput.setAttribute("id", `${labelStr}-${id + 1}`);
      oneInput.setAttribute("name", `${labelStr}`);
      one.append(oneLabel);
      one.append(oneInput);
      return one;
    }

    let labelsAndHeaders = [
      ["venue-loc", "Venue Location", "text"],
      ["venue-date", "Venue Date", "date"],
      ["venue-time", "Venue Time", "time"],
    ];

    for (let i = 0; i < 3; i++) {
      newVenueCard.append(
        createChildren(
          labelsAndHeaders[i][0],
          labelsAndHeaders[i][1],
          labelsAndHeaders[i][2]
        )
      );
    }
    let oneButton = document.createElement("button");
    oneButton.setAttribute("class", "delete-button");
    //  Set type to button to avoid pagerefresh on each delete
    oneButton.setAttribute("type", "button");
    oneButton.innerHTML = "X";
    newVenueCard.append(oneButton);
    viewInfo.appendChild(newVenueCard);
    viewInfo.scrollTop = viewInfo.scrollHeight;
  });
}

deleteVenue();
submitVenue();


//Old code: 
// const listItems = viewInfo.querySelectorAll("li");
// const lastItem = listItems[listItems.length - 1];
//Scroll into view
// lastItem.scrollIntoView({
//   behavior: "smooth",
//   block: "end",
//   inline: "nearest",
// });
//Set focus to last 
// lastItem.focus();

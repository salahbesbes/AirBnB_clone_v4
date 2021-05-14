$(document).ready(() => {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({}),
    success: function (result) {
      result.forEach(async (place) => {
        // let oldContent = $('section.places').html();
        try {
          /** wait user to get loaded */
          let user = await $.get(
            `http://0.0.0.0:5001/api/v1/users/${place.user_id}`
          );

          let newContent = `<article> 
           <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest != 1 ? 's' : null}
            </div>
              <div class="number_rooms"> ${place.number_rooms}
              Bedroom${place.number_rooms != 1 ? 's' : null}
            </div>
              <div class="number_bathrooms"> ${place.number_bathrooms}
              Bathroom${place.umber_bathrooms != 1 ? 's' : null}
            </div>
          </div>
          <div class="user">
            <b>Owner:</b> ${user.first_name} ${user.last_name}
          </div>
          <div class="description">${place.description}</div>
        </article>`;
          $('section.places').append(newContent);
        } catch (error) {
          throw error;
        }
      });
    },
  });
});

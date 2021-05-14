$(document).ready(() => {
  let amenitySelected = {};
  let statesSelected = {};
  let citiesSelected = {};
  let locationsh4Contenent = '';
  $('.amenities .popover ul li input').change(function (e) {
    e.preventDefault();
    let thisInput = $(this);
    let id = thisInput.attr('data-id');
    let name = thisInput.attr('data-name');
    let checked = thisInput.is(':checked');
    let Newh4Contenent = '';
    if (checked) {
      amenitySelected[id] = name;
      for (key in amenitySelected) {
        Newh4Contenent += amenitySelected[key] + ', ';
      }
    } else {
      delete amenitySelected[id];
      for (key in amenitySelected) {
        Newh4Contenent += amenitySelected[key] + ', ';
      }
    }

    /** create a string of names */
    if (Newh4Contenent.length > 33) {
      Newh4Contenent = Newh4Contenent.slice(0, 30) + '.....';
    }
    /** remove last 2 char */
    Newh4Contenent = Newh4Contenent.slice(0, -2);
    /** fill the H4 tag with names */
    let h4Tag = $(this).closest('.amenities').find('h4');
    h4Tag.text(Newh4Contenent);
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'get',
    success: function (result) {
      if (result.status === 'OK') $('#api_status').addClass('available');
      else $('#api_status').removeClass('available');
    },
  });

  function displayResult(response) {
    $('section.places').empty();
    response.forEach(async (place) => {
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
  }
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({}),
    success: displayResult,
  });

  $('.locations > .popover > ul > li > input').change(function (e) {
    e.preventDefault();
    let thisInput = $(this);
    let id = thisInput.attr('data-id');
    let name = thisInput.attr('data-name');
    let checked = thisInput.is(':checked');
    let h4Tag = $(this).closest('.locations').find('h4');

    if (checked) {
      statesSelected[id] = name;
      for (key in statesSelected) {
        locationsh4Contenent += statesSelected[key] + ', ';
      }
    } else {
      delete statesSelected[id];
      locationsh4Contenent = '';
      for (key in statesSelected) {
        locationsh4Contenent += statesSelected[key] + ', ';
      }
    }

    /** create a string of names */
    if (locationsh4Contenent.length > 33) {
      locationsh4Contenent = locationsh4Contenent.slice(0, 28) + '.....';
    }
    /** remove last 2 char */
    locationsh4Contenent = locationsh4Contenent.slice(0, -2);
    /** fill the H4 tag with names */
    h4Tag.text(locationsh4Contenent);
  });

  $('.locations > .popover > ul > li > ul > li > input').change(function (e) {
    e.preventDefault();
    let thisInput = $(this);
    let id = thisInput.attr('data-id');
    let name = thisInput.attr('data-name');
    let checked = thisInput.is(':checked');
    let h4Tag = $(this).closest('.locations').find('h4');

    if (checked) {
      citiesSelected[id] = name;
      for (key in citiesSelected) {
        locationsh4Contenent += citiesSelected[key] + ', ';
      }
    } else {
      delete citiesSelected[id];
      locationsh4Contenent = '';
      for (key in citiesSelected) {
        locationsh4Contenent += citiesSelected[key] + ', ';
      }
    }

    /** create a string of names */
    if (locationsh4Contenent.length > 33) {
      locationsh4Contenent = locationsh4Contenent.slice(0, 28) + '.....';
    }
    /** remove last 2 char */
    locationsh4Contenent = locationsh4Contenent.slice(0, -2);
    /** fill the H4 tag with names */

    h4Tag.text(locationsh4Contenent);
  });
  $('button').click(() => {
    console.log({
      amenities: Object.keys(amenitySelected).length,
      cities: Object.keys(citiesSelected).length,
      states: Object.keys(statesSelected).length,
    });
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      /** sed list of id of amenities */
      data: JSON.stringify({
        amenities: Object.keys(amenitySelected),
        cities: Object.keys(citiesSelected),
        states: Object.keys(statesSelected),
      }),
      success: displayResult,
    });
  });
});

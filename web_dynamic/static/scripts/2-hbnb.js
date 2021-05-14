$(document).ready(() => {
  let scripts = $('script'); /* all scripts */
  let lastScript = scripts[scripts.length - 1]; /** last script */
  let cacheId = lastScript.getAttribute('cache_id');
  let amenitySelected = {};

  $('li > input').change(function (e) {
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
});

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
    if (checked) amenitySelected[id] = name;
    else delete amenitySelected[id];
    /** create a string of names */
    let Newh4Contenent = '';
    for (key in amenitySelected) {
      /** check if the width of h4 is filled or not yet */
      if (33 - Newh4Contenent.length > 0) {
        Newh4Contenent += amenitySelected[key] + ', ';
      } else {
        Newh4Contenent = Newh4Contenent.slice(0, 33) + '.....';
        break;
      }
    }
    /** remove last 2 char */
    Newh4Contenent = Newh4Contenent.slice(0, -2);
    /** fill the H4 tag with names */
    let h4Tag = $(this).closest('.amenities').find('h4');
    h4Tag.text(Newh4Contenent);
  });
});

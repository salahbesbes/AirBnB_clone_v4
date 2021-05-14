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
    /** fill the H4 tag with names */
    console.log(amenitySelected);
  });
});

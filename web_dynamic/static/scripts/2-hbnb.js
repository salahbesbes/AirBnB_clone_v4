$(document).ready(() => {
  let scripts = $('script'); /* all scripts */
  let lastScript = scripts[scripts.length - 1]; /** last script */
  let cacheId = lastScript.getAttribute('cache_id');
  let amenitySelected = {};

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'get',
    success: function (result) {
      if (result.status === 'OK') $('#api_status').addClass('available');
      else $('#api_status').removeClass('available');
    },
  });
});

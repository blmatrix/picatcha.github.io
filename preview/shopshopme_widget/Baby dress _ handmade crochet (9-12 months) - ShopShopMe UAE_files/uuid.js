(function() {
  window.addEventListener('message', function(e) {
    if (e.data && e.data.event && e.data.event == 'RECEIVE_UUID') {
      window.mc_uuid = e.data.uuid;
    }
  });

  var iframe = document.createElement('iframe');
  iframe.src = '//adrelated.com/public/cookies/index.html';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
}());

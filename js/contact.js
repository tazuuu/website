// Contact page: validation + submission.
//
// IMPORTANT: this form has no backend wired up yet. Set FORM_ENDPOINT below to
// a form-handling service URL (e.g. a Formspree endpoint like
// "https://formspree.io/f/xxxxxxx", or your own API route) to actually deliver
// submissions. Until then, submitting falls back to opening the visitor's email
// client with the message pre-filled, so nothing is silently lost.
(function () {
  var FORM_ENDPOINT = '';

  var form = document.getElementById('contactForm');
  var thanksView = document.getElementById('thanksView');
  var resetBtn = document.getElementById('resetBtn');
  var submitBtn = document.getElementById('submitBtn');
  var errorEl = document.getElementById('formError');
  if (!form) return;

  function showThanks() {
    form.hidden = true;
    thanksView.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function showForm() {
    thanksView.hidden = true;
    form.hidden = false;
    form.reset();
  }
  function setError(msg) {
    if (msg) { errorEl.textContent = msg; errorEl.hidden = false; }
    else { errorEl.hidden = true; errorEl.textContent = ''; }
  }

  resetBtn.addEventListener('click', showForm);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setError('');

    var data = new FormData(form);
    var name = (data.get('name') || '').toString().trim();
    var email = (data.get('email') || '').toString().trim();
    var message = (data.get('message') || '').toString().trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      setError('Please fill in your name, a valid email, and a short project description.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      }).then(function (res) {
        if (res.ok) { showThanks(); }
        else { setError('Something went wrong sending your message. Please try again or call us directly.'); }
      }).catch(function () {
        setError('Could not reach the server. Please try again or call us directly.');
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a Proposal →';
      });
    } else {
      var subject = encodeURIComponent('Project enquiry from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Company: ' + (data.get('company') || '') + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Service: ' + (data.get('service') || '') + '\n' +
        'Budget: ' + (data.get('budget') || '') + '\n\n' +
        message
      );
      window.location.href = 'mailto:diagram81@gmail.com?subject=' + subject + '&body=' + body;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a Proposal →';
      showThanks();
    }
  });
})();

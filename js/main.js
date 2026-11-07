(function () {
  // البريد يُقرأ من رابط mailto في index.html (مصدر واحد فقط)
  var mailLink = document.getElementById('mail');
  var MY_EMAIL = mailLink ? mailLink.getAttribute('href').replace('mailto:', '') : '';

  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  function closeNav() { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeNav(); });

  // تمييز القسم الحالي في القائمة
  var links = {};
  nav.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) {
          links[k].classList.toggle('on', k === en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  var form = document.getElementById('cf');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    form.querySelectorAll('input,textarea').forEach(function (i) {
      var v = i.value.trim();
      var wrong = !v || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
      i.classList.toggle('err', wrong);
      if (wrong) bad = true;
    });
    if (bad) return;
    var d = new FormData(form);
    var body = 'الاسم: ' + d.get('name') + '\nبريدي: ' + d.get('email') + '\n\n' + d.get('text');
    document.getElementById('ok').hidden = false;
    location.href = 'mailto:' + MY_EMAIL + '?subject=' +
      encodeURIComponent('رسالة من موقع أحمد سعيد') + '&body=' + encodeURIComponent(body);
  });
})();

/*
  JC Ecuador Rides · Cookie consent
  ---------------------------------
  Nothing that tracks visitors loads until they say yes.
  - "analytics" = Google Analytics 4 + Microsoft Clarity
  - "marketing" = Meta Pixel
  Replace the three IDs below with the real ones when the accounts exist.
  While an ID still contains X's, that tool is simply skipped.
*/
(function(){
  var IDS = {
    ga4: 'G-XXXXXXXXXX',          // Google Analytics 4 measurement ID
    clarity: 'xxxxxxxxxx',        // Microsoft Clarity project ID
    pixel: 'XXXXXXXXXXXXXXX'      // Meta Pixel ID
  };
  var KEY = 'jc-consent';
  var VERSION = 1; // bump when the policy changes to ask everyone again

  var TXT = {
    en:{ title:'Cookies on this site',
         body:'We use cookies to see how visitors use the page and to measure our ads. Nothing is turned on unless you accept. <a href="/privacy.html#cookies">Read the privacy policy</a>.',
         accept:'Accept all', reject:'Reject all', custom:'Choose', save:'Save choices',
         necessary:'Necessary', necessaryD:'Remembers your language and this choice. Always on.',
         analytics:'Analytics', analyticsD:'Google Analytics and Microsoft Clarity: which pages help visitors and what is confusing.',
         marketing:'Advertising', marketingD:'Meta Pixel: measures our Facebook and Instagram ads and shows them to past visitors.',
         on:'On', off:'Off' },
    es:{ title:'Cookies en este sitio',
         body:'Usamos cookies para ver cómo se usa la página y medir nuestros anuncios. Nada se activa si no aceptas. <a href="/privacy.html#cookies-es">Lee la política de privacidad</a>.',
         accept:'Aceptar todo', reject:'Rechazar todo', custom:'Elegir', save:'Guardar',
         necessary:'Necesarias', necessaryD:'Recuerdan tu idioma y esta elección. Siempre activas.',
         analytics:'Analítica', analyticsD:'Google Analytics y Microsoft Clarity: qué partes de la página ayudan y cuáles confunden.',
         marketing:'Publicidad', marketingD:'Meta Pixel: mide nuestros anuncios en Facebook e Instagram y los muestra a quienes ya visitaron el sitio.',
         on:'Sí', off:'No' }
  };

  // ---------- storage ----------
  function read(){
    try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.v === VERSION ? v : null; } catch(e){ return null; }
  }
  function write(c){
    c.v = VERSION; c.date = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch(e){}
  }

  // ---------- Google Consent Mode v2: everything denied until the visitor decides ----------
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', { analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', wait_for_update:500 });

  // ---------- loaders (each runs at most once) ----------
  var loaded = {};
  function real(id){ return id && !/x{4,}/i.test(id); }
  function addScript(src){ var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function loadGA4(){
    if (loaded.ga4 || !real(IDS.ga4)) return; loaded.ga4 = true;
    addScript('https://www.googletagmanager.com/gtag/js?id=' + IDS.ga4);
    gtag('js', new Date()); gtag('config', IDS.ga4);
  }
  function loadClarity(){
    if (loaded.clarity || !real(IDS.clarity)) return; loaded.clarity = true;
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", IDS.clarity);
    window.clarity('consent');
  }
  function loadPixel(){
    if (loaded.pixel || !real(IDS.pixel)) return; loaded.pixel = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', IDS.pixel); window.fbq('track', 'PageView');
  }
  function apply(c){
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
    if (c.analytics){ loadGA4(); loadClarity(); }
    if (c.marketing){ loadPixel(); }
    // turning something off after it loaded needs a reload to fully stop it
    if ((!c.analytics && (loaded.ga4 || loaded.clarity)) || (!c.marketing && loaded.pixel)) location.reload();
  }

  // ---------- banner ----------
  var css = '' +
  '.jcc{position:fixed;left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:50;max-width:520px;margin-left:auto;background:#1a1918;color:#f4f0e6;border:1px solid #33302a;border-radius:14px;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,.5);font-family:Figtree,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:15px;line-height:1.5}' +
  '.jcc h2{font-family:"Big Shoulders Display","Arial Narrow",sans-serif;font-weight:900;font-size:26px;text-transform:uppercase;margin:0 0 6px;line-height:1}' +
  '.jcc p{margin:0;color:#a39c8e}.jcc p a{color:#c9a84c}' +
  '.jcc-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}' +
  '.jcc button{font:inherit;font-weight:700;font-size:14px;border-radius:8px;padding:10px 14px;cursor:pointer;flex:1 1 auto}' +
  '.jcc .jcc-main{background:#c9a84c;color:#15120a;border:1px solid #c9a84c}' +
  '.jcc .jcc-alt{background:transparent;color:#f4f0e6;border:1px solid #c9a84c}' +
  '.jcc .jcc-link{background:transparent;color:#a39c8e;border:1px solid #33302a}' +
  '.jcc button:focus-visible{outline:2px solid #c9a84c;outline-offset:2px}' +
  '.jcc-opts{display:grid;gap:10px;margin-top:14px}' +
  '.jcc-opt{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center;border-top:1px solid #33302a;padding-top:10px}' +
  '.jcc-opt b{font-size:14px}.jcc-opt small{grid-column:1;color:#a39c8e;font-size:13px}' +
  '.jcc-opt input{grid-row:1/3;grid-column:2;width:20px;height:20px;accent-color:#c9a84c}';

  var box, mode = 'simple';
  function lang(){ return (document.documentElement.lang || 'en').indexOf('es') === 0 ? 'es' : 'en'; }
  function render(){
    if (!box) return;
    var T = TXT[lang()], c = read() || {analytics:false, marketing:false};
    box.innerHTML =
      '<h2 id="jcc-title">' + T.title + '</h2><p>' + T.body + '</p>' +
      (mode === 'custom' ?
        '<div class="jcc-opts">' +
          '<label class="jcc-opt"><b>' + T.necessary + '</b><small>' + T.necessaryD + '</small><input type="checkbox" checked disabled></label>' +
          '<label class="jcc-opt"><b>' + T.analytics + '</b><small>' + T.analyticsD + '</small><input type="checkbox" id="jcc-an"' + (c.analytics ? ' checked' : '') + '></label>' +
          '<label class="jcc-opt"><b>' + T.marketing + '</b><small>' + T.marketingD + '</small><input type="checkbox" id="jcc-mk"' + (c.marketing ? ' checked' : '') + '></label>' +
        '</div>' +
        '<div class="jcc-actions"><button type="button" class="jcc-alt" data-a="reject">' + T.reject + '</button><button type="button" class="jcc-main" data-a="save">' + T.save + '</button></div>'
      :
        '<div class="jcc-actions"><button type="button" class="jcc-alt" data-a="reject">' + T.reject + '</button><button type="button" class="jcc-main" data-a="accept">' + T.accept + '</button><button type="button" class="jcc-link" data-a="custom">' + T.custom + '</button></div>');
  }
  function open(m){
    mode = m || 'simple';
    if (!box){
      var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      box = document.createElement('div'); box.className = 'jcc'; box.setAttribute('role','dialog'); box.setAttribute('aria-labelledby','jcc-title');
      box.addEventListener('click', function(e){
        var a = e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
        if (a === 'custom'){ open('custom'); return; }
        var c = a === 'accept' ? {analytics:true, marketing:true}
              : a === 'reject' ? {analytics:false, marketing:false}
              : {analytics:document.getElementById('jcc-an').checked, marketing:document.getElementById('jcc-mk').checked};
        write(c); close(); apply(c);
      });
      document.body.appendChild(box);
    }
    box.hidden = false; render();
    var first = box.querySelector('button'); if (first) first.focus({preventScroll:true});
  }
  function close(){ if (box) box.hidden = true; }

  // links anywhere with data-consent-open reopen the panel
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest('[data-consent-open]');
    if (el){ e.preventDefault(); open('custom'); }
  });
  // pages fire this when the visitor switches language
  document.addEventListener('jc:lang', render);

  function init(){
    var c = read();
    if (c) apply(c); else open('simple');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.jcConsent = { open: open, state: read };
})();

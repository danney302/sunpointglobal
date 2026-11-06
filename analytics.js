/* Marketing analytics for public pages. Operational dashboards are excluded. */
(()=>{'use strict';
const id=window.BEACON_ANALYTICS_CONFIG?.measurementId;
if(!/^G-[A-Z0-9]+$/.test(id||'')||document.body.dataset.analyticsPrivate==='true')return;
const hosts=['sunpointglobal.net','www.sunpointglobal.net','sunpointbeacon.com','www.sunpointbeacon.com','cloud.sunpointbeacon.com'];
if(!hosts.includes(location.hostname))return;
const allowed=new Set(['/','/index.html','/product.html','/use-cases.html','/about.html','/contact.html','/consulting.html','/feedback.html','/flyer.html','/privacy.html','/pricing.html','/plans','/login','/demo','/demo/login','/evaluate','/order/beacon','/order/beacon-plus']);
if(!allowed.has(location.pathname))return;

const consentKey='spgAnalyticsConsent';
const internalKey='spgAnalyticsInternal';
const restrictedRegions=['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LI','LV','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'];
const privacySignal=navigator.globalPrivacyControl===true;
let choice=null,internal=false,loaded=false;
try{choice=localStorage.getItem(consentKey);internal=localStorage.getItem(internalKey)==='yes'}catch(_){}

const query=new URLSearchParams(location.search);
if(query.get('internal')==='1'){internal=true;try{localStorage.setItem(internalKey,'yes')}catch(_){}cleanInternalParameter()}
if(query.get('internal')==='0'){internal=false;try{localStorage.removeItem(internalKey)}catch(_){}cleanInternalParameter()}
function cleanInternalParameter(){query.delete('internal');const next=location.pathname+(query.toString()?'?'+query:'')+location.hash;history.replaceState({},'',next)}
if(internal){window['ga-disable-'+id]=true;return}

window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
gtag('consent','default',{analytics_storage:'granted',ad_storage:privacySignal?'denied':'granted',ad_user_data:privacySignal?'denied':'granted',ad_personalization:privacySignal?'denied':'granted',wait_for_update:500});
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',region:restrictedRegions,wait_for_update:500});

function safeLocation(value){try{const u=new URL(value,location.href);return hosts.includes(u.hostname)?u.origin+(allowed.has(u.pathname)?u.pathname:'/other'):''}catch(_){return ''}}
function permission(){const optional=choice!=='denied';return{analytics:optional,ads:optional&&!privacySignal}}
function consentUpdate(){const p=permission();gtag('consent','update',{analytics_storage:p.analytics?'granted':'denied',ad_storage:p.ads?'granted':'denied',ad_user_data:p.ads?'granted':'denied',ad_personalization:p.ads?'granted':'denied'});return p}
function start(){if(loaded)return;loaded=true;const p=permission();if(choice!==null)consentUpdate();gtag('js',new Date());gtag('set','linker',{domains:['sunpointglobal.net','sunpointbeacon.com','cloud.sunpointbeacon.com']});gtag('config',id,{send_page_view:false,allow_google_signals:p.ads,allow_ad_personalization_signals:p.ads,page_location:safeLocation(location.href),page_referrer:safeLocation(document.referrer),page_title:document.title});const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.append(script);track('page_view')}
function track(event,details={}){if(!loaded||!permission().analytics)return;gtag('event',event,{...details,page_location:safeLocation(location.href),page_referrer:safeLocation(document.referrer),send_to:id})}

const brand=location.hostname.includes('sunpointbeacon')?'SunPoint Beacon':'SunPoint Global';
const privacyUrl=location.hostname==='cloud.sunpointbeacon.com'?'https://sunpointbeacon.com/privacy.html':'privacy.html';
const panel=document.createElement('aside');panel.setAttribute('aria-label','Privacy choices');panel.className='analytics-consent';panel.innerHTML='<p>We use cookies to improve '+brand+' and understand what visitors find useful.</p><div class="analytics-consent-actions"><button type="button" data-consent-action="preferences">Privacy choices</button><button type="button" data-consent-action="dismiss">Got it</button></div><div class="analytics-consent-details" hidden><p>'+(privacySignal?'Your browser\'s privacy preference is active. You can also turn off optional analytics.':'Choose whether optional analytics and advertising cookies may be used.')+'</p><div class="analytics-consent-actions"><button type="button" data-consent="denied">Essential only</button><button type="button" data-consent="granted">Allow optional cookies</button><a href="'+privacyUrl+'">Privacy</a></div></div>';
function showPreferences(){panel.hidden=false;panel.classList.add('is-expanded');panel.querySelector('.analytics-consent-details').hidden=false}
function saveConsent(value){choice=value;try{localStorage.setItem(consentKey,value)}catch(_){}consentUpdate();panel.hidden=true;if(value==='granted')start()}
panel.addEventListener('click',event=>{const action=event.target.dataset.consentAction,value=event.target.dataset.consent;if(action==='preferences')showPreferences();if(action==='dismiss')saveConsent('granted');if(value)saveConsent(value)});
document.body.append(panel);panel.hidden=choice!==null;
const preferences=document.createElement('button');preferences.type='button';preferences.className='analytics-preferences';preferences.textContent='Privacy choices';preferences.addEventListener('click',showPreferences);(document.querySelector('.footer-links')||document.querySelector('footer')||document.body).append(preferences);
start();

document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]');if(!link)return;try{const u=new URL(link.href,location.href);let name=null;if(u.hostname==='cloud.sunpointbeacon.com'&&u.pathname.startsWith('/demo'))name='demo_start';else if(u.pathname.includes('pricing')||u.pathname==='/plans')name='view_pricing';else if(u.pathname.startsWith('/order/'))name='begin_checkout';else if(u.pathname==='/evaluate')name='evaluation_interest';else if(u.pathname==='/contact.html')name='contact_start';else if(u.hostname==='cloud.sunpointbeacon.com'&&u.pathname==='/login')name='cloud_login';if(name)track(name,{link_domain:u.hostname,link_path:u.pathname})}catch(_){}});
document.addEventListener('sunpoint:contact-sent',event=>track(event.detail?.kind==='feedback'?'feedback_submit':'generate_lead',{lead_type:event.detail?.kind||'contact'}));
})();

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// for testing purposes
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

// for testing purposes
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log('Time ', time);

// remove line if you want to have default behaviour (no debugging in prod)
workbox.setConfig({ debug: true });


// https://medium.com/@webmaxru/workbox-4-implementing-refresh-to-update-version-flow-using-the-workbox-window-module-41284967e79c
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// remove if not needed
workbox.googleAnalytics.initialize();


//
// Caching strategies and routes
// https://developers.google.com/web/tools/workbox/modules/workbox-strategies
// https://developers.google.com/web/tools/workbox/guides/route-requests 
//
workbox.routing.registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/@ionic'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'ionic-cdn',
    })
);

workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

// Use precache CLI to update sw-config.js 
// https://developers.google.com/web/tools/workbox/guides/precache-files/cli
workbox.precaching.precacheAndRoute([
  {
    "url": "assets/img/great-success.png",
    "revision": "87737bad67d41eb624a44f4a24189a0d"
  },
  {
    "url": "assets/img/ionic/avatar-ben.png",
    "revision": "70519d8b3df6c00cbdf49083eb6d12fd"
  },
  {
    "url": "assets/img/ionic/avatar-finn.png",
    "revision": "5ecd3b628b6f531ea781eb5b13d0ab02"
  },
  {
    "url": "assets/img/ionic/avatar-han.png",
    "revision": "af89620b6bfe170be3939ad851e93bbb"
  },
  {
    "url": "assets/img/ionic/avatar-leia.png",
    "revision": "b62ec9476668f9d3373a5c3a3cf8e6e6"
  },
  {
    "url": "assets/img/ionic/avatar-luke.png",
    "revision": "7f6ed9ea91767371760ac79aba0cbdf5"
  },
  {
    "url": "assets/img/ionic/avatar-poe.png",
    "revision": "26d0e4bd275812ffdcb93233cfb2cbff"
  },
  {
    "url": "assets/img/ionic/avatar-rey.png",
    "revision": "921784ac69903e11d1962e795377cea2"
  },
  {
    "url": "assets/img/ionic/avatar-yoda.png",
    "revision": "bc795699a49e10c5800d8ed4e728b396"
  },
  {
    "url": "assets/img/ionic/avatar.svg",
    "revision": "19e749cddf1ac08d7080db1bccbd3722"
  },
  {
    "url": "assets/img/ionic/boniver.jpeg",
    "revision": "28d4b8517a1b6f3cdaebef31920818e0"
  },
  {
    "url": "assets/img/ionic/chancetherapper.jpeg",
    "revision": "468e638a11e10030973b2b98c0f2f867"
  },
  {
    "url": "assets/img/ionic/childishgambino.jpeg",
    "revision": "88bccba29232aea157410cc5ab666ada"
  },
  {
    "url": "assets/img/ionic/index.html",
    "revision": "5fe9e87e115bc00a8fe51ba6038a6d13"
  },
  {
    "url": "assets/img/ionic/ironwine.jpeg",
    "revision": "a188d6a4f30fb1651674363f38d9583e"
  },
  {
    "url": "assets/img/ionic/kimbra.jpeg",
    "revision": "d63a47b964aa78f8b569965f81ed544b"
  },
  {
    "url": "assets/img/ionic/pinkfloyd.jpeg",
    "revision": "42ff99e1bbe00db73b7ec33267b268f9"
  },
  {
    "url": "assets/img/ionic/porterrobinson.jpeg",
    "revision": "f4becdfa66716b5dc5ad8fa1d178e8bf"
  },
  {
    "url": "assets/img/ionic/thebeatles.jpeg",
    "revision": "11c35c2961fcfc3e2bb220a8e6493179"
  },
  {
    "url": "assets/img/logo-512.png",
    "revision": "969c573d518c9b22995a5ed9e5a59ce5"
  },
  {
    "url": "assets/img/madison.jpg",
    "revision": "f04e7dbe3ed0fc930b27748f6dceedf6"
  },
  {
    "url": "assets/img/slides/slide-1.png",
    "revision": "54838b8f9e6c3bcad5357e3fd70fb63d"
  },
  {
    "url": "assets/img/slides/slide-2.png",
    "revision": "2322bde9b25de20257ab55a29f254b87"
  },
  {
    "url": "assets/img/slides/slide-3.png",
    "revision": "9723c9a86af96daf3df52b3ff0da3e3f"
  },
  {
    "url": "assets/img/slides/slide-4.png",
    "revision": "9bc5d7587877590f2074280ae1d833ee"
  },
  {
    "url": "assets/src/users.js",
    "revision": "6e82510cd7dff2a926d21c2e18091b87"
  },
  {
    "url": "build/bundle.css",
    "revision": "e79ab4261c5f89b58e58aa46ab314044"
  },
  {
    "url": "build/bundle.js",
    "revision": "556e1b18196f26415a8c87ebc4e184a7"
  },
  {
    "url": "favicon.png",
    "revision": "c64beab291de80970aa4887a5a1c9135"
  },
  {
    "url": "global.css",
    "revision": "e79f7a24e68b9543b951912763fe0a38"
  },
  {
    "url": "index.html",
    "revision": "e27ccacfd8fa23eb7b5c2ab2999e01ce"
  },
  {
    "url": "manifest.json",
    "revision": "ae22efbe323ab1d4bc8e202c65f849b6"
  }
]);
// // self.addEventListener("install",e=>{
// //     console.log("service worker changed");
// //     caches.open("static").then((caches)=>{
// //             return.cache.addAll[]
// //     })
// // })

// // self.addEventListener("fetch",e=>{
// //     e.respondWith(
// //         caches.match(e.request).then(response=>{
// //             // 
// //             return response || fetch(e.request)
// //         })
// //     )
// // })

// const CACHE_NAME = 'version-1'
// const urlsToCache = ["./index.html","./offline.html"]

// this.addEventListener("install",(event)=>{
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache)=>{
//             console.log("opened cache");
//             return cache.addAll[urlsToCache]
//         })
//     )
// })

// this.addEventListener("fetch",e=>{
//     e.respondWith(
//         caches.match(e.request).then(response=>{
//             //       // Check if the request is already cached
//             if (response) {
//                 return response; // Return the cached response
//             }
//             return fetch(e.request).catch(()=>caches.match('./offline.html'))
//         })
//     ) 
// })

// // Activate add event lisnter   
// this.addEventListener('activate',(event)=>{
//     const cachWhitelist = []
//     cachWhitelist.push(CACHE_NAME)
//     event.waitUntil(caches.keys().then((cacheNames)=>Promise.all(
//         cacheNames.map((cacheName)=>{
//             if(!cachWhitelist.includes(cacheName)){
//                 return caches.delete(cacheName)
//             }
//         })
//     )

//   ))
// })

const CACHE_NAME = 'version-1';
const urlsToCache = ["./index.html","./offline.html"];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(e.request).catch(() => caches.match('./offline.html'));
    })
  );
});

this.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

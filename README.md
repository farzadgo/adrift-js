## adrift app 

#### The public repository for adrift app, part of Farzad Golghasemi's work associated with Digital Media Bremen master program.
***
Adrift is a front-end single page application written in vanilla Javascrip. This web application is based on theories connected to the Situationist Internation. It takes the direction text from Maps, deconstructs it and enables one to to get lost in the city. 
Quick keywords: - Data privacy and open sources, - Theory of Derive, - Critique of everyday life, - Psychogeography

### Storage and data privacy
The page data storage is currently sessionStorage, which means after page reload the data will be cleaned.
Another simple method of saving data including media files, here voice recordings (blobs) is to use cloud services such as Firebase, AWS, Azure etc. yet regarding data privacy issues it is prefered to use client-side storage (on the machine / browser). Unlike sessionStorage, localStorage can rather keep simple data (here directions, steps, orders) for later visit of the page whick can be implemented in later versions.

- [Client-side storage - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)
- [Web Storage API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

app/assets/screenshots/adrift_maps_01.jpg
https://raw.githubusercontent.com/farzadgo/adrift/master/app/assets/screenshots/adrift_maps_01.jpg


### Links connected to the project

- [Digital Media Bremen](http://digitalmedia-bremen.de/)
- [Situationis International Online](https://www.cddc.vt.edu/sionline/)
- [Situationis International - Wiki](https://en.wikipedia.org/wiki/Situationist_International)
- [Psychogeography - Wiki](https://en.wikipedia.org/wiki/Psychogeography)
- [Theory of Derive - PDF](http://tbook.constantvzw.org/wp-content/derivedebord.pdf)

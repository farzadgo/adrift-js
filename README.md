# adrift
The public repository for the experimental and artistic research-based web application **adrift**, which is part of my work associated with Digital Media Bremen master program.

<a href="https://farzadgo.github.io/adrift-js/" target="_blank">v1 link</a>

<a href="https://adriftapp.netlify.app/" target="_blank">v2 link</a>

<br>

> **Note:** This version of the app **is not functioning properly on iOS**, partly because of the utilization of some modern web APIs which are not supported on every device yet. 

> **Note:** A version of Adrift is being developed in React, which utilizes Google Maps APIs and client-side storage  with IndexedDB. For updates and contributions: https://github.com/farzadgo/adrift-react 

## Contents

* [Theoretical background](#theoretical-background)
* [Development and data privacy](#development-and-data-privacy)
* [Links and references](#links-and-references)

Adrift deconstructs Google Maps direction text* and by doing so it offers a new set of directions based on the original one, thus it enables the performers to get lost in their very own environment. "Getting lost" refers to the perception of the urban fabric in a different way than what we usually experience in **everyday life**.

During the walk (or run, play, etc.) to nowhere, the performers are being asked a set of questions regarding the surrounding and offered the opportunity to record the answers in the form of conversations between them, hoping to initiate another level of observation and meaning-making through the act of walking and mapping.

*_The mentioned Google Maps direction text (generated by the Maps directions API) is accessible by sharing the selected **walking directions** to the searched location on Maps mobile app (See the instructions)._

## Theoretical background
The app and its intended drifts are based on the concepts of "Psychogeography" and "Dérive".

> [**Psychogeography**](https://en.wikipedia.org/wiki/Psychogeography) is an exploration of urban environments that emphasizes playfulness and "drifting". It has links to the Letterist and **Situationist International**s, revolutionary groups influenced by Marxist and anarchist theory, as well as by the attitudes and methods of Dadaists and Surrealists.[[1]](https://en.wikipedia.org/wiki/Psychogeography#cite_note-1) Psychogeography was defined in 1955 by Guy Debord as "the study of the precise laws and specific effects of the geographical environment, consciously organized or not, on the emotions and behavior of individuals."[[2]](https://en.wikipedia.org/wiki/Psychogeography#cite_note-2)

> The [**dérive**](https://en.wikipedia.org/wiki/D%C3%A9rive) (French: [de.ʁiv], "drift") is a revolutionary strategy originally put forward in the "Theory of the Dérive" (1956) by Guy Debord.[[3]](https://en.wikipedia.org/wiki/D%C3%A9rive#cite_note-1) Debord defines the dérive as "a mode of experimental behavior linked to the conditions of urban society: a technique of rapid passage through varied ambiances."[[4]](https://en.wikipedia.org/wiki/D%C3%A9rive#cite_note-Debord1958Definitions-2) It is an unplanned journey through a landscape, usually urban, in which participants drop their everyday relations and "let themselves be drawn by the attractions of the terrain and the encounters they find there". Though solo dérives are possible, Debord indicates "that the most fruitful numerical arrangement consists of several small groups of two or three people who have reached the same level of awareness, since cross-checking these different groups' impressions makes it possible to arrive at more objective conclusions."[[5]](https://en.wikipedia.org/wiki/D%C3%A9rive#cite_note-Debord1956Theory-3)

## Development and data privacy
Adrift is a front-end single-page application (SPA) written in vanilla JavaScript.

Adrift uses modern web API such as [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API) and [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API), which currently are not supported on iOS.

A common practice in saving user data (including media files) is to use cloud services, yet regarding the data privacy issues this version of Adrift does not provide any data storage. This means that after the page reload the data will be cleaned. However, it is possible to save the drifts/memories/recordings by tapping on specified download buttons.


## Links and references
- [Digital Media Bremen](http://digitalmedia-bremen.de/)
- [Situationist International Online](https://www.cddc.vt.edu/sionline/)
- [Theory of Derive - pdf](http://tbook.constantvzw.org/wp-content/derivedebord.pdf)
- [Dérive - wiki](https://en.wikipedia.org/wiki/D%C3%A9rive)
- [Psychogeography - wiki](https://en.wikipedia.org/wiki/Psychogeography)
- [Web Application - wiki](https://en.wikipedia.org/wiki/Web_application)
- [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)
- [Client-side storage](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)
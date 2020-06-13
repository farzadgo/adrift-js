// xoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxo TEXT INTERPRETTER

const textController = (() => {

  const deconstructor = (inp) => {
    
    const getDest = (arr) => {
      let destArr = [];
      arr.forEach(e => {
        if (e.includes('arrive')) {
          destArr = e.slice(e.indexOf('location:') + 1);
        }
      });
      return destArr.join(' ')
    }

    const getOrgDirs = (arr) => {
      let dirArr = [];
      const args_main = ['head', 'turn', 'slight', 'sharp', 'keep', 'continue'];
      const args_alt = ['take', 'enter', 'exit', 'cross'];
      arr.forEach(e => {
        if (args_main.indexOf(e[1]) !== -1) {
          dirArr.push(e.slice(0, 3));
        }
        else if (args_alt.indexOf(e[1]) !== -1) {
          e = e.slice(0, 2);
          e.push('something');
          dirArr.push(e);
        }
        else if (e[1] === 'arrive') {
          e = e.slice(0, 3);
          e.push(destination);
          dirArr.push(e);
        }
        else {
          e = e.slice(0, 1);
          e.push('sth', 'happens');
          dirArr.push(e);
        }
      });
      dirStr = dirArr.map(e => e.join(' '));
      return {
        dirArr: dirArr,
        dirStr: dirStr
      }
    }

    const getNewDirs = (arr) => {
      let dirArr = [];
      const arr_ = arr.map(e => [...e]);
      const args_turn = ['turn', 'slight', 'sharp', 'keep'];

      // const mapper = (n, start1, stop1, start2, stop2) => {
      //   const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      //   return newval
      // };

      arr_.forEach((e, i) => {

        // HEAD
        if (e[1] === 'head') { 
          let nav;         
          switch(e[2]) {
            case 'northwest':
              nav = 'southeast';
              break;
            case 'north':
              nav = 'south';
              break;
            case 'northeast':
              nav = 'southwest'
              break;
            case 'east':
              nav = 'west';
              break;
            case 'southeast':
              nav = 'northwest';
              break;
            case 'south':
              nav = 'north';
              break;
            case 'southwest':
              nav = 'northeast';
              break;
            case 'west':
              nav = 'east';
              break;
            default:
              nav = 'any directions';
          }
          e.splice(2, 1, nav);
          dirArr = [...dirArr, e];
        }

        // TURN, SLIGHT, SHARP, KEEP
        else if (args_turn.indexOf(e[1]) !== -1) {
          let nav = [e[0], 'turn'];
          let args = ['1st', '2nd','3rd', '4th', '5th'];
          let ordNo = parseInt(e[0]);

          const selector = (arr, int) => {
            int % 2 == 0 ? arr = arr.filter((e, i) => i % 2 == 0) : arr = arr.filter((e, i) => i % 2 == 1);
            let word = arr[Math.floor(Math.random()*arr.length)];
            return word
          }

          if (e[2] === 'left') {
            nav = [...nav, selector(args, ordNo), 'right'];
          } else if (e[2] === 'right') {
            nav = [...nav, selector(args, ordNo), 'left'];
          }

          dirArr = [...dirArr, nav]
        }

        // CONTINUE
        else if (e[1] === 'continue') {
          let action = [e[0], 'cross', 'the', 'street'];
          // action = [...action, 'continue more'];
          dirArr = [...dirArr, action];
        }

        // ARRIVE
        else if (e[1] === 'arrive') {
          let action = [e[0], 'enjoy', 'getting', 'lost'];
          dirArr = [...dirArr, action];
        }

        // OTHER
        else {
          let action = [e[0], 'turn', 'any', 'direction'];
          dirArr = [...dirArr, action];
        }

      });
      dirStr = dirArr.map(e => e.join(' '));
      return {
        dirArr: dirArr,
        dirStr: dirStr
      }
    }

    const getQuestions = (arr) => {
      const allQuestions = [
        'What do you see on the left side?',
        'What do you see on the right side?',
        // 'Is there a public space on the left side?',
        // 'Is there a public space on the right side?',
        'Is the any gatherins on the left side?',
        'Is the any gatherins on the right side?',
        'Are there any surveillance cameras around?',
        'Are there any shops on the left side?',
        'Are there any shops on the right side?',
        // 'Are there any schools around?',
        // 'Are there any hospitals around?',
        // 'Do you think that this area is gentrified?',
        'How old could the building/space on the left be?',
        'How old could the building/space on the right be?',
        // 'What color/type is the facade on the left?',
        // 'What color/type is the facade on the right?',
        'What color is the surface on the left?',
        'What color is the surface on the right?',
        // 'What is the density of the car traffic around?',
        'Is there a bike lane on the left side?',
        'Is there a bike lane on the right side?',
        'What is the material under your feet?',
        'How many cars do you see in the radius of 10 meters?',
        // 'Are there many bikers around?',
        // 'Is this area/neighborhood old or new?',
        'What history could the building on the right have?',
        'What history could the building on the left have?',
        // 'What can be the story behind the building on the right?',
        // 'What can be the story behind the building on the right?',
        'Is it dirty around?',
        // **noises of cars
        // **sound of bird
        // **smell of flowers
        // **breathing situation
        'How does it smell around?',
        // 'Do you feel small or big compared to what surrounds you?',
        'Listen, where does the sound come from?',
        'What is the temperature of the surface on the left?',
        'What is the temperature of the surface on the right?',
        // 'Which is a the material that occurs the most within the field of view?',
        'Can you close you’re eyes and follow the way with eyes being closed?',
        // **the left/right If there’s no facade: touch the ground
        'Could there be a hidden garden around?',
        
      ];
      const randomItem = (items) => {
        let item = items[Math.floor(Math.random() * items.length)];
        return item
      };

      
      let qArr = [];
      let index = allQuestions.length;
      while (index > 0) {
        let newItem = randomItem(allQuestions);
        if (qArr.indexOf(newItem) === -1) {
          qArr.push(newItem);
          index -= 1
        }
      }
      
      let qArr_ = [];
      let dif = arr.length - qArr.length;
      if (dif > 0) {
        if (dif > qArr.length) {
          while (dif > qArr.length) {
            qArr_ = [...qArr_, ...qArr];
            dif = arr.length - qArr_.length;
          };
          qArr_ = [...qArr_, ...qArr.slice(0, dif)];
          console.log(qArr_);
          return qArr_
        } else {
          qArr = [...qArr, ...qArr.slice(0, dif)];
          console.log(qArr);
          return qArr
        }
      } else if (dif < 0) {
        console.log('case 2');
        qArr = qArr.slice(0, qArr.length + dif)
        console.log('case 2', qArr);
        return qArr
      } else {
        return qArr
      }

    }

    const allLines = inp.toLowerCase().split('\n').filter(Boolean);
    const allWords = allLines.map(e => e.split(' '));
    const dirWords = allWords.filter(e => e[0] === `${parseInt(e[0])}.`);
    // console.log(dirWords);
    const destination = getDest(dirWords);
    // console.log('destination', destination);
    const orgDirs = getOrgDirs(dirWords);
    // console.log('orgDirs', orgDirs);
    const newDirs = getNewDirs(orgDirs.dirArr);
    // console.log('newDirs', newDirs);
    const questions = getQuestions(orgDirs.dirStr);
    // console.log(questions);
    
    return {
      destination: destination,
      orgDirs: orgDirs,
      newDirs: newDirs,
      questions: questions,
    }
  }
  
  const addDrift = (inp) => {
    const dirObj = deconstructor(inp);

    if (!!Object.values(dirObj).every(item => item)) {
      // ID
      let ID;
      data.drifts.length == 0 ? ID = 0 : ID = data.drifts[data.drifts.length - 1].id + 1;
      // DATE
      const ts = new Date();
      let date = ts.toLocaleString();
      // DEST
      let dest = dirObj.destination;
      // ORIGINAL STEPS
      let sourceSteps = dirObj.orgDirs.dirStr;
      // NEW STEPS
      let lostSteps = dirObj.newDirs.dirStr;
      // QUESTIONS
      let questions = dirObj.questions;
      // RECORDINGS
      let recordings = [];
      recordings.length = dirObj.newDirs.dirArr.length;
  
      const newDrift = new Drift(ID, date, dest, sourceSteps, lostSteps, questions, recordings);
      data.drifts.push(newDrift);
      return newDrift

    } else {
      alert("Wrong direction text format \nCheck the instructions please 🙄");
    }
  }

  const Drift = function(id, date, dest, stp, stp_, qs, rs) {
    this.id = id;
    this.date = date;
    this.dest = dest;
    this.srcSteps = stp;
    this.lstSteps = stp_;
    this.questions = qs;
    this.records = rs
  }

  const data = { drifts: [] };
  
  return {
    addDrift: (inp) => {
      return addDrift(inp);
    },
    getData: () => {
      return data
    }
  }

})();

// xoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxo UI CONTROLLER

const uiController = (() => {

  const domElements = {
    section: document.querySelector('.main'),
    menu: document.querySelector('.menu'),
    menuItems: document.querySelectorAll('.menu-item'),
    menuTitles: document.querySelectorAll('.menu-title'),
    header: document.querySelector('.header'),
    headerRight: document.querySelector('.header-right'),
    headerLeft: document.querySelector('.header-left'),
    swiper: document.querySelector('.swiper-container')
  }

  return {
    getDomElements: () => {
      return domElements
    }
  }
  
})();

// xoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxo MAIN CONTROLLER

const appController = ((textC, uiC) => {

  const DOM = uiC.getDomElements();

  const addNewDrift = (inp) => {
    let inputValue = inp;
    let newDrift = textC.addDrift(inputValue);    
    return newDrift
  }

  const deleteDrift = (e) => {
    let index;
    // console.log(typeof e.target.parentNode.id);
    const currentId = Number(e.target.parentNode.id);
    const ids = textC.getData().drifts.map(elm => elm.id);
    index = ids.indexOf(currentId);
    textC.getData().drifts.splice(index, 1);
    getList();
  }

  // -------------------------------------------------------------------------------------------

  const headerHandler = () => {

    DOM.headerRight.innerHTML = '<i class="material-icons md-lg"> menu </i>';

    DOM.headerRight.addEventListener('click', (e) => {
      DOM.menu.classList.toggle('is-visible');
      headerToggler(e.target);
    });

    DOM.headerLeft.addEventListener('click', (e) => {     
      if (e.target.name === "new" || e.target.name === "preview") {
        getList();
      } else if (e.target.name === "steps") {
        let currentDrift = textC.getData().drifts.filter(dft => dft.id == e.target.id)[0];
        getPreview(currentDrift);
      }
    });

    const headerToggler = (e) => {
      if (DOM.menu.classList.contains('is-visible')) {
        e.innerHTML = '<i class="material-icons md-lg"> close </i>';
        e.classList.add('inverted');
        DOM.headerLeft.style.display = "none";
        DOM.header.style.backgroundColor = "black";
      } else {
        e.innerHTML = '<i class="material-icons md-lg"> menu </i>';
        e.classList.remove('inverted');
        DOM.header.style.backgroundColor = "white";
        DOM.headerLeft.style.display = "block";
      }
    }

  }

  // -------------------------------------------------------------------------------------------

  const menuHandler = () => {

    // MENU ITEMS LISTENERS
    DOM.menuTitles.forEach((el, i) => {
      if (i !== 0) {
        el.addEventListener('click', e => {
          const titleSpan = e.target.firstChild;
          const content = e.target.nextElementSibling;
          const siblings = getSiblings(e.target.parentNode);
          if (content.hidden == true) {
            content.hidden = false;
            siblings.forEach(e => e.style.display = "none")
            titleSpan.dataset.before = "arrow_back";
          } else {
            content.hidden = true;
            siblings.forEach(e => e.style.display = "block")
            titleSpan.dataset.before = " ";
          }
        });
      } else {
        el.addEventListener('click', () => {
          DOM.swiper.classList.remove('hidden')
        });
      }
    });

    const getSiblings = (elem) => {
      let siblings = [];
      let sibling = elem.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling
      }
      return siblings;
    }

  }

  // -------------------------------------------------------------------------------------------

  const getSwiper = () => {

    swiperHtml = `
      <button class="swiper-close"> <i class="material-icons md-lg"> arrow_back </i> </button>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_1.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            In Maps you can long press any point to pin the location.
            Look for finding out about the related walking <b>directions</b>.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_2.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            You can also <b>search</b> for a location and find its <b>walking</b> directions.<br>
            Tap on <b>⋮</b> to see the sharing options.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_3.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Tap on <b>Share directions</b> to access the directions text.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_4.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Among the offered apps and options tap on <b>Copy to clipboar</b>.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_5.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Open <b>adrift.digital</b> in your browser and tap on ＋ to initiate a drift.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_6.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            <b>Paste</b> the copied directions (or tap on the paste button to the bottom right).<br>
            If you haven't done the previous steps, you can paste a <b>sample</b> directions text by tapping on the button to the bottom left.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_7.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p> After pasting the directions text, tap on the <b>Get Lost</b>.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_8.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Btw, you can also type a Maps direction text manually 😉 The image shows a simple valid syntax.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_9.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>After previewing the new directions tap on the <b>Start Drift</b> to start drifting in the city.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_10.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            Follow the directions, answer the questions at each step in form of conversation with your
            friends concerning the surrounding. Have fun and follow your intuitions.
            Record your conversations by tapping on the <b>Record button</b>.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_11.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Stop the recording session by tapping on the <b>Stop button</b>.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_12.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            Before tapping the <b>Next button</b> in order to proceed, you can download your recording by taping on the download button.
            This is helpful if you want to perform another recording, as the cache keeps only the latest recording.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_13.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>Steps keep showing up...</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_14.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>
            Tap on <b>Finish</b> button at the final step.
            The directions and recording stuff are done, yet continue to your drift, discovery and imagination.
          </p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_15.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p> On the preview page you can download all the steps recordings you've done so far.</p>
        </div>
        <div class="swiper-slide">
          <img data-src="assets/screenshots/adrift_inst_16.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
          <p>On the first page you can see the drifts list with access to their previews and download buttons.</p>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    `;

    DOM.swiper.innerHTML = swiperHtml;

    const mySwiper = new Swiper('.swiper-container', {
      preloadImages: false,
      lazy: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      }
    });

    // HIDE SWIPER
    setTimeout(() => DOM.swiper.classList.add('hidden'), 100);

    // CLOSE BUTTON HANDLER
    document.querySelector('.swiper-close').addEventListener('click', () => {
      DOM.swiper.classList.add('hidden');
    });

  }

  // -------------------------------------------------------------------------------------------

  const getSteps = (obj) => {
    console.log("getSteps");
    // console.log(obj.lstSteps);
    const emptyIndex = obj.records.findIndex(e => e == null);
    // console.log(emptyIndex);

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "steps");
    DOM.headerLeft.innerHTML = '<i class="material-icons md-lg"> arrow_back </i>';

    // STEPS-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'steps-comp');
    
    // TO DO
    //if no "nth" direction, take the last one
    let html = `
      <div class="steps" id=${emptyIndex}>

        <div class="step-item">
          <p> ${obj.lstSteps[emptyIndex]} </p>
          <p> ${obj.questions[emptyIndex]} </p>
        </div>

        <div class="step-item">
          <button class="button record-button" disabled> <i class="material-icons md-lg"> fiber_manual_record </i> </button>
          <button class="button stop-button" disabled> <i class="material-icons md-lg"> stop </i> </button>
        </div>

        <div class="step-item">
          <audio class="audio-player" controls></audio>
        </div>

        <div class="step-item downloader">
          <p> If you want to record another voice regarding current step, download just recorded one below before preceeding </p>
          <a class="download-link"> <i class="material-icons-sharp"> save_alt </i> </a>
        </div>

      </div>
      <button class="button txt next-button" disabled>
        ${emptyIndex == obj.records.length - 1 ? `Finish` : `Next`}
      </button>
    `;
    DOM.section.innerHTML = html;

    // LISTENERS
    const recordBtn = document.querySelector('.record-button');
    const stopBtn = document.querySelector('.stop-button');
    const audio = document.querySelector('.audio-player');
    const downloader = document.querySelector('.downloader');
    const downloadLink = document.querySelector('.download-link');
    const nextBtn = document.querySelector('.next-button');

    // RECORDING STUFF
    const startRecording = () => {
      console.log('recording started');
      recordBtn.disabled = true;
      stopBtn.disabled = false;
      recorder.start();
    }
    
    const stopRecording = () => {
      console.log('recordig stopped');
      recordBtn.disabled = false;
      stopBtn.disabled = true;
      // stopping the recorder will eventually trigger the 
      // `dataavailable` event and we can complete the recording process
      recorder.stop();
    }

    const onRecordingReady = (e) => {  
      console.log('onRecordReady');
      if (e.data.size > 0) {
        obj.records[emptyIndex] = e.data;
      }
      nextBtn.disabled = false;
      // console.log(obj);
      // e.data contains a blob representing the recording
      audio.style.display = "block";
      audio.src = URL.createObjectURL(e.data);
      // audio.play();
      downloader.style.display = "block";
      downloadLink.href = URL.createObjectURL(e.data);
      downloadLink.download = `adrift_${obj.dest}_step_${emptyIndex + 1}.wav`;
    }
  
    const handleSuccess = (stream) => {
      recordBtn.disabled = false;
      recordBtn.addEventListener('click', startRecording);
      stopBtn.addEventListener('click', stopRecording);
      recorder = new MediaRecorder(stream);
      // listen to dataavailable, which gets triggered whenever we have an audio blob available
      recorder.addEventListener('dataavailable', onRecordingReady);
    }

    // GET THE AUDIO STREAM FROM THE USER'S MIC
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

    // NEXT-BUTTON LISTENER
    nextBtn.addEventListener('click', () => {
      emptyIndex == obj.records.length - 1 ? getPreview(obj) : getSteps(obj);;
    });

  }

  // -------------------------------------------------------------------------------------------

  const getPreview = (obj) => {
    console.log("getPreview");
    // console.log(obj);

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "preview");
    DOM.headerLeft.setAttribute("id", obj.id);
    DOM.headerLeft.innerHTML = '<i class="material-icons md-lg"> first_page </i>';
    DOM.headerLeft.classList.remove('no-hover');

    // PREVIEW-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'preview-comp');
    DOM.section.setAttribute("id", obj.id);

    let html = `
      <div class="preview">

        <div class="preview-item">
          <p>
            Forget about ${obj.dest} >> ${obj.records.filter(e => e !== undefined).length}/${obj.records.length}
          </p>
        </div>

        <ul class="preview-item list">
          ${Array(obj.srcSteps.length).fill().map((item, i) => `
          <li class="preview-list-item"> ${obj.srcSteps[i]} </li>
          `).join('')}
        </ul>

        <ul class="preview-item list">
          ${Array(obj.lstSteps.length).fill().map((item, i) => `
          <li class="preview-list-item"> ${obj.lstSteps[i]} </li>
          `).join('')}
        </ul>

        <ul class="preview-item list">
          ${Array(obj.records.length).fill().map((item, i) => `
            ${obj.records[i] == null
              ? `<li class="preview-list-item"> <span class="box empty"><i class="material-icons-sharp"> check_box_outline_blank </i> </span> </li>`
              : `<li class="preview-list-item"> <a class="box download-link"> <i class="material-icons-sharp"> save_alt </i> </a> </li>`
            }
          `).join('')}
        </ul>

      </div>
      <button class="button delete-button"> <i class="material-icons md-lg"> delete </i> </button>
      <button class="button txt start-button" disabled>
        ${(() => {
          if (obj.records.every(e => e == undefined)) {
            return 'Start Drift'
          } else if (obj.records.includes(undefined)) {
            return 'Continue Drift'
          } else {
            return 'Drift Done'
          }
        })()}
      </button>
    `;
    DOM.section.innerHTML = html;

    // EVENT LISTENERS
    const startBtn = document.querySelector('.start-button');
    const deleteBtn = document.querySelector('.delete-button');
    const downloadLinks = document.querySelectorAll('.download-link');

    // DOWNLOAD BUTTONS
    downloadLinks.forEach((e, i) => {
      e.href = URL.createObjectURL(obj.records[i]);
      e.download = `adrift_${obj.dest}_step_${i+1}.wav`;
    });

    // START-BUTTON
    obj.records.includes(undefined) ? startBtn.disabled = false : null;
    startBtn.addEventListener('click', () => getSteps(obj));

    // DELETE-BUTTON
    deleteBtn.addEventListener('click', deleteDrift);

  }

  // -------------------------------------------------------------------------------------------

  const getNew = () => {
    console.log("getNew");

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "new");
    DOM.headerLeft.innerHTML = '<i class="material-icons md-lg"> arrow_back </i>';
    DOM.headerLeft.classList.remove('no-hover');

    // NEW-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'new-comp');

    let html = `
      <textarea class="textarea" type="text" value="none" placeholder="Paste the directions text here or tap on the bottom right &#x25E2;\n\nTo paste a sample directions text tap on the bottom left &#x25E3;"></textarea>
      <button class="paste-button sample"> <i class="material-icons md-lg"> format_list_numbered </i> </button>
      <button class="paste-button clip"> <i class="material-icons md-lg"> content_paste </i> </button>
      <button class="button txt lost-button" disabled> Get Lost </button>
    `;
    DOM.section.innerHTML = html;

    const sampleText = `# SAMPLE DIRECTION TEXT FROM THE MAPS

Shared route
From (53.1109262,8.8559480) to Starbucks via Parkallee.

21 min (6.1 km)

1. Head northeast on Am Biologischen Garten toward Robert-Hooke-Straße
2. Make a U-turn at Robert-Hooke-Straße
3. Turn right
4. Turn left onto Wilhelm-Herbst-Straße
5. Continue onto Wiener Straße
6. Turn right onto Universitätsallee
7. Continue onto Parkallee
8. At the roundabout, continue straight to stay on Parkallee
9. Continue onto Rembertistraße
10. Turn left onto Präsident-Kennedy-Platz
11. Turn right onto Bürgermeisterin-Mevissen-Weg
12. Turn right
13. Take the pedestrian tunnel
14. Continue straight onto Domshof
15. Turn right to stay on Domshof
16. Turn right onto Am Dom
17. Turn left onto Am Markt
18. Turn left to stay on Am Markt
19. Turn left onto Marktstraße
20. Arrive at location: Starbucks
To see this route visit https://maps.app.goo.gl/55hdYLAKswbuFAP46`;

    // LISTENERS
    const textInput = document.querySelector('.textarea');
    const lostBtn = document.querySelector('.lost-button');
    const pasteClipBtn = document.querySelector('.clip');
    const pasteSampleBtn = document.querySelector('.sample');

    // INPUT
    textInput.value = '';
    // textInput.focus();
    textInput.addEventListener('input', () => {
      if (textInput.value != '') {
        lostBtn.disabled = false;
        pasteSampleBtn.hidden = true;
        pasteClipBtn.hidden = true;
      } else {
        lostBtn.disabled = true;
        pasteSampleBtn.hidden = false;
        pasteClipBtn.hidden = false;
      }
    });

    // SAMPLE PASTER
    pasteSampleBtn.addEventListener('click', e => {
      textInput.value = sampleText;
      lostBtn.disabled = false;
      pasteClipBtn.hidden = true;
      e.target.hidden = true;
    });

    // CLIPBOARD PASTER
    pasteClipBtn.addEventListener('click', e => {
      navigator.clipboard.readText()
      .then(text => {
        if (text) {
          textInput.value = text;
          lostBtn.disabled = false;
          pasteSampleBtn.hidden = true;
          e.target.hidden = true;
        } else {
          console.log('clipbaoad empty');
        }
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
    });

    // LOST-BUTTON
    lostBtn.addEventListener('click', () => {
      let newDrift = addNewDrift(textInput.value);
      if (newDrift) {
        getPreview(newDrift);
      } else {
        getNew();
      }
    });

  }

  // -------------------------------------------------------------------------------------------

  const getList = () => {
    let drifts = textC.getData().drifts;
    console.log("getList - data.drift 🡧");
    console.log(drifts);
    
    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "list");
    DOM.headerLeft.innerHTML = '<span>all drifts</span>';
    DOM.headerLeft.classList.add('no-hover');

    // LIST-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'list-comp');
    // DOM.section.removeAttribute("id");

    let html = `
      ${drifts.length == 0 ? `
        <div class="list-message">
          <p>You have not performed any drifts yet</p>
          <p>Tap ＋ button to start</p>
        </div>
      ` : Array(drifts.length).fill().map((e, i) => `
        <div class="list-item" id=${drifts[i].id}>
          <p> <span class="item-title">Intention:</span> ${drifts[i].dest} </p>
          <p> <span class="item-title">Date:</span>  ${drifts[i].date} </p>
          <p> <span class="item-title">Steps completed:</span>
            ${drifts[i].records.filter(e => e !== undefined).length}/${drifts[i].records.length}
          </p>
        </div>
      `).join('')}
      <button class="button add-button">
        <i class="material-icons md-lg"> add </i>
      </button>
    `;
    DOM.section.innerHTML = html;

    // LISTENERS
    const addBtn = document.querySelector('.add-button');
    const items = document.querySelectorAll('.list-item');

    // ADD-BUTTON
    addBtn.addEventListener('click', () => {
      getNew();
    });

    // LIST-ITEMS
    items.forEach(item => {
      item.addEventListener('click', () => {
        const selectedDrift = textC.getData().drifts.filter(dft => dft.id == item.id)[0];
        getPreview(selectedDrift);
      });
    });
    
  }

  // -------------------------------------------------------------------------------------------

  const loader = () => {
    window.addEventListener('load', () => {
      document.querySelector('.loader').className += " hidden";
    });
  }

  const preventer = () => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = 'whaaaaat!?';
    });
  }

  // -------------------------------------------------------------------------------------------

  return {
    init: () => {
      console.log("app started..");
      loader();
      preventer();
      getSwiper();
      headerHandler();
      menuHandler();
      getList();
    },
    getData: () => {
      return data
    }
  }
  
})(textController, uiController);

appController.init();

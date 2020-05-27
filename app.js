// xoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxo ROUTER


const setupRouter = (() => {
  window.addEventListener('load', () => {

    const activeRoutes = Array.from(document.querySelectorAll('[route]'));
    // console.log(activeRoutes);

    const navigate = (e) => {
      let route = e.target.attributes[1].value;
      // console.log(route);

      // let routeInfo = router.routes.filter((r) => {
      //   return r.path === route;
      // })[0];
      // console.log(routeInfo);
      // if (!routeInfo) {
      //   console.log("wrong route etc..");
      // } else {
      //   window.history.pushState({}, '', routeInfo.path);
      // }
      window.history.pushState({}, '', route);
    };

    activeRoutes.forEach((route) => {
      route.addEventListener('click', navigate, false);
    });

    const Router = function(name, routes) {
      this.name = name;
      this.routes = routes
      // OR 
      // return {
      //   name: name,
      //   routes: routes
      // }
    }

    const router = new Router('Router', [
      { path: '/', name: 'Root'},
      { path: '/newdrift', name: 'New Drift'},
      { path: '/driftpreview', name: 'Drift Preview'},
    ]);
    // console.log(router);

  });

  // return {
  // }

});


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
          let action = [e[0], 'do', 'something', 'fun'];
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
      let singleQuestion = 'What do you see at your left side?';
      let qs = arr.map(e => singleQuestion);
      return qs
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

    // const myJsonOne = JSON.stringify(neuArr);
    // // console.log(myJsonOne);
    // const myJsonTwo = JSON.stringify(couple);
    // // console.log(myJsonTwo);
    
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
    header: document.querySelector('.header'),
    headerBtn: document.querySelector('.header-button'),
    headerRight: document.querySelector('.header-right'),
    headerLeft: document.querySelector('.header-left')
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

  // ------------------------------------------------------------------------------------------- 🡧

  const getHeader = () => {
    DOM.headerRight.innerHTML = '<i class="material-icons md-size"> menu </i>';
    DOM.headerRight.addEventListener('click', (e) => {
      DOM.menu.classList.toggle('is-visible');
      headerToggler(e.target);
      menuItemsFade(DOM.menuItems);
    });

    DOM.headerLeft.addEventListener('click', (e) => {     
      if (e.target.name === "new" || e.target.name === "preview") {
        getList();
      } else if (e.target.name === "steps") {
        let currentDrift = textC.getData().drifts.filter(dft => dft.id == e.target.id)[0];
        getPreview(currentDrift);
      }
    });
  }

  const headerToggler = (e) => {
    if (DOM.menu.classList.contains('is-visible')) {
      e.innerHTML = '<i class="material-icons md-size"> close </i>';
      e.classList.add('inverted');
      DOM.headerLeft.style.display = "none";
      DOM.header.style.backgroundColor = "black";
    } else {
      e.innerHTML = '<i class="material-icons md-size"> menu </i>';
      e.classList.remove('inverted');
      DOM.header.style.backgroundColor = "white";
      DOM.headerLeft.style.display = "block";
    }
  }

  const menuItemsFade = (nodes) => {
    if (DOM.menu.classList.contains('is-visible')) {
      nodes.forEach(el => {
        el.style.opacity = 1.0;
        el.style.visibility = "visible";
        el.style.height = "var(--header-height)";
        el.style.transition = "opacity 0.4s ease-in, visibility 0.4s ease-in, height 0.4s ease";
      });
    } else {
      nodes.forEach(el => {
        el.style.opacity = 0;
        el.style.visibility = "hidden";
        el.style.height = 0;
        el.style.transition = "none";
      });
    }
  }


  // ------------------------------------------------------------------------------------------- 🡧

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


  // ------------------------------------------------------------------------------------------- 🡧

  const getSteps = (obj) => {
    console.log("getSteps");
    // console.log(obj.lstSteps);
    const emptyIndex = obj.records.findIndex(e => e == null);
    // console.log(emptyIndex);

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "steps");
    DOM.headerLeft.innerHTML = '<i class="material-icons md-size">arrow_back</i>';

    // STEPS-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'steps-comp');
    
    let html = `
      <div class="steps" id=${emptyIndex}>
        <p class="step-item dir"> ${obj.lstSteps[emptyIndex]} </p>
        <p class="step-item dir"> ${obj.questions[emptyIndex]} </p>
        <div class="step-item">
          <button class="button record-button" disabled> <i class="material-icons md-size">fiber_manual_record</i> </button>
          <button class="button stop-button" disabled> <i class="material-icons md-size">stop</i> </button>
        </div>
        <div class="step-item">
          <audio class="audio-player" controls></audio>
        </div>
        <div class="step-item download-div">
          <p> If you want to record another voice regarding current step, download just recorded one below before preceeding </p>
          <a class="download-link"> <i class="material-icons md-size"> save_alt </i> </a>
        </div>
      </div>
      <button class="button txt next-button" disabled route="/steps">
        ${emptyIndex == obj.records.length - 1 ? `Finish` : `Next`}
      </button>
    `;
    DOM.section.innerHTML = html;

    // LISTENERS
    const recordBtn = document.querySelector('.record-button');
    const stopBtn = document.querySelector('.stop-button');
    const audio = document.querySelector('.audio-player');
    const downloadDiv = document.querySelector('.download-div');
    const downloadLink = document.querySelector('.download-link');
    const nextBtn = document.querySelector('.next-button');

    // RECORDING STUFF
    function startRecording() {
      recordBtn.disabled = true;
      stopBtn.disabled = false;
      recorder.start();
    }
    
    function stopRecording() {
      recordBtn.disabled = false;
      stopBtn.disabled = true;
      // stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
      recorder.stop();
    }

    function onRecordingReady(e) {      
      if (e.data.size > 0) {
        obj.records[emptyIndex] = e.data;
      }
      nextBtn.disabled = false;
      console.log(obj);
      // e.data contains a blob representing the recording
      audio.src = URL.createObjectURL(e.data);
      // audio.play();
      downloadDiv.style.display = "block";
      // downloadLink.classList.remove('empty');
      // downloadLink.innerHTML = '<i class="material-icons md-size">save_alt</i>';
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


  // ------------------------------------------------------------------------------------------- 🡧

  const getPreview = (obj) => {
    console.log("getPreview");
    // console.log(obj);

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "preview");
    DOM.headerLeft.setAttribute("id", obj.id);
    DOM.headerLeft.innerHTML = '<i class="material-icons md-size">first_page</i>';
    DOM.headerLeft.classList.remove('no-hover');

    // PREVIEW-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'preview-comp');
    DOM.section.setAttribute("id", obj.id);

    let html = `
      <div class="preview">
        <div class="preview-item"> Forget about ${obj.dest} </div>
        <ul class="preview-item list left">
          ${Array(obj.srcSteps.length).fill().map((item, i) => `
          <li class="preview-list-item"> ${obj.srcSteps[i]} </li>
          `).join('')}
        </ul>
        <ul class="preview-item list right">
          ${Array(obj.lstSteps.length).fill().map((item, i) => `
          <li class="preview-list-item"> ${obj.lstSteps[i]} </li>
          `).join('')}
        </ul>
        <ul class="preview-item list boxes">
          ${Array(obj.records.length).fill().map((item, i) => `
            ${obj.records[i] == null
              ? `<li class="preview-list-item box"> <i class="material-icons"> check_box_outline_blank </i> </li>`
              : `<li class="preview-list-item box"> <a class="download-link"> <i class="material-icons"> save </i> </a> </li>`
            }
          `).join('')}
        </ul>
      </div>
      <button class="button delete-button" route="/steps"><i class="material-icons md-size">delete</i></button>
      <button class="button txt start-button" disabled route="/steps">
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


  // ------------------------------------------------------------------------------------------- 🡧

  const getNew = () => {
    console.log("getNew");

    // HEADER-LEFT
    DOM.headerLeft.setAttribute("name", "new");
    DOM.headerLeft.innerHTML = '<i class="material-icons md-size">arrow_back</i>';
    DOM.headerLeft.classList.remove('no-hover');

    // NEW-COMP
    DOM.section.classList.remove(...DOM.section.classList);
    DOM.section.classList.add('comp', 'new-comp');

    let html = `
      <textarea class="textarea" type="text" value="none" placeholder="paste directions text here..."></textarea>
      <button class="button txt lost-button" disabled route="/driftpreview"> Get Lost </button>
    `;
    DOM.section.innerHTML = html;

    // LISTENERS
    const textInput = document.querySelector('.textarea');
    const lostBtn = document.querySelector('.lost-button');

    // INPUT
    textInput.focus();
    textInput.addEventListener('input', () => textInput.value != '' ? lostBtn.disabled = false : lostBtn.disabled = true);

    // LOST-BUTTON
    lostBtn.addEventListener('click', () => {
      let newDrift = addNewDrift(textInput.value);
      if (newDrift) {
        getPreview(newDrift);
      } else {
        textInput.value = '';
        // textInput.focus();
        lostBtn.disabled = true;
      }
    });

  }


  // ------------------------------------------------------------------------------------------- 🡧

  const getList = () => {
    let drifts = textC.getData().drifts;
    console.log("getHome - data.drift 🡧");
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
      <button class="button add-button" route="/newdrift">
        <i class="material-icons md-size"> add </i>
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

  // ------------------------------------------------------------------------------------------- 🡧

  const loaderAnim = () => {
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
  

  return {
    init: () => {
      console.log("app started..");
      loaderAnim();
      // setupRouter();
      preventer();
      getList();
      getHeader();
    },
    getData: () => {
      return data
    }
  }

  
})(textController, uiController);


appController.init();






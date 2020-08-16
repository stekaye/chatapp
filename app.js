let delayInMilliseconds = 3000; //1 second
let today = new Date();
let time = today.getHours() + "." + (today.getMinutes() <10? '0': '') + today.getMinutes()

// *****************************************************
// REMOVE ANY ITEM FROM THE DOM
// *****************************************************

const removeItem = (parent, item) => {
  let parentItem = document.querySelector(parent);
  let deleteMe = document.querySelector(item);
  parentItem.removeChild(deleteMe);
}

// *****************************************************
// ADD INCOMING MESSAGE
// *****************************************************

const addMessage = (message="You want chicken of fish tonight?") => {

  const chatBox = document.querySelector('#current-chat');
  let newIncoming = document.createElement('div');
  newIncoming.classList.add('incoming');
  chatBox.appendChild(newIncoming);
  
  let newBubble = document.createElement('div');
  newBubble.classList.add('bubble');
  let newText = `${message}`;
  newBubble.innerHTML = newText;
  newIncoming.appendChild(newBubble);
  
  let newTime = document.createElement('div');
  newTime.classList.add('bubble-time');
  let messageTime = `Hoy ${time}`;
  newTime.innerHTML = messageTime;
  
  let addPhoto = document.createElement('div');
  addPhoto.classList.add('chat-user__image');
  addPhoto.classList.add('chat-user__image--1');
  
  removeItem("#current-chat", ".typing");
  newBubble.appendChild(newTime).appendChild(addPhoto);
  updateHistory(newText, messageTime);
}


// *****************************************************
// ADD OUTGOING MESSAGE
// *****************************************************

const addMessageOut = (message) => {

  const chatBox = document.querySelector('#current-chat');

  const newIncomingDiv = document.createElement('div');
  newIncomingDiv.classList.add('outgoing');
  chatBox.appendChild(newIncomingDiv);

  const newIncomingBubble = document.createElement('div');
  newIncomingBubble.classList.add('bubble')
  newIncomingBubble.innerHTML = `<span class="userText">${message}</span`;
  newIncomingDiv.appendChild(newIncomingBubble);

  const newTime = document.createElement('div');
  newTime.classList.add('bubble-time');
  newTime.innerText = `Hoy ${time}`;
  newIncomingBubble.appendChild(newTime)

}

// *****************************************************
// WHEN USER PRESSES RETURN, ADD TEXT TO CONVERSATION
// *****************************************************

const addItemInput = document.querySelector('#addText');

addItemInput.addEventListener('keypress', function(evt) {

  // evt.preventDefault();
  
  if (evt.key === 'Enter') {
    
    const userNewText = this.value;

    if (userNewText) {
      addMessageOut(userNewText);
      this.value = '';
      addTyping();
      setTimeout(respond, 6000);
    } 
  }
})

// *****************************************************
// WHEN USER CLICKS SUBMIT, ADD TEXT TO CONVERSATION
// *****************************************************

const clickSubmit = document.querySelector('.chat');
const userText = document.querySelector('#addText');

clickSubmit.addEventListener('click', function(evt) {

    evt.preventDefault();

    const userNewText = userText.value;

    if (userNewText) {
      addMessageOut(userNewText);
      this.value = '';
      addTyping();
      setTimeout(respond, 6000);
    } 
})

// *****************************************************
// ADD TYPING EFFECT AFTER USER RETURNS
// *****************************************************

const addTyping = () => {
  const chatBox = document.querySelector('#current-chat');
  
  const newTypingEffect = document.createElement('div');
  newTypingEffect.classList.add('typing');
  chatBox.appendChild(newTypingEffect);

  const effectContainer = document.createElement('div');
  effectContainer.classList.add('bubble');
  newTypingEffect.appendChild(effectContainer);

  const effect = document.createElement('div');
  effect.classList.add('dot-pulse');
  effectContainer.appendChild(effect);
}

// *****************************************************
// RESPOND TO USER PROMPT
// *****************************************************

const respond = () => {

  const normalResponses = ['Nice!', 'Cool!', 'Purrrrfext', 'Wicked!', 'Okay', 'Legend!', `&#128512`, `&#129409`, `&#270A`, `&#128513`, `&#128514`, `&#128515`, `&#128568`, `&#128571`, `&#128570`, `$#128572`];
  const questionResponses = ['Yeah!', 'No way!', 'Hmmm maybe', 'Purrrrrhaps', 'What do you think?', 'Definitely!', `&#128049`, `&#128050`, `&#128078`, `&#128169`, `&#128576`, `&#128573`, `&#128591`, `&#129300`, `&#129324`, `&#129505`]
  const randomIndex = Math.floor(Math.random() * normalResponses.length)
  
  const outgoingText = document.querySelectorAll('.userText')
  const lastMessage = outgoingText[outgoingText.length-1];
  const regex = new RegExp('!', 'g')
  const lastMessageStr = lastMessage.innerText.toLowerCase().replace(regex, '');
  const isolateLastLetter = lastMessageStr.split('').reverse().join('')[0];
  let response;
  
  let responsePairs = {
    'what?'     : "You heard me!",
    'huh?'      : "What don't you understand?",
    '?'         : "What?",
    '??'        : "What?",
    '???'       : "What?",
    'chicken'   : "Good choice! What time are you coming round?",
    'chicken?'   : "Good choice! What time are you coming round?",
    'fish'      : "Awesome. I've got some stored under the bed. What time are you coming round?",
    'fish?'      : "Awesome. I've got some stored under the bed. What time are you coming round?",
    'ham'       : "Sorry, i'm out! I think I have some spam. Would that work?",
    'beef'      : "Urrrgh disgusting!",
    'donkey'    : "What... no Shrek would kill me!",
    'hummous'   : "Okay your majesty",
    'no'        : "sigh",
    'no way'    : "sigh",
    'neither'   : "Typical",
    'bye'       : "Adios!",
    'goodbye'   : "Adios!",
    'adios'     : "Adios!",
    'see ya'    : "Adios!",
    'see you'   : "Adios!",
    'thanks'    : "No worries!",
    'thank you' : "No worries!",
    'miaow'     : "Purrrrrr",
    'miao'      : "Purrrrrr",
    'I love you': "Aww you charmer!",
    'love you'  : "Awww, eres la leche!",
    'love ya'   : "You're my catnip!",
    'love u'    : "You just love my boots!",
  }

  for (let response in responsePairs) {
    if (lastMessageStr === response) {
      response = responsePairs[response];
      return addMessage(response);
    }
  }

  if (isolateLastLetter === '?') {
    response = questionResponses[randomIndex];
  } else {
    response = normalResponses[randomIndex];
  }

  return addMessage(response);
}

// *****************************************************
// UPDATE CHAT HISTORY
// *****************************************************

const updateHistory = (message, time) => {

  let latestMsgTime = document.querySelectorAll('.chat-user__info--time')[0];
  let latestMsgText = document.querySelectorAll('.chat-user__info--message')[0];

  latestMsgTime.innerText = time;
  latestMsgText.innerText = message

}



setTimeout(addMessage, 6000);



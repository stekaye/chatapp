let delayInMilliseconds = 3000; //1 second
let today = new Date();
let time = today.getHours() + "." + (today.getMinutes() <10? '0': '') + today.getMinutes()
let year = today.getFullYear();

// *****************************************************
// REMOVE ANY ITEM FROM THE DOM
// *****************************************************

const removeItem = (item) => {
  let deleteMe = $(item);
  $(deleteMe).remove();
}

// *****************************************************
// ADD INCOMING MESSAGE
// *****************************************************

const addMessage = (message="Well you need to answer three questions first. One word answers only please! You ready?") => {

  let newIncoming = document.createElement('div');
  $(newIncoming).addClass('incoming');
  $('#current-chat').append(newIncoming);
  
  let newBubble = document.createElement('div');
  $(newBubble).addClass('bubble');
  let newText = `${message}`;
  $(newBubble).text(newText);
  $(newIncoming).append(newBubble);
  
  let newTime = document.createElement('div');
  $(newTime).addClass('bubble-time');
  let messageTime = `Hoy ${time}`;
  $(newTime).html(messageTime);
  
  let addPhoto = document.createElement('div');
  $(addPhoto).addClass('chat-user__image');
  $(addPhoto).addClass('chat-user__image--1');
  
  removeItem(".typing");
  $(newBubble).append(newTime, addPhoto);
  updateHistory(newText, messageTime);
}


// *****************************************************
// ADD OUTGOING MESSAGE
// *****************************************************

const addMessageOut = (message) => {

  const newIncomingDiv = document.createElement('div');
  $(newIncomingDiv).addClass('outgoing')
  $('#current-chat').append(newIncomingDiv)

  const newIncomingBubble = document.createElement('div');
  $(newIncomingBubble).addClass('bubble').html(`<span class="userText">${message}</span`);
  $(newIncomingDiv).append(newIncomingBubble);

  const newTime = document.createElement('div');
  $(newTime).addClass('bubble-time').text(`Hoy ${time}`)
  $(newIncomingBubble).append(newTime);

}

// *****************************************************
// WHEN USER PRESSES RETURN, ADD TEXT TO CONVERSATION
// *****************************************************

  $('#addText').on('keypress', function(evt) {
  
    if (evt.which === 13) {
      
      const userNewText = $(this).val();

      if (userNewText) {
        scrollDown();
        addMessageOut(userNewText);
        $(this).val('');
        addTyping();
        setTimeout(respond, 6000);
      } 
    }
  })

// *****************************************************
// WHEN USER CLICKS SUBMIT, ADD TEXT TO CONVERSATION
// *****************************************************

$('.chat').on('click', function(evt) {

    evt.preventDefault();

    const userNewText = $('#addText').val();

    if (userNewText) {
      scrollDown();
      addMessageOut(userNewText);
      $('#addText').val('')
      addTyping();
      setTimeout(respond, 6000);
    } 
})

// *****************************************************
// ADD TYPING EFFECT AFTER USER RETURNS
// *****************************************************

const addTyping = () => {
  
  const newTypingEffect = document.createElement('div');
  $(newTypingEffect).addClass('typing');
  $('#current-chat').append(newTypingEffect);

  const effectContainer = document.createElement('div');
  $(effectContainer).addClass('bubble');
  $(newTypingEffect).append(effectContainer);

  const effect = document.createElement('div');
  $(effect).addClass('dot-pulse');
  $(effectContainer).append(effect);

}

// *****************************************************
// RESPOND TO USER PROMPT
// *****************************************************

const respond = () => {

  const normalResponses = ['Nice!', 'Cool!', 'Purrrrfect', 'Wicked!', 'Sweeet', 'Legend!', '\u{1F600}', '\u{1F981}', '\u{270A}', '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F638}', '\u{1F63B}', '\u{1F63A}', '\u{1F63C}']
  
  const questionResponses = ['Yeah!', 'No way!', 'Hmmm maybe', 'Purrrrrhaps', 'What do you think?', 'Definitely!', , '\u{1F431}', '\u{1F432}', '\u{1F44E}', '\u{1F4A9}', '\u{1F640}', '\u{1F63D}', '\u{1F64F}', '\u{1F914}', '\u{1F92C}', '\u{1F9E1}']
  
  const randomIndex = Math.floor(Math.random() * normalResponses.length)
  const lastMessage = $('.userText').last()
  const regex = new RegExp('!', 'g')
  const lastMessageStr = lastMessage.text().toLowerCase().replace(regex, '');
  const isolateLastLetter = lastMessageStr.split('').reverse().join('')[0];
  
  let response;
  
  let responsePairs = {
    'yes'       : "Okay question one... It's 3pm, are you hunting or sleeping?",
    'yes sir'   : "Okay question one... It's 3pm, are you hunting or sleeping?",
    'ready'     : "Okay question one... It's 3pm, are you hunting or sleeping?",
    "i'm ready" : "Okay question one... It's 3pm, are you hunting or sleeping?",
    'no'        : "Well that's too bad! Question one... It's 3pm, are you hunting or sleeping?",
    'sleeping'  : "Excellent, napping is an important part of pusskateer culture. Question two...donkeys: friend or foe?",
    'hunting'   : "A warrior, I like it! We need someone to hunt while the elders nap. Question two... donkeys: friend or foe?",
    'friend'    : "Correct! They may smell bad but they have proven to be staunch allies. Last question... What is your weapon of choice: sword or paws?",
    'foe'       : "I thought that at first, but you must learn to work with them. Last question... What is your weapon of choice: sword or paws?",
    'sword'     : "Excellent. I have long been searching for a worthy sparring purrrtner! Congratulations, you are in! I will see you tomorrow at 9am sharp",
    'paws'      : "A pawrate master? Fantastico! Congratulations, you are in! I will see you tomorrow at 9am sharp",
    'where?'    : "You know where!",
    'do i?'     : "Yes!",
    "no i don't": "Then perhaps you are not the one we are looking for.",
    "i don't"   : "Then perhaps you are not the one we are looking for.",
    'ok'        : "Genial!",
    'okay'      : "Genial!",
    'what?'     : "You heard me!",
    'huh?'      : "What don't you understand?",
    '?'         : "What?",
    '??'        : "What?",
    '???'       : "What?",
    'neither'   : "Indecision is not an option, compadre. Pick an answer!",
    'bye'       : "Adios!",
    'goodbye'   : "Adios!",
    'adios'     : "Adios!",
    'see ya'    : "Adios!",
    'see you'   : "Adios!",
    'ciao'      : "Hasta mañana!",
    'amazing'   : "Yes it is, isn't it.",
    'awesome'   : "Why yes, I am.",
    'excellent' : 'We shall see.',
    'thanks'    : "You earned it kiddo!",
    'thank you' : "It was my pleasure!",
    'miaow'     : "Purrrrrr",
    'miao'      : "Purrrrrr",
    'I love you': "Aww you charmer!",
    'love you'  : "Awww, eres la leche!",
    'love ya'   : "You're my catnip!",
    'love u'    : "You just love my boots!",
    'nice pic'  : "Yes, I am gorgeous",
    'nice picture': "Yes, I am gorgeous"
  }

  for (let response in responsePairs) {
    if (lastMessageStr === response) {
      response = responsePairs[response];
      scrollDown();
      return addMessage(response);
    }
  }

  if (isolateLastLetter === '?') {
    response = questionResponses[randomIndex];
  } else {
    response = normalResponses[randomIndex];
  }

  scrollDown();
  addMessage(response);

}

// *****************************************************
// UPDATE CHAT HISTORY
// *****************************************************

const updateHistory = (message, time) => {

  $('.chat-user__info--time').first().text(time);
  $('.chat-user__info--message').first().text(message);

}

// *****************************************************
// KEEP SCROLL AT BOTTOM
// *****************************************************

const scrollDown = () => {

  let window = document.querySelector(".live-chat");
  window.scrollTop = window.scrollHeight - window.clientHeight;

}

// *****************************************************
// KEEP COPYRIGHT UPDATED WITH CURRENT YEAR
// *****************************************************

$('.copyright').html("Copyright Stephen Kaye @ " + year + ".")


setTimeout(addMessage, 4000);



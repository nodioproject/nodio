module.exports = function(element, string, options, callback_data) {
  'use strict';
  /*** Default settings ***/
  let settings = {
    print_all: false,               // print all chars simultaneously
    opacity: true,                  // add opacity effects
    min_opacity: 0,                 // minimum opacity value
    max_opacity: 1,                 // maximum opacity value
    opacity_frames: 0,              // additional opacity frames after print frsmes
    max_opacity_multiplier: 2,      // multiply max opacity on placeholders frames
    min_opacity_multiplier: 0.5,    // multiply min opacity on opacity frames
    no_repeat_length: 10,           // minimum characters between repeating char
    placeholder_frames: 1,          // placeholder characters before show letter
    frame_timeout: 40               // placeholder character show duration
  };
  Object.assign(settings, options);

  settings.print_timeout = settings.print_all ? 0 : settings.placeholder_frames * settings.frame_timeout;

  let repeat_exceptions = {
    number: [],
    symbol: [],
    letter: []
  };

  /*** Set placeholders object ***/
  let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let symbol = ['!', '@', '#', '$', '^', '&', '*', '~', ':', ';', '.', ',', '?', '/', '|'];
  let letter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let placeholders = {
    number: number,
    symbol: symbol,
    letter: letter
  };

  /*** Get print string ***/
  if(!string) {
    string = element.textContent;
  }

  /*** Get character data ***/
  let testChar = function(character) {
    let result = {};
    result.character = character;
    if(!isNaN(+character)) {
      result.type = 'number';
      result.number = +character;
    }
    else {
      if (character.toLowerCase() == character.toUpperCase()) {
        result.type = 'symbol';
        result.number = symbol.indexOf(character);
      }
      else {
        result.type = 'letter';
        result.number = letter.indexOf(character.toLowerCase());
        if (character == character.toUpperCase()) {
          result.case = 'UpperCase';
        }
        if (character == character.toLowerCase()){
          result.case = 'LowerCase';
        }
      }
    }
    if(character == ' ') {
      result.type = 'space';
      result.number = null;
    }
    return result;
  };

  /*** Randomizer ***/
  let randomizer = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /*** Set opacity ***/
  let setOpacity = function(element, timeout, placeholder_frames, opacity_frames) {
    let frames = placeholder_frames + opacity_frames;
    for(let i = frames; i >= 1; i--) {
      (function(index) {
        setTimeout(function() {
          let min_opacity = 0;
          let max_opacity = 1;
          if(index < placeholder_frames) {
            min_opacity = settings.min_opacity;
            max_opacity = (((index + 1) / placeholder_frames) * settings.max_opacity_multiplier).toFixed(2);
            if(max_opacity > settings.max_opacity) {
              max_opacity = settings.max_opacity;
            }
          }
          else {
            min_opacity = (((index + 1) / frames) * settings.min_opacity_multiplier).toFixed(2);
            max_opacity = 1;
          }
          let opacity_value = (randomizer(min_opacity * 100, max_opacity * 100) * 0.01).toFixed(2);
          element.style.opacity = opacity_value;
        }, timeout * (frames - i - 1));
      })((frames - i - 1));
    }
    setTimeout(function() {
      element.style.removeProperty("opacity");
    }, timeout * frames);
  };

  /*** Set placeholder ***/
  let setPlaceholder = function(element, timeout, frames) {
    let placeholder = element.getElementsByClassName('placeholder')[0];
    let data = JSON.parse(placeholder.getAttribute('data-character'));
    placeholder.removeAttribute('data-character');
    if(!placeholders[data.type]) {
      placeholder.remove();
      element.className = 'print-character';
      element.parentNode.classList.remove("print");
      return;
    }
    let placeholder_string = placeholders[data.type];
    for(let i = frames; i >= 1; i--) {
      (function(index) {
        setTimeout(function() {
          let current_placeholder_index = getRandomCharacter(data);
          let current_placeholder = placeholder_string[current_placeholder_index];
          if(data.case == 'UpperCase') {
            current_placeholder = current_placeholder.toUpperCase();
          }
          placeholder.textContent = current_placeholder;
        }, timeout * (frames - i - 1));
      })(i);
    }
    setTimeout(function() {
      placeholder.remove();
      element.className = 'print-character';
      element.parentNode.classList.remove("print");
      callback('character_printed');
    }, timeout * frames);
  };

  let getRandomCharacter = function(data) {
    let placeholders_length = placeholders[data.type].length - 1;
    let exceptions = repeat_exceptions[data.type].slice(0);
    if(0 > exceptions.indexOf(data.number)) {
      exceptions.push(data.number);
    }
    let result = exceptions[0];
    while(exceptions.indexOf(result) !== -1) {
      result = randomizer(0, placeholders_length - 1);
    }
    repeat_exceptions[data.type].push(result);
    let exceptions_length = repeat_exceptions[data.type].length;
    if(exceptions_length > settings.no_repeat_length || exceptions_length >= placeholders_length / 2) {
      repeat_exceptions[data.type].shift();
    }
    return result;
  };

  /*** Get print template ***/
  let getTemplate = function(string) {
    let result = Array();
    let string_length = string.length;
    for (let i = string_length; i >= 1; i--) {
      let char_el = document.createElement('span');
      char_el.className = 'print-character placeholder';
      char_el.innerHTML = string[string_length - i];

      let char_data = testChar(string[string_length - i]);
      let placeholder = document.createElement('span');
      placeholder.className = 'placeholder';
      placeholder.setAttribute('data-character', JSON.stringify(char_data));
      char_el.appendChild(placeholder);
      result.push(char_el);
    }
    return result;
  };
  let template = getTemplate(string);

  /*** Print  ***/
  let printTemplate = function(element, template, timeout) {
    element.innerHTML = '';
    let template_length = template.length;
    if(timeout) {
      let spaces = 0;
      for(let i = template_length; i >= 1; i--) {
        (function(index) {
          if(JSON.parse(template[index].getElementsByClassName('placeholder')[0].getAttribute('data-character')).type == 'space') {
            spaces++;
            setTimeout(function() {
              let space_element = document.createElement('span');
              space_element.className = 'print-character';
              space_element.textContent = ' ';
              element.appendChild(space_element);
            }, timeout * (template_length - i - spaces));
            return;
          }
          setTimeout(function() {
            element.appendChild(template[index]);
            setPlaceholder(template[index], settings.frame_timeout, settings.placeholder_frames);
          }, timeout * (template_length - i - spaces));
        })(template_length - i);
      }
      setTimeout(function() {
        callback('string_printed');
      }, settings.frame_timeout * template_length);
    }
    else {
      for(let i = template_length; i >= 1; i--) {
        element.appendChild(template[template_length - i]);
        setPlaceholder(template[template_length - i], settings.frame_timeout, settings.placeholder_frames);
        if(settings.opacity) {
          setOpacity(template[template_length - i], settings.frame_timeout, settings.placeholder_frames, settings.opacity_frames);
        }
      }
      setTimeout(function() {
        callback('string_printed');
      }, settings.frame_timeout * template_length);
    }
  };
  printTemplate(element, template, settings.print_timeout);

  /*** Callback ***/
  let callback = function(event) {
    let data = null;
    if(callback_data) {
      data = {detail: callback_data};
    }
    document.dispatchEvent(new CustomEvent(event, data));
  };
};
var scroll = require('./scroll-to');

function calculateScrollOffset(elem, additionalOffset, alignment) {
  var body = document.body,
    html = document.documentElement;

  var elemRect = elem.getBoundingClientRect();
  var clientHeight = html.clientHeight;
  var contentHeight = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

  additionalOffset = additionalOffset || 0;

  var scrollPosition;
  if (alignment === 'bottom') {
    scrollPosition = elemRect.bottom - clientHeight;
  } else if (alignment === 'middle') {
    scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
  } else { // top and default
    scrollPosition = elemRect.top;
  }

  var maxScrollPosition = contentHeight - clientHeight;
  return Math.min(scrollPosition + additionalOffset + window.pageYOffset, maxScrollPosition);
}

function calculateScrollOffsetContainer(elem, additionalOffset, alignment, container, content) {

  var elemRect = elem.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();
  var containerHeight = containerRect.height;
  var contentHeight = Math.max( content.scrollHeight, content.offsetHeight,
    containerHeight, container.scrollHeight, container.offsetHeight );

  additionalOffset = additionalOffset || 0;

  var scrollPosition;
  if (alignment === 'bottom') {
    scrollPosition = elemRect.bottom - containerRect.bottom;
  } else if (alignment === 'middle') {
    scrollPosition = elemRect.bottom - (containerRect.bottom - (containerHeight / 2)) + (elemRect.height / 2);
  } else { // top and default
    scrollPosition = elemRect.top - containerRect.top;
  }

  var maxScrollPosition = contentHeight - containerHeight;
  return Math.min(scrollPosition + additionalOffset + container.scrollTop, maxScrollPosition);
}

module.exports = function (elem, options, container, content, onEnd) {
  options = options || {};
  if (typeof elem === 'string') {
    elem = document.querySelector(elem);

    if (!container) {
      var scrollY = calculateScrollOffset(elem, options.offset, options.align);
      return scroll(0, scrollY, options, undefined, onEnd);
    }

    if (typeof container === 'string' && typeof content === 'string') {
      container = document.querySelector(container);
      content = document.querySelector(content);

      if (container && content) {
        var scrollY = calculateScrollOffsetContainer(elem, options.offset, options.align, container, content);
        return scroll(0, scrollY, options, container, onEnd);
      }
    }
  }
};

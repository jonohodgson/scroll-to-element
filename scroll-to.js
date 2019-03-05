var Tween = require('./tween');
var raf = require('raf');

function scroll(container) {
  if (container) {
    return {
      top: container.scrollTop,
      left: container.scrollLeft
    }
  }
  var y = window.pageYOffset || document.documentElement.scrollTop;
  var x = window.pageXOffset || document.documentElement.scrollLeft;
  return { top: y, left: x };
}

function scrollTo(x, y, options, container, onEnd) {

  var scrollContainer = container || window;

  options = options || {};

  // start position
  var start = scroll(container);

  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  // scroll
  tween.update(function(o){
    scrollContainer.scrollTo(o.left | 0, o.top | 0);
  });

  // handle end
  tween.on('end', function(){
    animate = function(){};
    if(typeof onEnd === 'function') {
      onEnd();
    }
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();

  return tween;
}

module.exports = scrollTo;

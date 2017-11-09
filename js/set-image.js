/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
    schema: {
        on: {type: 'string'},
        target: {type: 'selector'},
        src: {type: 'string'},
        dur: {type: 'number', default: 300}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.setupFadeAnimation();

        el.addEventListener(data.on, function () {
            // Fade out image.
            data.target.emit('set-image-fade');
            // Wait for fade to complete.
            setTimeout(function () {
                // Set image.
                //data.target.setAttribute('material', 'src', data.src);
                createScene(data.src);
            }, data.dur);
        });
    },

    /**
     * Setup fade-in + fade-out.
     */
    setupFadeAnimation: function () {
        var data = this.data;
        var targetEl = this.data.target;

        // Only set up once.
        if (targetEl.dataset.setImageFadeSetup) {
            return;
        }
        targetEl.dataset.setImageFadeSetup = true;

        // Create animation.
        targetEl.setAttribute('animation__fade', {
            property: 'material.color',
            startEvents: 'set-image-fade',
            dir: 'alternate',
            dur: data.dur,
            from: '#FFF',
            to: '#000'
        });
    }
});

AFRAME.registerComponent('show-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 0}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      //data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('src', data.src);
        data.target.setAttribute('visible', 'true');
        data.target.setAttribute('height', '1');
        data.target.setAttribute('width', '1');
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});

AFRAME.registerComponent('start-tour', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    hide_target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 0}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener(data.on, function () {
      // Fade out image.
      //data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('src', data.src);
        data.target.setAttribute('color', '');
        var hTarget = data.hide_target;
        hTarget.setAttribute('visible','false');
      }, data.dur);
    });
  },
});
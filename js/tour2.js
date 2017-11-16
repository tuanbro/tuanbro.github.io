// init
document.addEventListener( 'DOMContentLoaded' , function () {

  var data;
  $.get('js/data.json', function (res) {
      data = res;
  });


  window.skyes = {
    current: 'sky-A',
    outer: 'sky-B',
    _id: 'home',
    init: false
  };
  var u = new URL( window.location.href );
  var p = u.searchParams.get('p') || '0';

  document.getElementById( 'sky-A' ).setAttribute( 'src', '#p' + p );
  document.getElementById( 'sky-B' ).setAttribute( 'src', '#p' + p );
  window.skyes._id = p;

  document.getElementById( 'sky-A' ).addEventListener( 'materialtextureloaded', cthSwapAnimation );
  document.getElementById( 'sky-B' ).addEventListener( 'materialtextureloaded', cthSwapAnimation );
  

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
*/
AFRAME.registerComponent( 'cth-swap', {
  schema: {
    target: { type: 'string' }
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener( 'click', function () {
        cthSwapSky( data.target );
    });

    // Check if we have the asset.
    if ( document.getElementById( 'p' + data.target ) ) {
      el.addEventListener( 'click', function () {
        cthSwapSky( data.target );
      });
    }
    else {
      this.el.setAttribute( 'model-opacity', "0.2" );
      console.warn( 'Didnt find asset', data.target );
    }
  },
  remove: function () {
    var data = this.data;
    var el = this.el;
    // Check if we have the asset.
    if ( document.getElementById( 'p' + data.target ) ) {
      el.removeEventListener( 'click', function () {
        cthSwapSky( data.target );
      });
    }
  }
});
/**/

AFRAME.registerComponent( 'cth-info', {
  schema: {
    target: { type: 'string' },
    pos: { type: 'string', default: 'none' },
    rot: { type: 'string', default: 'none' },
    width: { type: 'string', default: '6' },
    height: { type: 'string', default: '12' }
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    // Check if we have the asset.
    if ( document.getElementById( 'info' + data.target ) ) {
      el.addEventListener( 'click', function () {
        cthOverlay( data.target, data.pos, data.rot, data.width, data.height );
      });
    }
    else {
      this.el.setAttribute( 'model-opacity', "0.2" );
      console.warn( 'Didnt find asset','info' + data.target );
    }
  },
  remove: function () {
    var data = this.data;
    var el = this.el;
    // Check if we have the asset.
    if ( document.getElementById( 'info' + data.target ) ) {
      el.removeEventListener( 'click', function () {
        cthOverlay( data.target, data.pos, data.rot, data.width, data.height );
      });
    }
  }
});


function cthRejigMarkers () {
  var _w = document.getElementById( 'poi' );
  // Hide and kill current markers.
  var _c = document.querySelectorAll( '.marker' );
  for ( i = 0; i < _c.length; i++ ) {
    _c[i].emit( 'vanish' );
  }

  while ( _w.hasChildNodes() ) {
    _w.removeChild( _w.lastChild );
  }

  // move the home button!
  // if ( '520' == window.skyes._id ) {
       document.getElementById( 'home-wrapper' ).setAttribute( 'visible', 'false' );
  //   document.getElementById( 'home-wrapper' ).setAttribute( 'rotation', '0 180 180' );
  // }
  // else {
  //   document.getElementById( 'home-wrapper' ).setAttribute( 'position', '0 0 0' );
  //   document.getElementById( 'home-wrapper' ).setAttribute( 'rotation', '0 0 0' );
  // }

  setTimeout( function () {
    if ( data.scene[ window.skyes._id ] ) {
      // we have new markers.
        var _rot = false;
        var _cm = data.scene[ window.skyes._id ];

        var _container = document.createElement( 'a-entity' );
        _container.setAttribute( 'class', 'link active' );
        var assets = document.querySelector('a-assets');
        
        let spots = _cm.hotSpot;
        initHotSpots(_container, spots, assets);

        let infos = _cm.infoPot;
        initInfoSpots(_container, infos, assets);
      
        _w.appendChild( _container );
      

      setTimeout( function () {
        var newMarkers = document.querySelectorAll( '.marker' );
        for ( j = 0; j < newMarkers.length; j++ ) {
          newMarkers[j].emit( 'appear' );
          newMarkers[j].setAttribute( 'class', 'marker active' );
        }
      }, 100 );
    }
  }, 500 );
}

function initHotSpots(container, spots, assets) {
  for (let i = 0; i < spots.length; i++) {
        var _hotspot = document.createElement( 'a-entity' );
        _hotspot.setAttribute( 'id', 'm-' + window.skyes._id + '-' + spots[i].toScn );
        _hotspot.setAttribute( 'class', 'marker' );
        _hotspot.setAttribute( 'model-opacity', 0 );       

        _hotspot.setAttribute( 'obj-model', 'obj: #ar-obj; mtl: #ar-mtl' );
        _hotspot.setAttribute( 'scale', { x: 0.2, y: 0.2, z: 0.2 } );
        addToAssets('img', 'p' + spots[i].toScn, data.scene[ spots[i].toScn ].srcImg, assets);
       _hotspot.setAttribute( 'cth-swap', 'target: ' + spots[i].toScn + ';' );
        
        _hotspot.setAttribute( 'position', spots[i].pos );
        _hotspot.setAttribute( 'rotation', spots[i].rot );

        var _av = document.createElement( 'a-animation' );
        _av.setAttribute( 'begin', 'vanish' );
        _av.setAttribute( 'easing', 'ease-in' );
        _av.setAttribute( 'attribute', 'model-opacity' );
        _av.setAttribute( 'fill', 'forwards' );
        _av.setAttribute( 'from', 1 );
        _av.setAttribute( 'to', 0 );
        _av.setAttribute( 'dur', 250 );

        var _aa = document.createElement( 'a-animation' );
        _aa.setAttribute( 'begin', 'appear' );
        _aa.setAttribute( 'easing', 'ease-out' );
        _aa.setAttribute( 'attribute', 'model-opacity' );
        _aa.setAttribute( 'fill', 'forwards' );
        _aa.setAttribute( 'from', 0 );
        _aa.setAttribute( 'to', 1 );
        _aa.setAttribute( 'dur', 350 );

        _hotspot.appendChild( _av );
        _hotspot.appendChild( _aa );
        container.appendChild( _hotspot );
    }    
}

function initInfoSpots(container, infos, assets) {
  for (let i = 0; i < infos.length; i++) {
        var _infoSpot = document.createElement( 'a-entity' );
        _infoSpot.setAttribute( 'obj-model', 'obj: #asterisk-obj; mtl: #asterisk-mtl' );
        _infoSpot.setAttribute( 'scale', { x: 0.09, y: 0.09, z: 0.09 } );
        addToAssets('img', 'info' + infos[i].id, infos[i].img, assets);

        _infoSpot.setAttribute( 'cth-info', 'target: ' + infos[i].id + '; pos: ' + infos[i].overlay.pos + '; rot: ' + infos[i].overlay.rot + '; width: ' + infos[i].overlay.width + '; height: ' + infos[i].overlay.height + ';' );

        _infoSpot.setAttribute( 'position', infos[i].pos );
        _infoSpot.setAttribute( 'rotation', infos[i].rot );
        
        var _rot = document.createElement( 'a-animation' );
        _rot.setAttribute( 'easing', 'linear' );
        _rot.setAttribute( 'attribute', 'rotation' );
        _rot.setAttribute( 'repeat', 'indefinite' );
        _rot.setAttribute( 'fill', 'forwards' );
        _rot.setAttribute( 'from', '90 0 0' );
        _rot.setAttribute( 'to', '90 0 -360' );
        _rot.setAttribute( 'dur', 5000 );
        _infoSpot.appendChild( _rot );

        container.appendChild( _infoSpot );
    }    
}

function cthOverlay ( target, pos, rot, width, height ) {
  var el = document.getElementById( target );
  if ( el ) {
    el.emit( 'vanish' );
    setTimeout( function () {
      el.parentNode.removeChild( el );
    }, 350);
  }
  else {
    var _m = document.createElement( 'a-plane' );
    _m.setAttribute( 'id', target );
    _m.setAttribute( 'class', 'overlay' );
    //_m.setAttribute( 'model-opacity', 0 );

    _m.setAttribute( 'src', '#info' + target );
    _m.setAttribute( 'width', width );
    _m.setAttribute( 'height', height );
    _m.setAttribute( 'position', pos );
    _m.setAttribute( 'rotation', rot );
    _m.setAttribute( 'material', 'shader: flat; transparent: true;' );
   
    document.getElementById( 'poi' ).appendChild( _m );

    setTimeout( function () {
      _m.emit( 'appear' );
    });
  }
}

// Trigger the change
function cthSwapSky( target ) {
  //document.getElementById( 'marker-wrapper' ).classList.remove( 'enabled' );
  if ( window.skyes.current && window.skyes.outer ) {
    var nextScene = data.scene[ target ];

    // var camera = document.getElementById("cth-camera");
    // camera.setAttribute('rotation', nextScene.initView);
    
    var assets = document.querySelector('a-assets');
    assets.innerHTML = '';
    updateAssetsToDefault(assets);
    addToAssets('img', 'p' + target, nextScene.srcImg, assets);
    var outer = document.getElementById( window.skyes.outer );

    // Need to change the image?
    var outerMaterial = Object.assign( {}, outer.getAttribute( 'material' ) );
    outerMaterial.src = '#p' + target;
    outer.setAttribute( 'material', outerMaterial );
    // memorize the last one.
    window.skyes._id = target;
  }
}

function addToAssets(type, id, src, assets) {
  var item1 = document.createElement(type);
  item1.setAttribute('id', id);
  item1.setAttribute('src', src);
  item1.setAttribute('crossorigin', 'anonymous');
  assets.appendChild(item1);
}

function updateAssetsToDefault(assets) {
   addToAssets('a-asset-item','ar-obj','objects/arrow_flatten.obj',assets);
   addToAssets('a-asset-item','ar-mtl','objects/arrow_flatten.mtl',assets);
   addToAssets('a-asset-item','asterisk-obj','objects/asterisk_x2.obj',assets);
   addToAssets('a-asset-item','asterisk-mtl','objects/asterisk_x2.mtl',assets);
   addToAssets('a-asset-item','certhidea-obj','objects/certhidea.obj',assets);
   addToAssets('a-asset-item','certhidea-mtl','objects/certhidea.mtl',assets);
}

// <a-asset-item id="ar-obj" src="objects/arrow_flatten.obj"></a-asset-item>
//         <a-asset-item id="ar-mtl" src="objects/arrow_flatten.mtl"></a-asset-item>
//         <a-asset-item id="asterisk-obj" src="objects/asterisk_x2.obj"></a-asset-item>
//         <a-asset-item id="asterisk-mtl" src="objects/asterisk_x2.mtl"></a-asset-item>
//         <a-asset-item id="certhidea-obj" src="objects/certhidea.obj"></a-asset-item>
//         <a-asset-item id="certhidea-mtl" src="objects/certhidea.mtl"></a-asset-item>
//         <img id="p0" crossorigin="anonymous" src="img/photo/0.jpg">
//         <img id="p1" crossorigin="anonymous" src="img/photo/1.jpg">
//         <img id="p2" crossorigin="anonymous" src="img/photo/2.jpg">

// triggered when new texture is loaded and applyed (from cthSwapSky)
function cthSwapAnimation ( el ) {
  var elid = el.target.getAttribute( 'id' );
  if ( false === window.skyes.init && 'sky-B' ==  elid ) {
    window.skyes.init = true;
    return;
  }
  var current = document.getElementById( window.skyes.current );
  var outer = document.getElementById( window.skyes.outer );
  // quello al centro va in fadeout.
  current.emit( 'cth-swap-out' );
  setTimeout( function () {
    // Assicuriamoci che siano entrambi visibili.
    current.setAttribute( 'model-opacity', 1.0 );
    outer.setAttribute( 'model-opacity', 1.0 );

    // take care of markers.
    cthRejigMarkers();

    setTimeout( function () {
      // La sfera centrale ora è invisibile; Devo posizionarla come esterna
      // cambio il raggio di quello che è al centro.
      var cg = Object.assign( {}, current.getAttribute( 'geometry' ) );
      cg.radius = 16;
      current.setAttribute( 'geometry', cg );

      // cambio il raggio di quello che era di fuori
      var og = Object.assign( {}, outer.getAttribute( 'geometry' ) );
      og.radius = 15;
      outer.setAttribute( 'geometry', og );

      // swap'em
      var _c = window.skyes.current;
      window.skyes.current = window.skyes.outer;
      window.skyes.outer = _c;

      var outerMaterial = Object.assign( {}, current.getAttribute( 'material' ) );
      outerMaterial.src = null;
      current.setAttribute( 'material', outerMaterial );

      // @here
      //document.getElementById( 'marker-wrapper' ).classList.add( 'enabled' );
    }, 2000 );
  }, 400 );
}

AFRAME.registerComponent( 'model-opacity', {
  schema: {default: 1.0},
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) { return; }
    mesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  }
});

});

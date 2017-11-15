
// init
document.addEventListener( 'DOMContentLoaded' , function () {
  
var data;
$.get('js/data2.json', function (res) {
    data = res;
    changeScene(0);
});




function changeScene(index) {
    let choiceScene = data.scene[index];
    let assets = new Assets("assets");
    let img1 = new Img("img" + choiceScene.name, "anonymous", choiceScene.srcImg);
    let thumb0 = new Img("thumb0", "anonymous", choiceScene.thumb);
    let audio = new Audio("click-sound", "anonymous", choiceScene.audio);

    var assestsSource = document.querySelector("a-assets");
    var tempHTML=img1.write() +  thumb0.write()  +  audio.write() ;
   

    var skyA = document.getElementById("sky-A");
    var skyB = document.getElementById("sky-B");

      // <a-sky id="sky-A" class="sky" position="0 0 0" rotation="0 -108 0" radius="15" model-opacity="1" src="#phome" material="" scale="" visible="" geometry="">
      //   <a-animation begin="cth-swap-out" easing="ease-in" attribute="model-opacity" fill="forwards" from="1" to="0" dur="1500"></a-animation>
      // </a-sky>

    var camera = document.getElementById("mycamera")
    if(typeof choiceScene.rotView != 'undefined'){
        var initView = choiceScene.initView.x + ' ' + choiceScene.initView.y + ' ' + choiceScene.initView.z;
        camera.setAttribute( 'rotation', initView);
        camera.setAttribute( 'position', "0 0 0");
    }
    
    let hotSpots = new Entity("links");
    // hotSpots.addProperty("position", spots[i].pos.x + ' ' + spots[i].pos.y + ' ' + spots[i].pos.z);
    let spots = choiceScene.hotSpot;
    for (let i = 0; i < spots.length; i++) {
        let nextScene = data.scene[spots[i].toScn];
        let thumb = new Img("thumb" + i, "anonymous", nextScene.thumb);
        let imgScene = new Img("img" + i, "anonymous", nextScene.srcImg);
        tempHTML = tempHTML + thumb.write() + imgScene.write() ;
        let linkSpot = new Entity("");
        let icon = new AImage("toScn"+spots[i].toScn);
        icon.addProperty("src", "#thumb" + i);
        icon.addProperty("position", spots[i].pos.x + ' ' + spots[i].pos.y + ' ' + spots[i].pos.z );
        icon.addProperty("rotation", spots[i].rot.x + ' ' + spots[i].rot.y + ' ' + spots[i].rot.z );
        icon.addProperty("scale", "2 2 3");
        linkSpot.addChild(icon);
        linkSpot.addProperty("class", "link");
        linkSpot.addProperty("layout", "type: line; margin: 1.5");
        linkSpot.addProperty("cth-swap", 'target: ' + spots[i].toScn + ';');
        if (typeof spots[i].pos != 'undefined'){
            linkSpot.addProperty("position", spots[i].pos.x+ ' ' + spots[i].pos.y + ' ' + spots[i].pos.z);
        }
        if (typeof spots[i].rot != 'undefined'){
            linkSpot.addProperty("rotation", spots[i].rot.x+ ' ' + spots[i].rot.y + ' ' + spots[i].rot.z);
        }
        hotSpots.addChild(linkSpot);
    }

    var cursor = document.getElementById("cursor");
    cursor.setAttribute("raycaster", "objects: .link;");
    
    assestsSource.innerHTML = tempHTML;

    skyA.setAttribute("src","#img"+choiceScene.name);
    skyB.setAttribute("src","#img"+choiceScene.name);

    var hotSpotsGroup = document.getElementById("hotSpotsGroup");
    hotSpotsGroup.innerHTML = hotSpots.write();

}


  window.skyes = {
    current: 'sky-B',
    outer: 'sky-A',
    _id: 'home',
    init: false
  };
  var nextId;
  window.skyes._id = 0;
  document.getElementById('sky-A').addEventListener( 'materialtextureloaded', cthSwapAnimation );
  document.getElementById('sky-B').addEventListener( 'materialtextureloaded', cthSwapAnimation );
    


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
    // if ( document.getElementById( data.target ) ) {
    //   el.addEventListener( 'click', function () {        
    //     cthSwapSky( data.target );
    //   });
    // }
    // else {
    //   this.el.setAttribute( 'model-opacity', "0.2" );
    //   console.warn( 'Didnt find asset', data.target );
    // }
  },
  remove: function () {
    var data = this.data;
    var el = this.el;
    // Check if we have the asset.
    // if ( document.getElementById( 'p' + data.target ) ) {
      el.removeEventListener( 'click', function () {
        cthSwapSky( data.target );
      });
    // }
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
    if ( document.getElementById( 'p' + data.target ) ) {
      el.addEventListener( 'click', function () {
        cthOverlay( data.target, data.pos, data.rot, data.width, data.height );
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
        cthOverlay( data.target, data.pos, data.rot, data.width, data.height );
      });
    }
  }
});



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

    _m.setAttribute( 'src', '#p' + target );
    _m.setAttribute( 'width', width );
    _m.setAttribute( 'height', height );
    _m.setAttribute( 'position', pos );
    _m.setAttribute( 'rotation', rot );
    _m.setAttribute( 'material', 'shader: flat; transparent: true;' );
    
    var _aa = document.createElement( 'a-animation' );
    _aa.setAttribute( 'begin', 'appear' );
    _aa.setAttribute( 'easing', 'ease-out' );
    _aa.setAttribute( 'attribute', 'model-opacity' );
    _aa.setAttribute( 'fill', 'forwards' );
    _aa.setAttribute( 'from', 0 );
    _aa.setAttribute( 'to', 1 );
    _aa.setAttribute( 'dur', 350 );
    var _av = document.createElement( 'a-animation' );
    _av.setAttribute( 'begin', 'vanish' );
    _av.setAttribute( 'easing', 'ease-out' );
    _av.setAttribute( 'attribute', 'model-opacity' );
    _av.setAttribute( 'fill', 'forwards' );
    _av.setAttribute( 'from', 1 );
    _av.setAttribute( 'to', 0 );
    _av.setAttribute( 'dur', 350 );
    _m.appendChild( _aa );
    _m.appendChild( _av );
    
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
    nextId=target;
    let choiceScene = data.scene[target];
    var img12 = document.createElement( 'img' );
    img12.setAttribute( 'id', "img" + choiceScene.name );
    img12.setAttribute( 'crossorigin', "anonymous" );
    img12.setAttribute( 'src', choiceScene.srcImg);
    var assestsSource = document.querySelector("a-assets");
    assestsSource.appendChild(img12);

    var outer = document.getElementById( window.skyes.outer );

    // Need to change the image?
    var outerMaterial = Object.assign( {}, outer.getAttribute( 'material' ) );
    outerMaterial.src = '#img' + choiceScene.name;
    outer.setAttribute( 'material', outerMaterial );
    outer.setAttribute( 'src', '#img' + choiceScene.name );
    // memorize the last one.
    window.skyes._id = target;
  }
}

// triggered when new texture is loaded and applyed (from cthSwapSky)
function cthSwapAnimation ( el ) {

  if(typeof nextId == 'undefined') {
    return;
  }

  var elid = el.target.getAttribute( 'id' );
  if ( false === window.skyes.init && 'sky-B' ==  elid ) {
    window.skyes.init = true;
    return;
  }
  var current = document.getElementById( window.skyes.current ); // =Sky-A
  var outer = document.getElementById( window.skyes.outer );  // = SKy-B
  // quello al centro va in fadeout.
  current.emit( 'cth-swap-out' );
  setTimeout( function () {
    // Assicuriamoci che siano entrambi visibili.
    current.setAttribute( 'model-opacity', 1.0 );
    outer.setAttribute( 'model-opacity', 1.0 );


    // take care of markers.
    changeScene(nextId);

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


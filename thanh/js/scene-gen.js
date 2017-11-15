var data;
$.get('js/data.json', function (res) {
    data = res;
    changeScene(0);
});
function createTemplateLink(){
    let scriptLink = new Script("link");
    scriptLink.addProperty("type", "text/html");
    let tempEntity = new TemplateLink("");
    tempEntity.addProperty("class", "link");
    tempEntity.addProperty("material", "shader: flat; src: ${thumb}");
    tempEntity.addProperty("event-set__1", "_event: mousedown; scale: 1 1 1");
    tempEntity.addProperty("event-set__2", "_event: mouseup; scale: 1.2 1.2 1");
    tempEntity.addProperty("event-set__3", "_event: mouseenter; scale: 1.2 1.2 1");
    tempEntity.addProperty("event-set__4", "_event: mouseleave; scale: 1 1 1");
    tempEntity.addProperty("set-image", "on: click; target: #image-360; src: ${src}");
    tempEntity.addProperty("sound", "on: click; src: #click-sound");
    tempEntity.setGeometry("plane", "1", "1");
    scriptLink.addChild(tempEntity);
	return scriptLink;
}
function createSky(id, src_id, radius){ //defaul radius is 10
	let sky360 = new Sky(id);
    sky360.addProperty("radius", radius);
    sky360.addProperty("src", '#' + src_id);
    sky360.addProperty("position", "0 0 0");
    sky360.addProperty("rotation", "0 -108 0");
    sky360.addProperty("model-opacity", "1");
	return sky360;
}

function createCamera(choiceScene){
	let camera = new Entity("");
	if(typeof choiceScene.rotView != 'undefined'){
		camera.addProperty("rotation", choiceScene.rotView.x + ' ' + choiceScene.rotView.y + ' ' + choiceScene.rotView.z);
	}
    camera.addProperty("camera", "");
    camera.addProperty("look-controls", "");
    let cursor = new Cursor("cursor");
    cursor.addProperty("animation__click", "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150");
    cursor.addProperty("animation__fusing", "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
    cursor.addProperty("event-set__1", "_event: mouseenter; color: springgreen");
    cursor.addProperty("event-set__2", "_event: mouseleave; color: black");
    cursor.addProperty("fuse", "true");
    cursor.addProperty("raycaster", "objects: .link");
    camera.addChild(cursor);
	return camera;
}
function getValOfPutScene(){
	return document.getElementById("putScene").innerHTML;
}
function setValOfPutScene(val){
	document.getElementById("putScene").innerHTML = val;
}

function createScene(index) {
    let choiceScene = data.scene[index];
    let assets = new Assets("assets");
    let img1 = new Img("img" + choiceScene.name, "anonymous", choiceScene.srcImg);
    let thumb1 = new Img("", "anonymous", choiceScene.thumb);
    let audio = new Audio("click-sound", "anonymous", choiceScene.audio);
	
    let scriptLink = createTemplateLink();

    let skyA = createSky("sky-A",img1.id, 15);
    let skyB = createSky("sky-B",img1.id, 16);
    skyA.addEventListener( 'materialtextureloaded', cthSwapAnimation );
    skyB.addEventListener( 'materialtextureloaded', cthSwapAnimation );

      // <a-sky id="sky-A" class="sky" position="0 0 0" rotation="0 -108 0" radius="15" model-opacity="1" src="#phome" material="" scale="" visible="" geometry="">
      //   <a-animation begin="cth-swap-out" easing="ease-in" attribute="model-opacity" fill="forwards" from="1" to="0" dur="1500"></a-animation>
      // </a-sky>

	let camera = createCamera(choiceScene);
	
    let hotSpots = new Entity("links");
    hotSpots.addProperty("position", choiceScene.initView.x + ' ' + choiceScene.initView.y + ' ' + choiceScene.initView.z);
    let spots = choiceScene.hotSpot;
    for (let i = 0; i < spots.length; i++) {
        let nextScene = data.scene[spots[i].toScn];
        let thumb = new Img("thumb" + i, "anonymous", nextScene.thumb);
        let imgScene = new Img("img" + i, "anonymous", nextScene.srcImg);
        let linkSpot = new Entity("");
		linkSpot.addProperty("layout", "type: line; margin: 1.5");
        linkSpot.addProperty("template", "src: #link");
        linkSpot.addProperty("data-src", spots[i].toScn);
        linkSpot.addProperty("data-thumb", "#" + thumb.id);
		if (typeof spots[i].pos != 'undefined'){
			linkSpot.addProperty("position", spots[i].pos.x+ ' ' + spots[i].pos.y + ' ' + spots[i].pos.z);
		}
		if (typeof spots[i].rot != 'undefined'){
			linkSpot.addProperty("rotation", spots[i].rot.x+ ' ' + spots[i].rot.y + ' ' + spots[i].rot.z);
		}
        assets.addChild(thumb);
        assets.addChild(imgScene);
        hotSpots.addChild(linkSpot);
    }
	
	// Add childs;
    assets.addChild(img1);
    assets.addChild(thumb1);
    assets.addChild(audio);
    assets.addChild(scriptLink);
	let oldScene = getValOfPutScene();
	/* if (oldScene == ''){ */
		let scene = new Scene(choiceScene.name);
		scene.addChild(assets);
		scene.addChild(skyA);
		scene.addChild(hotSpots);
		scene.addChild(camera);
		setValOfPutScene(scene.write());
	/* } else {
		let newScene = assets.write() + sky360.write() + hotSpots.write() + camera.write();
		let indexStr1 = oldScene.indexOf('a-assets');
		let indexStr2 = oldScene.indexOf('canvas');
		let str1 = oldScene.substring(0,indexStr1-1);
		let str2 = oldScene.substring(indexStr2-1,oldScene.length);
		setValOfPutScene(str1 + newScene + str2);
	} */
}



function changeScene(index) {
    let choiceScene = data.scene[index];
    let assets = new Assets("assets");
    let img1 = new Img("img" + choiceScene.name, "anonymous", choiceScene.srcImg);
    let thumb1 = new Img("", "anonymous", choiceScene.thumb);
    let audio = new Audio("click-sound", "anonymous", choiceScene.audio);
    let scriptLink = createTemplateLink();

    var skyA = document.getElementById("sky-A");
    var skyB = document.getElementById("sky-B");
    skyA.addEventListener( 'materialtextureloaded', cthSwapAnimation );
    skyB.addEventListener( 'materialtextureloaded', cthSwapAnimation );

      // <a-sky id="sky-A" class="sky" position="0 0 0" rotation="0 -108 0" radius="15" model-opacity="1" src="#phome" material="" scale="" visible="" geometry="">
      //   <a-animation begin="cth-swap-out" easing="ease-in" attribute="model-opacity" fill="forwards" from="1" to="0" dur="1500"></a-animation>
      // </a-sky>

    var camera = document.getElementById("mycamera")
    if(typeof choiceScene.rotView != 'undefined'){
        camera.setAttribute( 'rotation', choiceScene.rotView.x + ' ' + choiceScene.rotView.y + ' ' + choiceScene.rotView.z);
    }
    
    let hotSpots = new Entity("links");
    hotSpots.addProperty("position", choiceScene.initView.x + ' ' + choiceScene.initView.y + ' ' + choiceScene.initView.z);
    let spots = choiceScene.hotSpot;
    for (let i = 0; i < spots.length; i++) {
        let nextScene = data.scene[spots[i].toScn];
        let thumb = new Img("thumb" + i, "anonymous", nextScene.thumb);
        let imgScene = new Img("img" + i, "anonymous", nextScene.srcImg);
        let linkSpot = new Entity("");
        linkSpot.addProperty("layout", "type: line; margin: 1.5");
        linkSpot.addProperty("cth-swap", 'target: ' + spots[i].toScn + ';');
        linkSpot.addProperty("data-thumb", "#" + thumb.id);
        if (typeof spots[i].pos != 'undefined'){
            linkSpot.addProperty("position", spots[i].pos.x+ ' ' + spots[i].pos.y + ' ' + spots[i].pos.z);
        }
        if (typeof spots[i].rot != 'undefined'){
            linkSpot.addProperty("rotation", spots[i].rot.x+ ' ' + spots[i].rot.y + ' ' + spots[i].rot.z);
        }
        assets.addChild(thumb);
        assets.addChild(imgScene);
        hotSpots.addChild(linkSpot);
    }
    
    var assestsSource = document.querySelector("a-assets");
    assestsSource.innerHTML = img1.write() +  thumb1.write() + audio.write() + scriptLink.write();

    var hotSpotsGroup = document.getElementById("hotSpotsGroup");
    hotSpotsGroup.innerHTML = hotSpots.write();

}
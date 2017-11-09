var data;
$.get('js/data.json', function (res) {
    data = res;
});
// var data = {
//   "scene": [
//     {
//       "id": "0",
//       "name": "Home",
//       "thumb": "img/icon/info.png",
//       "srcImg": "img/photo/0.jpg",
//       "audio": "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
//       "initView": {
//         "x": "0",
//         "y": "-1",
//         "z": "-4"
//       },
//       "roboSpot": {
//         "pos": {
//           "x": "",
//           "y": "",
//           "z": ""
//         }
//       },
//       "hotSpot": [
//         {
//           "id": "0",
//           "toScn": "1",
//           "pos": {
//             "x": "5.580",
//             "y": "0.429",
//             "z": "-0.543"
//           },
// 		  "rot": {
//             "x": "1.031",
//             "y": "-9.454",
//             "z": "1.261"
//           },
//           "nxtView": {
//             "x": "",
//             "y": "",
//             "z": ""
//           }
//         }
//       ],
//       "infoPot": [
//         {
//           "id": "0",
//           "audio": "mp3.ogg",
//           "pos": {
//             "x": "",
//             "y": "",
//             "z": ""
//           },
//           "text": "",
//           "img": "",
//           "video": ""
//         }
//       ]
//     },
//     {
//       "id": "1",
//       "name": "Scene 1",
//       "thumb": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg",
//       "srcImg": "img/photo/0_0.jpg",
//       "initView": {
//         "x": "0",
//         "y": "-1",
//         "z": "-4"
//       },
//       "roboSpot": {
//         "pos": {
//           "x": "",
//           "y": "",
//           "z": ""
//         }
//       },
//       "hotSpot": [
//         {
//           "id": "0",
//           "toScn": "0",
//           "audio": "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
//           "pos": {
//             "x": "-9.072",
//             "y": "-1.677",
//             "z": "6.381"
//           },
// 		  "rot": {
//             "x": "0.917",
//             "y": "110.180",
//             "z": "0.917"
//           },
//           "nxtView": {
//             "x": "",
//             "y": "",
//             "z": ""
//           }
//         },
//         {
//           "id": "1",
//           "toScn": "2",
//           "audio": "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
//           "pos": {
//             "x": "-9.192",
//             "y": "2.937",
//             "z": "2.348"
//           },
//           "rot": {
//             "x": "3.151",
//             "y": "83.022",
//             "z": "-0.917"
//           },
//           "nxtView": {
//             "x": "",
//             "y": "",
//             "z": ""
//           }
//         }
//       ],
//       "infoPot": [
//         {
//           "id": "0",
//           "audio": "mp3.ogg",
//           "pos": {
//             "x": "",
//             "y": "",
//             "z": ""
//           },
//           "text": "",
//           "img": "",
//           "video": ""
//         }
//       ]
//     },
//     {
//       "id": "2",
//       "name": "Scene 2",
//       "thumb": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg",
//       "srcImg": "img/photo/1.jpg",
//       "initView": {
//         "x": "0",
//         "y": "-1",
//         "z": "-4"
//       },
//       "roboSpot": {
//         "pos": {
//           "x": "",
//           "y": "",
//           "z": ""
//         }
//       },
//       "hotSpot": [
//         {
//           "id": "0",
//           "toScn": "1",
//           "audio": "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
//           "pos": {
//             "x": "-6.810",
//             "y": "1.488",
//             "z": "3.980"
//           },
// 		  "rot": {
//             "x": "-1.604",
//             "y": "87.777",
//             "z": "2.005"
//           },
//           "nxtView": {
//             "x": "",
//             "y": "",
//             "z": ""
//           }
//         },
//         {
//           "id": "1",
//           "toScn": "0",
//           "audio": "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
//           "pos": {
//             "x": "3.613",
//             "y": "1.199",
//             "z": "-4.163"
//           },
// 		  "rot": {
//             "x": "-4.240",
//             "y": "-11.058",
//             "z": "-1.089"
//           },
//           "nxtView": {
//             "x": "",
//             "y": "",
//             "z": ""
//           }
//         }
//       ],
//       "infoPot": [
//         {
//           "id": "0",
//           "audio": "mp3.ogg",
//           "pos": {
//             "x": "",
//             "y": "",
//             "z": ""
//           },
//           "text": "",
//           "img": "",
//           "video": ""
//         }
//       ]
//     }
//   ]
// };
/////////////////////////////////////////code/////////////////////////////////////////////////////////
$("#putScene").ready(function () {
    createScene(0);
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
function createSky(id){
	let sky360 = new Sky("image-360");
    sky360.addProperty("radius", "10");
    sky360.addProperty("src", '#' + id);
	return sky360;
}
function createCamera(){
	let camera = new Entity("");
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

    let sky360 = createSky(img1.id);
	
	let camera = createCamera();
	
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
	let scene = new Scene(choiceScene.name);
	scene.addChild(assets);
	scene.addChild(sky360);
	scene.addChild(hotSpots);
	scene.addChild(camera);
	setValOfPutScene(scene.write());
}



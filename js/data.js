let data = {
    scene: [{
        id: "0",
        name: "Home",
        thumb: "img/icon/info.png",
        srcImg: "img/photo/0.jpg",
        audio: "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
        initView: {
            x: "0",
            y: "-1",
            z: "-4"
        },
        roboSpot: {
            pos: {
                x: "",
                y: "",
                z: ""
            }
        },
        hotSpot: [{
            id: "0",
            toScn: "1",
            pos: {
                x: "",
                y: "",
                z: ""
            },
            nxtView: {
                x: "",
                y: "",
                z: ""
            }
        }],
        infoPot: [{
            id: "0",
            audio: "mp3.ogg",
            pos: {
                x: "",
                y: "",
                z: ""
            },
            text: "",
            img: "",
            video: ""
        }]
    },
        {
            id: "1",
            name: "Scene 1",
            thumb: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg",
            srcImg: "img/photo/0_0.jpg",
            initView: {
                x: "0",
                y: "-1",
                z: "-4"
            },
            roboSpot: {
                pos: {
                    x: "",
                    y: "",
                    z: ""
                }
            },
            hotSpot: [
                {
                    id: "0",
                    toScn: "0",
                    audio: "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
                    pos: {
                        x: "",
                        y: "",
                        z: ""
                    },
                    nxtView: {
                        x: "",
                        y: "",
                        z: ""
                    }
                },
                {
                    id: "1",
                    toScn: "2",
                    audio: "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
                    pos: {
                        x: "",
                        y: "",
                        z: ""
                    },
                    nxtView: {
                        x: "",
                        y: "",
                        z: ""
                    }
                }
            ],
            infoPot: [{
                id: "0",
                audio: "mp3.ogg",
                pos: {
                    x: "",
                    y: "",
                    z: ""
                },
                text: "",
                img: "",
                video: ""
            }]
        },
        {
            id: "2",
            name: "Scene 2",
            thumb: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg",
            srcImg: "img/photo/1.jpg",
            initView: {
                x: "0",
                y: "-1",
                z: "-4"
            },
            roboSpot: {
                pos: {
                    x: "",
                    y: "",
                    z: ""
                }
            },
            hotSpot: [
                {
                    id: "0",
                    toScn: "1",
                    audio: "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
                    pos: {
                        x: "",
                        y: "",
                        z: ""
                    },
                    nxtView: {
                        x: "",
                        y: "",
                        z: ""
                    }
                },
                {
                    id: "1",
                    toScn: "0",
                    audio: "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg",
                    pos: {
                        x: "",
                        y: "",
                        z: ""
                    },
                    nxtView: {
                        x: "",
                        y: "",
                        z: ""
                    }
                }
            ],
            infoPot: [{
                id: "0",
                audio: "mp3.ogg",
                pos: {
                    x: "",
                    y: "",
                    z: ""
                },
                text: "",
                img: "",
                video: ""
            }]
        }
    ]
};
/////////////////////////////////////////code/////////////////////////////////////////////////////////
$("#putScene").ready(function () {
    createScene(0);
});

function createScene(index) {
    let choiceScene = data.scene[index];

    let scene = new Scene(choiceScene.name);

    let assets = new Assets("assets");
    let img1 = new Img("img" + choiceScene.name, "anonymous", choiceScene.srcImg);
    let thumb1 = new Img("", "anonymous", choiceScene.thumb);
    let audio = new Audio("click-sound", "anonymous", choiceScene.audio);
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

    let sky360 = new Sky("image-360");
    sky360.addProperty("radius", "10");
    sky360.addProperty("src", '#' + img1.id);
    let hotSpots = new Entity("links");
    hotSpots.addProperty("layout", "type: line; margin: 1.5");
    hotSpots.addProperty("position", choiceScene.initView.x + ' ' + choiceScene.initView.y + ' ' + choiceScene.initView.z);
    let spots = choiceScene.hotSpot;
    for (let i = 0; i < spots.length; i++) {
        let nextScene = data.scene[spots[i].toScn];
        let thumb = new Img("thumb" + i, "anonymous", nextScene.thumb);
        let imgScene = new Img("img" + i, "anonymous", nextScene.srcImg);
        let linkSpot = new Entity("");
        linkSpot.addProperty("template", "src: #link");
        linkSpot.addProperty("data-src", spots[i].toScn);
        linkSpot.addProperty("data-thumb", "#" + thumb.id);
 
        assets.addChild(thumb);
        assets.addChild(imgScene);
        hotSpots.addChild(linkSpot);
    }
    
    let linkOther = new Entity("links2");
    linkOther.addProperty("class","link1");
    linkOther.addProperty("position","-1.299 -0.814 -3.671");
    linkOther.addProperty("set-image","on: click; target: #image-360; src: #place");
    
    let img32 = new AImage("tesjl");
    img32.addProperty("src","#bluecute");
    let imgSrc123 = new Img("bluecute");
    imgSrc123.addProperty("src","/img/icon/info.png");
    linkOther.addChild(img32);
    
    let camera = new Entity("");
    camera.addProperty("camera", "");
    camera.addProperty("look-controls", "");
    let cursor = new Cursor("cursor");
    cursor.addProperty("animation__click", "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150");
    cursor.addProperty("animation__fusing", "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
    cursor.addProperty("event-set__1", "_event: mouseenter; color: springgreen");
    cursor.addProperty("event-set__2", "_event: mouseleave; color: black");
    cursor.addProperty("fuse", "true");
    cursor.addProperty("raycaster", "objects: .link;.link1");

    camera.addChild(cursor);
    assets.addChild(img1);
    assets.addChild(thumb1);
    assets.addChild(audio);
    assets.addChild(scriptLink);
    scene.addChild(assets);
    scene.addChild(sky360);
    scene.addChild(hotSpots);
    scene.addChild(linkOther);
    scene.addChild(camera);

    document.getElementsByTagName("title").innerHTML = scene.id;
    document.getElementById("putScene").innerHTML = scene.write();
}



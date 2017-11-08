class Entity {
    constructor(id) {
        this._id = id;
        this._type = "a-entity";
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get type() {
        return this._type;
    }

    addChild(child) {
        if (typeof this._childs === 'undefined') {
            this._childs = [];
        }
        this._childs.push(child);
    }

    get childs() {
        return this._childs;
    }

    addProperty(name, value) {
        if (typeof this._properties === 'undefined') {
            this._properties = new Map();
        }
        this._properties.set(name, value);
    }

    getProperty(name) {
        if (typeof this._properties === 'undefined') {
            return '';
        }
        return this._properties.get(name);
    }

    printProperties() {
        let props = this.specialProperties();
        if (typeof this._properties !== 'undefined') {
            for (let [key, value] of this._properties) {
                props += key + '="' + value + '"';
            }
        }
        return props;
    }

    specialProperties() {
        return ' id="' + this._id + '" ';
    }

    write() {
        let tag = '<' + this._type + this.printProperties() + ' >';
        if (typeof this._childs !== 'undefined') {
            let datas = this._childs;
            for (let i = 0; i < datas.length; i++) {
                tag += datas[i].write();
            }
        }
        return tag + '</' + this._type + '>';
    }
}

class Scene extends Entity {
    constructor(id) {
        super(id);
        this._type = "a-scene";
    }
}

class Assets extends Entity {
    constructor(id) {
        super(id);
        this._type = "a-assets";
    }
}

class Img extends Entity {
    constructor(id, crossorigin, src) {
        super(id);
        this._crossorigin = crossorigin;
        this._src = src;
        this._type = "img";
    }

    specialProperties() {
        return super.specialProperties()
            + 'src="' + this._src
            + '" crossorigin="' + this._crossorigin
            + '" ';
    }
}

class Audio extends Img {
    constructor(id, crossorigin, src) {
        super(id, crossorigin, src);
        this._type = "audio";
    }
}

class Sky extends Entity {
    constructor(id) {
        super(id);
        this._type = "a-sky";
    }
}

class Cursor extends Entity {
    constructor(id) {
        super(id);
        this._type = "a-cursor";
    }
}

class Script extends Entity {
    constructor(id) {
        super(id);
        this._type = "script";
    }
}

class AImage extends Entity {
    constructor(id) {
        super(id);
        this._type = "a-image";
    }
}

class TemplateLink extends Entity {
    constructor(id) {
        super(id);
    }

    setGeometry(primitive, height, width) {
        this._primitive = primitive;
        this._height = height;
        this._width = width;
    }

    specialProperties() {
        return ' geometry="primitive:' + this._primitive
            + '; height:' + this._height
            + '; width:' + this._width
            + '" ';
    }
}
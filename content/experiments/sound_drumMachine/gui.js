let HORIZONTAL = 0;
let VERTICAL = 1;
let UPWARDS = 2;
let DOWNWARDS = 3;

class Widget {
    constructor(t, x, y, w, h) {
        this.pos = createVector(x, y);
        this.extents = createVector(w, h);
        this.name = t;
        this.inactiveColor = color(60, 60, 100);
        this.activeColor = color(100, 100, 160);
        this.bgColor = this.inactiveColor;
        this.lineColor = color(255);
    }

    setInactiveColor(c) {
        this.inactiveColor = c;
        this.bgColor = this.inactiveColor;
    }

    isClicked() {
        return (mouseX > this.pos.x && mouseX < this.pos.x + this.extents.x
            && mouseY > this.pos.y && mouseY < this.pos.y + this.extents.y)
    }

    mousePressed() {
        return this.isClicked();
    }

    mouseDragged() {
        return this.isClicked();
    }

    mouseReleased() {
        return isClicked();
    }
}

class Button extends Widget {
    constructor(nm, x, y, w, h) {
        super(nm, x, y, w, h)

        this.activeImage = null;
        this.inactiveImage = null;
        this.currentImage = null;
        this.imageTint = color(255);
    }
    setImage(img) {
        this.inactiveImage = img;
        this.activeImage = img;
    }

    setInactiveImage(img) {
        if (this.currentImage == this.inactiveImage || this.currentImage == null) {
            this.inactiveImage = img;
            this.currentImage = this.inactiveImage;
        }
        else {
            this.inactiveImage = img;
        }
    }

    set activeImage(img) {
        if (this.currentImage == this.activeImage || this.currentImage == null) {
            this.activeImage = img;
            this.currentImage = this.activeImage;
        }
        else {
            this.activeImage = img;
        }
    }

    display() {
        if (this.currentImage != null) {
            //let imgHeight = (extents.x*currentImage.height)/currentImage.width;
            let imgWidth = (this.extents.y * this.currentImage.width) / this.currentImage.height;

            push();
            imageMode(CORNER);
            tint(this.imageTint);
            image(this.currentImage, this.pos.x, this.pos.y, imgWidth, this.extents.y);
            stroke(this.bgColor);
            noFill();
            rect(this.pos.x, this.pos.y, imgWidth, this.extents.y);
            noTint();
            pop();
        }
        else {
            push();
            stroke(this.lineColor);
            fill(this.bgColor);
            rect(this.pos.x, this.pos.y, this.extents.x, this.extents.y);

            fill(this.lineColor);
            textAlign(CENTER, CENTER);
            text(this.name, this.pos.x + 0.5 * this.extents.x, this.pos.y + 0.5 * this.extents.y);
            pop();
        }
    }

    mousePressed() {
        if (super.mousePressed()) {
            this.bgColor = this.activeColor;
            if (this.activeImage != null)
                this.currentImage = this.activeImage;
            return true;
        }
        return false;
    }

    mouseReleased() {
        if (super.mouseReleased()) {
            this.bgColor = this.inactiveColor;
            if (this.inactiveImage != null)
                this.currentImage = this.inactiveImage;
            return true;
        }
        return false;
    }
}

class Toggle extends Button {
    constructor(nm, x, y, w, h) {
        super(nm, x, y, w, h)
        this.on = false
    }

    get() { return this.on }
    set(val) {
        this.on = val
        if (val) {
            this.bgColor = this.activeColor
            if (this.activeImage != null) {
                this.currentImage = this.activeImage
            }
        }
        else {
            this.bgColor = this.inactiveColor
            if (this.inactiveImage != null) {
                this.currentImage = this.inactiveImage
            }
        }
    }

    toggle() { this.set(!this.on) }

    mousePressed() {
        return super.isClicked()
    }

    mouseReleased() {
        if (super.mouseReleased()) {
            this.toggle();
            return true;
        }
        return false;
    }
}

class RadioButtons extends Widget {
    constructor(numButtons, x, y, w, h, orientation) {
        super("", x, y, w * numButtons, h)

        this.buttons = Array(numButtons)

        for (let i = 0; i < numButtons; i++) {
            let bx, by;
            if (orientation == HORIZONTAL) {
                bx = x + i * (w + 5);
                by = y;
            }
            else {
                bx = x;
                by = y + i * (h + 5);
            }
            this.buttons[i] = new Toggle("", bx, by, w, h);
        }
    }

    setNames(names) {
        for (let i = 0; i < this.buttons.length; i++) {
            if (i >= names.length)
                break;
            this.buttons[i].setName(names[i]);
        }
    }

    setImage(i, img) {
        this.setInactiveImage(i, img);
        this.setActiveImage(i, img);
    }

    setAllImages(img) {
        this.setAllInactiveImages(img);
        this.setAllActiveImages(img);
    }

    setInactiveImage(i, img) {
        this.buttons[i].setInactiveImage(img);
    }

    setAllInactiveImages(img) {
        this.buttons.forEach(b => b.setInactiveImage(img))
    }

    setActiveImage(i, img) {
        this.buttons[i].setActiveImage(img)
    }

    setAllActiveImages(img) {
        this.buttons.forEach(b => b.setActiveImage(img))
    }

    set(buttonName) {
        this.buttons.forEach(b => b.set(b.name === buttonName))
    }

    get() {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].get()) {
                return i;
            }
        }
        return -1;
    }

    getString() {
        for (button of this.buttons) {
            if (button.get()) {
                return button.name;
            }
        }
        return "";
    }

    display() {
        this.buttons.forEach(b => b.display())
    }

    mousePressed() {
        for (button of this.buttons) {
            if (button.mousePressed()) {
                return true;
            }
        }
        return false;
    }

    mouseDragged() {
        for (button of this.buttons) {
            if (button.mouseDragged()) {
                return true;
            }
        }
        return false;
    }

    mouseReleased() {
        for (button of this.buttons) {
            if (button.mouseReleased()) {
                for (otherButtons of this.buttons) {
                    if (button != otherButtons)
                        otherButtons.set(false)
                }
                //buttons[i].set(true);
                return true;
            }
        }
        return false;
    }
}

class Slider extends Widget {
    constructor(nm, v, min, max, x, y, w, h, ori) {
        super(nm, x, y, w, h)
        this.val = v
        this.minimum = min;
        this.maximum = max;
        this.orientation = ori
        if (this.orientation === HORIZONTAL) {
            this.textWidth = 60
        }
        else {
            this.textWidth = 20
        }
    }

    get() {
        return this.val;
    }

    set(v) {
        this.val = v;
        this.val = constrain(this.val, this.minimum, this.maximum);
    }

    display() {
        let textW = this.textWidth;
        if (this.name == "")
            textW = 0;
        push();
        textAlign(LEFT, TOP);
        fill(this.lineColor);
        text(this.name, this.pos.x, this.pos.y);
        stroke(this.lineColor);
        noFill();
        if (this.orientation == HORIZONTAL) {
            rect(this.pos.x + textW, this.pos.y, this.extents.x - this.textWidth, this.extents.y);
        } else {
            rect(this.pos.x, this.pos.y + textW, this.extents.x, this.extents.y - textW);
        }
        noStroke();
        fill(this.bgColor);
        let sliderPos;
        if (this.orientation == HORIZONTAL) {
            sliderPos = map(this.val, this.minimum, this.maximum, 0, this.extents.x - textW - 4);
            rect(this.pos.x + textW + 2, this.pos.y + 2, this.sliderPos, this.extents.y - 4);
        } else if (this.orientation == VERTICAL || this.orientation == DOWNWARDS) {
            sliderPos = map(this.val, this.minimum, this.maximum, 0, this.extents.y - textW - 4);
            rect(this.pos.x + 2, this.pos.y + textW + 2, this.extents.x - 4, sliderPos);
        } else if (this.orientation == UPWARDS) {
            sliderPos = map(this.val, this.minimum, this.maximum, 0, this.extents.y - textW - 4);
            rect(this.pos.x + 2, this.pos.y + textW + 2 + (this.extents.y - textW - 4 - sliderPos), this.extents.x - 4, sliderPos);
        };
        pop();
    }

    mouseDragged() {
        if (super.mouseDragged()) {
            let textW = this.textWidth;
            if (this.name == "")
                textW = 0;
            if (this.orientation == HORIZONTAL) {
                set(map(mouseX, this.pos.x + textW, this.pos.x + this.extents.x - 4, this.minimum, this.maximum));
            } else if (this.orientation == VERTICAL || this.orientation == DOWNWARDS) {
                set(map(mouseY, this.pos.y + textW, this.pos.y + this.extents.y - 4, this.minimum, this.maximum));
            } else if (this.orientation == UPWARDS) {
                set(map(mouseY, this.pos.y + textW, this.pos.y + this.extents.y - 4, this.maximum, this.minimum));
            };
            return true;
        }
        return false;
    }

    mouseReleased() {
        if (super.mouseReleased()) {
            let textW = this.textWidth;
            if (this.name == "")
                textW = 0;
            if (this.orientation == HORIZONTAL) {
                set(map(mouseX, this.pos.x + textW, this.pos.x + this.extents.x - 10, this.minimum, this.maximum));
            } else if (this.orientation == VERTICAL || this.orientation == DOWNWARDS) {
                set(map(mouseY, this.pos.y + textW, this.pos.y + this.extents.y - 10, this.minimum, this.maximum));
            } else if (this.orientation == UPWARDS) {
                set(map(mouseY, this.pos.y + textW, this.pos.y + this.extents.y - 10, this.maximum, this.minimum));
            };
            return true;
        }
        return false;
    }
}

class MultiSlider extends Widget {
    constructor(numSliders, min, max, x, y, w, h, orientation) {
        super("", x, y, w, h * numSliders);
        this.sliders = [];
        for (let i = 0; i < numSliders; i++) {
            let bx, by;
            if (orientation == HORIZONTAL) {
                bx = x;
                by = y + i * h;
            }
            else {
                bx = x + i * w;
                by = y;
            }
            this.sliders[i] = new Slider("", 0, min, max, bx, by, w, h, orientation);
        }
    }

    setNames(names) {
        for (let i = 0; i < this.sliders.length; i++) {
            if (i >= names.length)
                break;
            this.sliders[i].name = names[i];
        }
    }

    set(i, v) {
        if (i >= 0 && i < this.sliders.length) {
            this.sliders[i].set(v);
        }
    }

    get(i) {
        if (i >= 0 && i < this.sliders.length) {
            return this.sliders[i].get();
        }
        return -1;
    }

    display() {
        this.sliders.forEach(s => s.display())
    }

    mouseDragged() {
        for (let slider of this.sliders) {
            if (slider.mouseDragged()) {
                return true;
            }
        }
        return false;
    }

    mouseReleased() {
        for (let slider of this.sliders) {
            if (slider.mouseReleased()) {
                return true;
            }
        }
        return false;
    }
}

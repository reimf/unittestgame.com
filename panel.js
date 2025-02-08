"use strict";
class Panel extends Section {
    constructor(header, children) {
        super([new Header(header), ...children]);
    }
    show(id) {
        this.id(id);
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo('panels');
    }
}

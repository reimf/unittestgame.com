"use strict";
class Panel extends Section {
    constructor(header, children) {
        super([new Header(header), ...children]);
    }
    replaceExistingOrAddTo(parentId) {
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo(parentId);
    }
    show(id) {
        this.id(id);
        this.replaceExistingOrAddTo('panels');
    }
}

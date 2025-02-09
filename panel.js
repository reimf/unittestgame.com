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
    static remove(id) {
        var _a;
        (_a = document.querySelector('#' + id)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}

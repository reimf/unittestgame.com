"use strict";
class Section extends Html {
    constructor(children) {
        super('section');
        this.appendChildren(children);
    }
    show(id) {
        this.id(id).addTo('panels');
    }
    addAsComputer() {
        this.id(`message-${++Section.messageCount}`).addClass('computer').addTo('messages');
    }
    addAsHuman() {
        this.id(`message-${++Section.messageCount}`).addClass('human').addTo('messages');
    }
    replaceLastHuman() {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages');
    }
}
Section.messageCount = 0;

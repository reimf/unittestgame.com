"use strict";
class Section extends Html {
    constructor(children) {
        super('section');
        this.appendChildren(children);
    }
    showPanel(id) {
        this.id(id).addTo('panels');
    }
    addComputerMessage() {
        this.id(`message-${++Section.messageCount}`).addClass('computer').addTo('messages');
    }
    addHumanMessage() {
        this.id(`message-${++Section.messageCount}`).addClass('human').addTo('messages');
    }
    replaceHumanMessage() {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages');
    }
}
Section.messageCount = 0;

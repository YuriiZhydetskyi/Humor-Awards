class Award{
    constructor(awardObj){
        this.nameUk = awardObj.nameUk;
        this.imgPath = awardObj.imgPath;
        this.imgAlt = awardObj.imgAlt;
        this.neededLength = awardObj.neededLength;
    }

    getElement(completed){

        let container = document.createElement("div");
        container.classList.add("award-container");

        let element = document.createElement("img");
        element.classList.add("award-img");
        element.alt = this.imgAlt;
        element.src = this.imgPath;
        if(completed){
            element.classList.add("completed-award");
        }

        let tooltip = document.createElement("div");
        tooltip.classList.add("award-tooltip");
        let awardName = document.createElement("b");
        awardName.appendChild(document.createTextNode(this.nameUk));
        tooltip.appendChild(awardName);

        let awardConditions = document.createElement("p");
        awardConditions.appendChild(document.createTextNode("Необхідна серія: " + this.neededLength));
        tooltip.appendChild(awardConditions);

        container.appendChild(element);
        container.appendChild(tooltip);

        return container;
    }
}
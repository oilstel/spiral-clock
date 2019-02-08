
module.exports = {
    // Set up spiral canvas and resize for screen dpi
    canvas_obj: function(ele) {
        let returnable = {
        canvas: ele,
        ctx: ele.getContext("2d"),
        dpi: window.devicePixelRatio
        };
        returnable.get = {
        style: {
            height() {
            return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
            },
            width() {
            return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
            }
        },
        attr: {
            height() {
            return returnable.ele.getAttribute("height");
            },
            width() {
            return returnable.ele.getAttribute("height");
            }
        }
        };
        
        returnable.set = {
        style: {
            height(ht) {
            ele.style.height = ht + "px";
            },
            width(wth) {
            ele.style.width = wth + "px";
            }
        },
        attr: {
            height(ht) {
            ele.setAttribute("height", ht);
            },
            width(wth) {
            ele.setAttribute("width", wth);
            }
        }
        };
        return returnable;
    }
}
const dizzyFunctions = (() => {
return () => {
    const randomNum = (max, min = 0) => Math.floor( Math.random() * (max - min) + min);

    const serfingElemntHorizontal = () => randomNum(11) >= 5 ? "+" + randomNum(150, 40) + "px" : "-" + randomNum(80, 0) + "px";

    const serfingElemntVertical = () => randomNum(11) >= 5 ? "+" + randomNum(50, 0) + "px" : "-" + randomNum(50, 0) + "px";

    const serfingElemnt = (event, element) => {
        if (randomNum(11) >= 2) {
            element.style.left = serfingElemntHorizontal();
            element.style.top = serfingElemntVertical();
        }
    }

    const addExtraStylesForAnchor = (element) => {
        element.style.transition = "all 0.25s ease 0s";
        element.style.left = 0;
        element.style.top = 0;
        element.style.position = "relative";
    }

    // IMG SCRIPTS

        
    const changePeriud = 9000;
    const isBlurred = "is-blurred";
    const isScaled = "is-scaled";


    const addExtraStylesForImgs = (element) => {
        element.style.transition = "all 2s ease 0s";
    }

    const InitImgsStyles = () => {
        document.querySelectorAll("img").forEach(img => {
            addExtraStylesForImgs(img);
        })

        window.setTimeout(updateImgsStyles, changePeriud)
    }

    const updateImgsStyles = () => {
        document.querySelectorAll("img").forEach(img => {
            const hasBlur = img.getAttribute("class").split(" ").includes(isBlurred);
            const hasScale = img.getAttribute("class").split(" ").includes(isScaled);

            if (hasScale && !hasBlur) addBlurToImg(img)
            if (hasBlur  && !hasScale) addScaleToImg(img)
            if (!hasScale && !hasBlur) addBlurToImg(img)
        })

        window.setTimeout(updateImgsStyles, 8000)
    }

    const addScaleToImg = (img) => {
        img.style.filter = `invert(${randomNum(30, 1)}%)`; 

        img.setAttribute("class", img.getAttribute("class").split(" ").filter(c => c != isBlurred).join(" ") + " " + isScaled);
    }


    const addBlurToImg = (img) => {
        img.style.filter = `blur(${randomNum(9)}px)`;

        img.setAttribute("class", img.getAttribute("class").split(" ").filter(c => c != isScaled).join(" ") + " " + isBlurred);
    }


    // BODY

    const InitBodyStyles = () => {
        addExtraStylesForBody();
        const updateBodyStyles = HOCUpdateBodyStyles();
        window.setInterval(updateBodyStyles, changePeriud);
    }

    const addExtraStylesForBody = () => {
        document.body.style.transition = "all 0.5s ease 0s";
    }

    const HOCUpdateBodyStyles = () => {
        let s = true;

        return () => {
            const rnum = randomNum(5) / 10;
            document.body.style.transform = s ? `rotate(+${rnum}deg)` : `rotate(-${rnum}deg)`;
            document.body.style.opacity = randomNum(99, 80) / 100;
            s = !s; 
        }
    }


    // P 

    const InitPStyles = () => {
        addExtraStylesForP();
        window.setInterval(updatePStyles, changePeriud);
    }

    const addExtraStylesForP = () => {
        document.body.style.transition = "all 0.5s ease 0s";
    }

    const setRandomStylesForP = (p) => p.style.fontSize = `${randomNum(18, 14)}px`

    const updatePStyles = () => {
        document.querySelectorAll("p").forEach(p => {
            setRandomStylesForP(p);
        })
    }

    const subscribeAllOnDizzyActions = () => {
        document.querySelectorAll("a").forEach(anchor => {
            anchor.addEventListener("mouseover", (event) => {
                addExtraStylesForAnchor(anchor)
                serfingElemnt(event, anchor)
            })
        })

        window.setTimeout(() => {
            InitImgsStyles();
            InitBodyStyles();
            InitPStyles();
        }, 1000)
    }
    subscribeAllOnDizzyActions()
}

})()

window.addEventListener("load", () => {
    dizzyFunctions();
})
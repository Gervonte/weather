class cssControlObject
{
    constructor(main)
    {
        this.mainObject = main;
        this.footerText = this.mainObject.footerText;
        this.headerText = this.mainObject.headerText;
        this.updateText = this.mainObject.updateText;
        this.weatherDiv = this.mainObject.weatherDiv;
        this.bgImage = this.mainObject.bgImage;
        this.infoBox = document.getElementById("infoBox");
        

        this.footerStyle =
        {
            animName:"textGlow",
            animDuration:"1.5s",
            animCount:"3",
            animDelay:"1.5s",
            color:"rgba(255,255,255.9)"
        };
        this.headerStyle =
        {
            animName:"fadeIn",
            animDuration:"2.5s",
            animCount:"1",
            animDelay:"0s",
            color:"rgba(255,255,255.9)"
        };
        this.weatherDivStyle = 
        {
            animName:"slide",
            animDuration:"5s",
            animCount:"1",
            animDelay:"0s"
        };
        this.infoBoxClosedStyle=
        {
            animName:"toOpen",
            animDuration:"3s",
            animCount:"1",
            animDelay:"0s",
            height:"40%"
        }
        this.infoBoxOpenStyle=
        {
            animName:"toClose",
            animDuration:"3s",
            animCount:"1",
            animDelay:"0s",
            height:"40%"
        }
        this.applyEventListener();
    }
    //Updates background image and applies required styling
    updateImage(image,params)
    {
        var imageUrl = "url("+image+params+")";
        this.bgImage.style.background = imageUrl;
        this.bgImage.style.backgroundPosition = "center";
        this.bgImage.style.backgroundRepeat = "no-repeat";
        this.bgImage.style.filter = "blur(5px)";
        this.bgImage.style.webkitFilter = "blur(5px)";
    }

    //Triggers all animations
    triggerAll()
    {
        if(this.mainObject.verbose){console.log("Animations Triggered!")}
        var thisInherit = this;
        this.triggerAnimation(thisInherit.headerText,thisInherit.headerStyle);        
        this.triggerAnimation(thisInherit.footerText,thisInherit.footerStyle);
        //this.triggerAnimation(thisInherit.weatherDiv,thisInherit.headerStyle);
    }

    //Triggers animation of given element
    triggerAnimation(element,info)
    {
          element.style.animationName = info.animName 
          element.style.animationDuration = info.animDuration
          element.style.animationIterationCount = info.animCount
          element.style.animationDelay = info.animDelay
    }

    //Makes an element visible
    showElement(element,info)
    {
        element.style.color = info.color;
    }

    //Makes all text elements visible
    showAll()
    {
        if(this.mainObject.verbose){console.log("Elements Shown!")}
        var thisInherit = this;
        this.triggerAll();
        this.showElement(thisInherit.headerText,thisInherit.headerStyle)
        this.showElement(thisInherit.footerText,thisInherit.footerStyle)
        
    }

    //Makes an element invivisble(fully transparent)
    hideElement(element)
    {
        element.style.color = "rgba(255,255,255,0)";
    }

    //Makes all text elements invisible
    hideAll()
    {
        if(this.mainObject.verbose){console.log("Elements Hidden!")}
        var thisInherit = this;
        this.hideElement(thisInherit.headerText)
        this.hideElement(thisInherit.footerText)
    }
    openInfoBox()
    {
        var thisInherit = this;
        thisInherit.infoBox.style.height ="22%"; 
        thisInherit.infoBox.style.transition="height 2s"; 
        this.infoBox.appendChild
    }
    closeInfoBox()
    {
        var thisInherit = this;
        thisInherit.infoBox.style.height ="25px";   
        thisInherit.infoBox.style.transition="height 2s"; 
    }
    applyEventListener()
    {
        var thisInherit = this;
        this.infoBox.addEventListener("mouseenter",function()
        {
            thisInherit.openInfoBox()
        });
        this.infoBox.addEventListener("mouseleave",function()
        {
            thisInherit.closeInfoBox()
        });
    }
}
import { Elastic, Power0, Power1, Power2, Power4, TweenMax } from 'gsap';
import { SlowMo } from 'gsap/EasePack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Snap from 'snapsvg-cjs';
import { useWinSize } from '../../../shared/utility';
import classes from './Weather.module.scss';

// This component is modified from: 
// https://codepen.io/ste-vg/pen/Gqakbo

const Weathers = (props) => {
  let windowSize = useWinSize();

  const containerRef = useRef(null)
  const cardRef = useRef(null)

  const innerSVGRef = useRef(null)
  const innerSVG = Snap(innerSVGRef.current);
  const outerSVGRef = useRef(null)
  const outerSVG = Snap(outerSVGRef.current);
  const backSVGRef = useRef(null)
  const backSVG = Snap(backSVGRef.current);

  const layer1Ref = useRef(null)
  const weatherContainer1 = Snap(layer1Ref.current)
  const layer2Ref = useRef(null)
  const weatherContainer2 = Snap(layer2Ref.current)
  const layer3Ref = useRef(null)
  const weatherContainer3 = Snap(layer3Ref.current)

  const innerRainHolder = {
    1: weatherContainer1.group(),
    2: weatherContainer2.group(),
    3: weatherContainer3.group()
  }
  const innerLeafHolder = weatherContainer1.group()
  const innerSnowHolder = weatherContainer1.group()
  const innerLightningHolder = weatherContainer1.group()

  const leafMask = outerSVG.rect()
  const leafRef = useRef(null)
  const leaf = Snap(leafRef.current)
  const sunRef = useRef(null)
  const sun = Snap(sunRef.current)
  const sunburstRef = useRef(null)
  const sunburst = Snap(sunburstRef.current)

  const outerSplashHolder = outerSVG.group()
  const outerLeafHolder = outerSVG.group()
  const outerSnowHolder = outerSVG.group()

  const cloud1Ref = useRef(null)
  const cloud2Ref = useRef(null)
  const cloud3Ref = useRef(null)
  let lightningTimeout = null

  outerLeafHolder.attr({
    'clip-path': leafMask
  })

  const sizes = {
    container: {width: 0, heigt: 0},
    card: {width: 0, heigt: 0}
  }

  const clouds =[
    {group: Snap(cloud1Ref.current)},
    {group: Snap(cloud2Ref.current)},
    {group: Snap(cloud3Ref.current)}
  ]

  const weather = [
    { type: 'snow', name: 'Snow'}, 
    { type: 'wind', name: 'Windy'}, 
    { type: 'rain', name: 'Rain'}, 
    { type: 'thunder', name: 'Storms'},
    { type: 'sun', name: 'Sunny'}
  ];
  // let currentWeather = null
  const [currentWeather, setWeather] = useState({type: 'snow', name: 'Snow'})

  const settings = {
    windSpeed: 2,
    rainCount: 0,
    leafCount: 0,
    snowCount: 0,
    cloudHeight: 100,
    cloudSpace: 30,
    cloudArch: 50,
    renewCheck: 10,
    splashBounce: 80
  };

  let tickCount = 0;
  const rain = []
  const leafs = []
  const snow = []

  const initWeather = () => {
    onResize()
    for(let i = 0; i < clouds.length; i++)
    {
      clouds[i].offset = Math.random() * sizes.card.width;
      drawCloud(clouds[i], i);
      TweenMax.set(sunburst.node, {opacity: 0})
      changeWeather(currentWeather);
    }
  }

  const onResize = () => {
    sizes.container.width = containerRef.current.offsetWidth;
    sizes.container.height = containerRef.current.offsetHeight;
    sizes.card.width = cardRef.current.offsetWidth;
    sizes.card.height = cardRef.current.offsetHeight;
    sizes.card.offset = {
                          top: cardRef.current.offsetTop,
                          left: cardRef.current.offsetLeft
                        };

    innerSVG.attr({
      width: sizes.card.width,
      height: sizes.card.height
    })
    outerSVG.attr({
      width: sizes.container.width,
      height: sizes.container.height
    })	
    backSVG.attr({
      width: sizes.container.width,
      height: sizes.container.height
    })

    TweenMax.set(sunburst.node, 
      {
        transformOrigin:"50% 50%", 
        x: sizes.container.width / 2, 
        y: (sizes.card.height/2) + sizes.card.offset.top
      })
    TweenMax.fromTo(sunburst.node, 20, 
      {rotation: 0}, 
      {rotation: 360, repeat: -1, ease: Power0.easeInOut})
    
    leafMask.attr({
      x: sizes.card.offset.left, 
      y: 0, 
      width: sizes.container.width - sizes.card.offset.left,  
      height: sizes.container.height});
  }

  const drawCloud = (cloud, i) => {
    let space  = settings.cloudSpace * i;
    let height = space + settings.cloudHeight;
    let arch = height + settings.cloudArch + (Math.random() * settings.cloudArch);
    let width = sizes.card.width;
    
    let points = [];
    points.push('M' + [-(width), 0].join(','));
    points.push([width, 0].join(','));
    points.push('Q' + [width * 2, height / 2].join(','));
    points.push([width, height].join(','));
    points.push('Q' + [width * 0.5, arch].join(','));
    points.push([0, height].join(','));
    points.push('Q' + [width * -0.5, arch].join(','));
    points.push([-width, height].join(','));
    points.push('Q' + [- (width * 2), height/2].join(','));
    points.push([-(width), 0].join(','));
    
    let path = points.join(' ');
    if(!cloud.path) cloud.path = cloud.group.path();
    cloud.path.animate({
        d: path
    }, 0)
  }

  const makeRain = () => {
    let lineWidth = Math.random() * 3;
    let lineLength = currentWeather.type === 'thunder' ? 35 : 14;
    let x = Math.random() * (sizes.card.width - 40) + 20;
    let line = innerRainHolder[3 - Math.floor(lineWidth)]
      .path('M0,0 0,' + lineLength).attr({
        fill: 'none',
        stroke: currentWeather.type === 'thunder' ? '#777' : '#0000ff',
        strokeWidth: lineWidth
      });
    rain.push(line)
    TweenMax.fromTo(line.node, 1, {x: x, y: 0- lineLength}, 
      {
        delay: Math.random(), 
        y: sizes.card.height, 
        ease: Power2.easeIn, 
        onComplete: onRainEnd, 
        onCompleteParams: [line, lineWidth, x, currentWeather.type]
      });
  }

  const onRainEnd = (line, width, x, type) => {
    line.remove()
    line = null
    for (let i in rain) {
      if(!rain[i].paper){
        rain.splice(i, 1)
      }
    }
    if(rain.length < settings.rainCount)
    {
      makeRain();
      if(width > 2) makeSplash(x, type);
    }
  }

  const makeSplash = (x, type) =>{
    let splashLength = type === 'thunder' ? 30 : 20;
    let splashBounce = type === 'thunder' ? 120 : 100;
    let splashDistance = 80;
    let speed = type === 'thunder' ? 0.7 : 0.5;
    let splashUp = 0 - (Math.random() * splashBounce);
    let randomX  = ((Math.random() * splashDistance) - (splashDistance / 2));
    let points = []
    points.push('M' + 0 + ',' + 0);
    points.push('Q' + randomX + ',' + splashUp);
    points.push((randomX * 2) + ',' + splashDistance);
    let splash = outerSplashHolder.path(points.join(' ')).attr({
      fill: "none",
      stroke: type === 'thunder' ? '#777' : '#0000ff',
      strokeWidth: 1
    });
    let pathLength = Snap.path.getTotalLength(splash);
    let xOffset = sizes.card.offset.left;//(sizes.container.width - sizes.card.width) / 2
    let yOffset = sizes.card.offset.top + sizes.card.height; 
      splash.node.style.strokeDasharray = splashLength + ' ' + pathLength;
    
    TweenMax.fromTo(splash.node, speed, 
      {
        strokeWidth: 2, 
        y: yOffset, 
        x: xOffset + 20 + x,
         opacity: 1, 
         strokeDashoffset: splashLength
      }, 
      {
        strokeWidth: 0, 
        strokeDashoffset: - pathLength, 
        opacity: 1, 
        onComplete: onSplashComplete, 
        onCompleteParams: [splash], 
        ease:  SlowMo.ease.config(0.4, 0.1, false)
      })
  }

  const onSplashComplete = (splash) => {
    splash.remove();
    splash = null;
  }

  const makeLeaf = () => {
    let scale = 0.5 + (Math.random() * 0.5);
    let newLeaf;
    
    let areaY = sizes.card.height/2;
    let y = areaY + (Math.random() * areaY);
    let endY = y - ((Math.random() * (areaY * 2)) - areaY)
    let x;
    let endX;
    let colors = ['#76993E', '#4A5E23', '#6D632F'];
    let color = colors[Math.floor(Math.random() * colors.length)];
    let xBezier;
    
    if(scale > 0.8)
    {
      newLeaf = leaf.clone().appendTo(outerLeafHolder)
      .attr({
        fill: color
      })
      y = y + sizes.card.offset.top / 2;
      endY = endY + sizes.card.offset.top / 2;
      
      x = sizes.card.offset.left - 100;
      xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
      endX = sizes.container.width + 50;
    }
    else 
    {
      newLeaf = leaf.clone().appendTo(innerLeafHolder)
      .attr({
        fill: color
      })
      x = -100;
      xBezier = sizes.card.width / 2;
      endX = sizes.card.width + 50;
      
    }
    
    leafs.push(newLeaf);
     
    let bezier = [{x:x, y:y}, {x: xBezier, y:(Math.random() * endY) + (endY / 3)}, {x: endX, y:endY}]
    TweenMax.fromTo(newLeaf.node, 2, {rotation: Math.random()* 180, x: x, y: y, scale:scale}, {rotation: Math.random()* 360, bezier: bezier, onComplete: onLeafEnd, onCompleteParams: [newLeaf], ease: Power0.easeIn})
  }

  const onLeafEnd = (leaf) => {
    leaf.remove();
    leaf = null;
    
    for(let i in leafs)
    {
      if(!leafs[i].paper) leafs.splice(i, 1);
    }
    
    if(leafs.length < settings.leafCount)
    {
      makeLeaf();
    }
  }

  const makeSnow = () => {
    let scale = 0.5 + (Math.random() * 0.5);
    let newSnow;
    
    let x = 20 + (Math.random() * (sizes.card.width - 40));
    let endX; // = x - ((Math.random() * (areaX * 2)) - areaX)
    let y = -10;
    let endY;
    
    if(scale > 0.8)
    {
      newSnow = outerSnowHolder.circle(0, 0, 5)
        .attr({
          fill: 'white'
        })
      endY = sizes.container.height + 10;
      y = sizes.card.offset.top + settings.cloudHeight;
      x =  x + sizes.card.offset.left;
      //xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
      //endX = sizes.container.width + 50;
    }
    else 
    {
      newSnow = innerSnowHolder.circle(0, 0 ,5)
      .attr({
        fill: 'white'
      })
      endY = sizes.card.height + 10;
      //x = -100;
      //xBezier = sizes.card.width / 2;
      //endX = sizes.card.width + 50;
      
    }
    
    snow.push(newSnow);
     
    TweenMax.fromTo(newSnow.node, 3 + (Math.random() * 5), {x: x, y: y}, {y: endY, onComplete: onSnowEnd, onCompleteParams: [newSnow], ease: Power0.easeIn})
    TweenMax.fromTo(newSnow.node, 1,{scale: 0}, {scale: scale, ease: Power1.easeInOut})
    TweenMax.to(newSnow.node, 3, {x: x+((Math.random() * 150)-75), repeat: -1, yoyo: true, ease: Power1.easeInOut})
  }

  const onSnowEnd = (flake) => {
    flake.remove();
    flake = null;
    
    for(let i in snow)
    {
      if(!snow[i].paper) snow.splice(i, 1);
    }
    
    if(snow.length < settings.snowCount)
    {
      makeSnow();
    }
  }

  const tick = useCallback (() => {
    tickCount++;
    let check = tickCount % settings.renewCheck;
    
    if(check)
    {
      if(rain.length < settings.rainCount) makeRain();
      if(leafs.length < settings.leafCount) makeLeaf();
      if(snow.length < settings.snowCount) makeSnow();
    }
    
    for(let i = 0; i < clouds.length; i++)
    {		
      if(currentWeather.type === 'sun')
      {
        if(clouds[i].offset > -(sizes.card.width * 1.5)) clouds[i].offset += settings.windSpeed / (i + 1);
        if(clouds[i].offset > sizes.card.width * 2.5) clouds[i].offset = -(sizes.card.width * 1.5);
        clouds[i].group.transform('t' + clouds[i].offset + ',' + 0);
      }
      else
      {	
        clouds[i].offset += settings.windSpeed / (i + 1);
        if(clouds[i].offset > sizes.card.width) clouds[i].offset = 0 + (clouds[i].offset - sizes.card.width);
        clouds[i].group.transform('t' + clouds[i].offset + ',' + 0);
      }
    }
    requestAnimationFrame(tick);
  })

  const reset = () => {
    for(let i = 0; i < weather.length; i++)
    {
      containerRef.current.classList.remove(weather[i].type);
      // weather[i].button.removeClass('active');
    }
  }

  const startLightningTimer = () => {
    if(lightningTimeout) clearTimeout(lightningTimeout);
    if(currentWeather.type === 'thunder')
    {
      lightningTimeout = setTimeout(lightning, Math.random()*6000);
    }	
  }

  const lightning = () => {
    startLightningTimer();
    TweenMax.fromTo(cardRef.current, 0.75, {y: -30}, {y:0, ease:Elastic.easeOut});
    
    let pathX = 30 + Math.random() * (sizes.card.width - 60);
    let yOffset = 20;
    let steps = 20;
    let points = [pathX + ',0'];
    for(let i = 0; i < steps; i++)
    {
      let x = pathX + (Math.random() * yOffset - (yOffset / 2));
      let y = (sizes.card.height / steps) * (i + 1)
      points.push(x + ',' + y);
    }
    
    let strike = weatherContainer1.path('M' + points.join(' '))
    .attr({
      fill: 'none',
      stroke: 'white',
      strokeWidth: 2 + Math.random()
    })
    
    TweenMax.to(strike.node, 1, {opacity: 0, ease:Power4.easeOut, onComplete: function(){ strike.remove(); strike = null}})
  }

  const changeWeather = (weather) => {
    if(weather.data) weather = weather.data;
    reset();
    
    setWeather(weather)
    
    // TweenMax.killTweensOf(summary);
    // TweenMax.to(summary, 1, {opacity: 0, x: -30, onComplete: updateSummaryText, ease: Power4.easeIn})
    
    containerRef.current.classList.add(weather.type);
    // weather.button.addClass('active');
    
    // windSpeed
    
    switch(weather.type)
    {
      case 'wind':
        TweenMax.to(settings, 3, {windSpeed: 3, ease: Power2.easeInOut});
        break;
      case 'sun':
        TweenMax.to(settings, 3, {windSpeed: 20, ease: Power2.easeInOut});
        break;
      default:
        TweenMax.to(settings, 3, {windSpeed: 0.5, ease: Power2.easeOut});
        break;
    }	
    
    // rainCount
    
    switch(weather.type)
    {
      case 'rain':
        TweenMax.to(settings, 3, {rainCount: 10, ease: Power2.easeInOut});
        break;
      case 'thunder':
        TweenMax.to(settings, 3, {rainCount: 60, ease: Power2.easeInOut});
        break;
      default:
        TweenMax.to(settings, 1, {rainCount: 0, ease: Power2.easeOut});
        break;
    }	
    
    // leafCount
    
    switch(weather.type)
    {
      case 'wind':
        TweenMax.to(settings, 3, {leafCount: 5, ease: Power2.easeInOut});
        break;
      default:
        TweenMax.to(settings, 1, {leafCount: 0, ease: Power2.easeOut});
        break;
    }	
    
    // snowCount
    
    switch(weather.type)
    {
      case 'snow':
        TweenMax.to(settings, 3, {snowCount: 40, ease: Power2.easeInOut});
        break;
      default:
        TweenMax.to(settings, 1, {snowCount: 0, ease: Power2.easeOut});
        break;
    }
    
    // sun position
    
    switch(weather.type)
    {
      case 'sun':
        TweenMax.to(sun.node, 4, {x: sizes.card.width / 2, y: sizes.card.height / 2, ease: Power2.easeInOut});
        TweenMax.to(sunburst.node, 4, {scale: 1, opacity: 0.8, y: (sizes.card.height/2) + (sizes.card.offset.top), ease: Power2.easeInOut});
        break;
      default:
        TweenMax.to(sun.node, 2, {x: sizes.card.width / 2, y: -100, leafCount: 0, ease: Power2.easeInOut});
        TweenMax.to(sunburst.node, 2, {scale: 0.4, opacity: 0, y: (sizes.container.height/2)-50, ease: Power2.easeInOut});
        break;
    }	
    
    // lightning
    
    startLightningTimer();
  }

  useEffect( () => {
    // containerRef.current.classList.add("test")
    // console.log(containerRef.current.classList)
    console.log("1")
    initWeather()
    // window.addEventListener("resize", onResize)
    requestAnimationFrame(tick);
    return () => {reset()}
  },[initWeather, tick,])

  return(
    <div className={classes.Background}>
      <div className={classes.Container} ref={containerRef}>
        <svg className={classes.Back} ref={backSVGRef}>
          <radialGradient id='SVGID_1' cx='0' cy='0'
            r='320.8304' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='#FFDE17' stopOpacity='0.7' />
            <stop  offset="1" stopColor='#FFF200' stopOpacity='0' />
          </radialGradient>
          <path ref={sunburstRef} fill='url(#SVGID_1)' d="M0,319.7c-18.6,0-37.3-1.6-55.5-4.8L-7.8,41.4c5.1,0.9,10.6,0.9,15.7,0L56,314.8C37.6,318,18.8,319.7,0,319.7z
              M-160.8,276.6c-32.5-18.8-61.3-42.9-85.5-71.6L-34,26.2c3.4,4.1,7.4,7.4,12,10.1L-160.8,276.6z M161.3,276.4L22.1,36.2
              c4.5-2.6,8.6-6,12-10.1l212.6,178.5C222.5,233.4,193.8,257.6,161.3,276.4z M-302.5,108.3C-315.4,73-321.9,36-322-1.8l277.6-0.5
              c0,5.3,0.9,10.4,2.7,15.2L-302.5,108.3z M302.6,107.8L41.8,12.8c1.7-4.7,2.6-9.7,2.6-14.9c0-0.3,0-0.6,0-1H322l0-1.3l0,1.9
              C322,35.4,315.5,72.5,302.6,107.8z M-41.8-17.5l-261-94.5c12.8-35.4,31.6-68,55.8-96.9L-34.1-30.8C-37.5-26.8-40.1-22.3-41.8-17.5z
              M41.7-17.7c-1.8-4.8-4.4-9.3-7.8-13.3l212-179.2c24.3,28.8,43.3,61.3,56.3,96.6L41.7-17.7z M-22.2-40.8l-139.6-240
              c32.7-19,68.1-32,105.2-38.6L-8-46.1C-13-45.2-17.8-43.4-22.2-40.8z M22-40.9c-4.4-2.6-9.2-4.3-14.2-5.1l47.1-273.6
              c37.2,6.4,72.7,19.2,105.4,38L22-40.9z"/>
        </svg>
        <nav>
          <ul>
            <li><button className={classes.active} onClick={() => changeWeather("snow")}>Snow</button></li>
            <li><button onClick={()=>changeWeather("wind")}>Wind</button></li>
            <li><button>Rain</button></li>
            <li><button>Thunder</button></li>
            <li><button onClick={()=>changeWeather("sun")}>Sunny</button></li>
          </ul>
        </nav>
        <div className={[classes.Weather, classes.Card].join(' ')} ref={cardRef}>
          <svg className={classes.Inner} ref={innerSVGRef}>
            <defs>
              <path ref={leafRef}
                d="M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z"/>
            </defs>
            <circle ref={sunRef} fill='#F7ED47' cx='0' cy='0' r='50' />
            <g ref={layer3Ref}></g>
            <g ref={cloud3Ref} className={[classes.Cloud, classes.Cloud3].join(' ')}></g>
            <g ref={layer2Ref}></g>
            <g ref={cloud2Ref} className={[classes.Cloud, classes.Cloud2].join(' ')}></g>
            <g ref={layer1Ref}></g>
            <g ref={cloud1Ref} className={[classes.Cloud, classes.Cloud1].join(' ')}></g>
          </svg>

          <div className={classes.Details}>
            <div className={classes.Temp}>20<span>c</span></div>
            <div className={classes.Right}>
              <div id={classes.date}>Monday 22 August</div>
              <div id={classes.summary}></div>
            </div>
          </div>

        </div>
        <svg className={classes.Outer} ref={outerSVGRef}></svg>
      </div>
      
      {/* <svg>
        <radialGradient id='SVGID_2_' cx='0' cy='0'
            r='320.8304' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#FFDE17' stopOpacity='0.7' />
          <stop  offset="1" stopColor='#FFF200' stopOpacity='0' />
        </radialGradient>
        <path id="sunburst" fill='url(#SVGID_2_)' d="M0,319.7c-18.6,0-37.3-1.6-55.5-4.8L-7.8,41.4c5.1,0.9,10.6,0.9,15.7,0L56,314.8C37.6,318,18.8,319.7,0,319.7z
              M-160.8,276.6c-32.5-18.8-61.3-42.9-85.5-71.6L-34,26.2c3.4,4.1,7.4,7.4,12,10.1L-160.8,276.6z M161.3,276.4L22.1,36.2
              c4.5-2.6,8.6-6,12-10.1l212.6,178.5C222.5,233.4,193.8,257.6,161.3,276.4z M-302.5,108.3C-315.4,73-321.9,36-322-1.8l277.6-0.5
              c0,5.3,0.9,10.4,2.7,15.2L-302.5,108.3z M302.6,107.8L41.8,12.8c1.7-4.7,2.6-9.7,2.6-14.9c0-0.3,0-0.6,0-1H322l0-1.3l0,1.9
              C322,35.4,315.5,72.5,302.6,107.8z M-41.8-17.5l-261-94.5c12.8-35.4,31.6-68,55.8-96.9L-34.1-30.8C-37.5-26.8-40.1-22.3-41.8-17.5z
              M41.7-17.7c-1.8-4.8-4.4-9.3-7.8-13.3l212-179.2c24.3,28.8,43.3,61.3,56.3,96.6L41.7-17.7z M-22.2-40.8l-139.6-240
              c32.7-19,68.1-32,105.2-38.6L-8-46.1C-13-45.2-17.8-43.4-22.2-40.8z M22-40.9c-4.4-2.6-9.2-4.3-14.2-5.1l47.1-273.6
              c37.2,6.4,72.7,19.2,105.4,38L22-40.9z"/>

      </svg> */}
    </div>
  )
}

export default Weathers;
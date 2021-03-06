/**
 * <p>Title: header</p>
 * <p>Description: header</p>
 * <p>Copyright: Copyright (c) 2018</p>
 *
 * @author wangqian
 * @date 2018-02-06
 * @version 1.0
 */
$('.headerWrap').html('<header class="pure-g" id="header"> <div class="pure-u-1 pure-u-lg-4-24"> ' +
    '<div class="logo"><a href="/introduction"><img src="/introduction/base/imgs/logo.svg" class="pure-img" alt="" /></a>' +
    '</div> ' +
    '</div> <input type="checkbox" id="menu-toggle-cb"> ' +
    '<label id="menu-toggle" for="menu-toggle-cb" onclick><s class="bar"></s><s class="bar"></s><s class="bar"></s></label> ' +
    '<div class="pure-u-1 pure-u-lg-20-24 box-relative menu-wrapper"> ' +
    '     <nav class="pure-menu pure-menu-horizontal menu-local"> ' +
    '         <ul class="pure-menu-list"> ' +
    '             <li class="pure-menu-item"><a href="/introduction" class="pure-menu-link">Home</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link">Articles</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link">Projects</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link">About</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link">Sponsor</a></li> ' +
    '         </ul> ' +
    '     </nav> ' +
    '     <nav class="pure-menu pure-menu-horizontal menu-external"> ' +
    '         <ul class="pure-menu-list"> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/projects/introduction-wiki.html" class="pure-menu-link">wiki</a></li> ' +
    '             <li class="pure-menu-item"><a href="https://github.com/wangqian-projects/introduction" class="pure-menu-link"><i class="fa fa-github"></i> github</a></li> ' +
    '             <li class="pure-menu-item"><a href="mailto:925548289@qq.com" class="pure-menu-link"><meta itemprop="email" content="wangqian_live@163.com"/>mail</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link">author</a></li> ' +
    '             <li class="pure-menu-item"><a href="/introduction/main/page/friendly/404.html" class="pure-menu-link"><i class="fa fa-user-circle"></i> sign in</a></li> ' +
    '         </ul> ' +
    '     </nav> ' +
    ' </div> ' +
    ' </header>');

$('.footerWrap').html('<footer>© Copyright 2021 Wangqian Projects all rights reserved | <a href="/introduction/main/page/policy/privacy-policy.html">Privacy Policy</a></footer>');

//使元素为class="href-Invalid"的href失效
$(".href-invalid").click(function () {
    return false;
});

//执行动态切换背景
IntervalBackImg();

//functions
function IntervalBackImg() {
    window.setInterval(RandomBackImg, 10000);
}

function RandomBackImg() {
    var imgArr = ["banner0.jpg", "banner1.jpg", "banner2.jpg", "banner3.jpg"];
    var index = RandomNum(0, imgArr.length);
    $('.interval-back-img').css("background-image", "url(https://wangqian-projects.github.io/wangqian-introduction/wangqian-introduction-project/wangqian-introduction/wangqian-introduction-web/src/main/resources/static/main/imgs/" + imgArr[index] + ")");
}

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range);
    return num;
}


//----------------------------aviator--------------------------------
function aviator() {
    //COLORS
    var Colors = {
        red: 0xf25346,
        white: 0xd8d0d1,
        pink: 0xF5986E,
        brown: 0x59332e,
        brownDark: 0x23190f,
        blue: 0x68c3c0
    };

    // THREEJS RELATED VARIABLES

    var scene,
        camera, fieldOfView, aspectRatio, nearPlane, farPlane,
        renderer, container;


    //SCREEN VARIABLES

    var HEIGHT, WIDTH;

    //INIT THREE JS, SCREEN AND MOUSE EVENTS

    function createScene() {

        // HEIGHT = window.innerHeight;
        HEIGHT = 400;
        WIDTH = window.innerWidth;

        scene = new THREE.Scene();
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 60;
        nearPlane = 1;
        farPlane = 10000;
        camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        camera.position.x = 0;
        camera.position.z = 200;
        camera.position.y = 100;

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enabled = true;
        container = document.getElementById('world');
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', handleWindowResize, false);
    }

    // HANDLE SCREEN EVENTS

    function handleWindowResize() {
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }

    // LIGHTS

    var ambientLight, hemisphereLight, shadowLight;

    function createLights() {

        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        ambientLight = new THREE.AmbientLight(0xdc8874, .5);

        shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        shadowLight.position.set(150, 350, 350);
        shadowLight.castShadow = true;
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;

        scene.add(hemisphereLight);
        scene.add(shadowLight);
        scene.add(ambientLight);
    }


    var Pilot = function () {
        this.mesh = new THREE.Object3D();
        this.mesh.name = "pilot";
        this.angleHairs = 0;

        var bodyGeom = new THREE.BoxGeometry(15, 15, 15);
        var bodyMat = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
        var body = new THREE.Mesh(bodyGeom, bodyMat);
        body.position.set(2, -12, 0);

        this.mesh.add(body);

        var faceGeom = new THREE.BoxGeometry(10, 10, 10);
        var faceMat = new THREE.MeshLambertMaterial({color: Colors.pink});
        var face = new THREE.Mesh(faceGeom, faceMat);
        this.mesh.add(face);

        var hairGeom = new THREE.BoxGeometry(4, 4, 4);
        var hairMat = new THREE.MeshLambertMaterial({color: Colors.brown});
        var hair = new THREE.Mesh(hairGeom, hairMat);
        hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));
        var hairs = new THREE.Object3D();

        this.hairsTop = new THREE.Object3D();

        for (var i = 0; i < 12; i++) {
            var h = hair.clone();
            var col = i % 3;
            var row = Math.floor(i / 3);
            var startPosZ = -4;
            var startPosX = -4;
            h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
            this.hairsTop.add(h);
        }
        hairs.add(this.hairsTop);

        var hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
        hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
        var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
        var hairSideL = hairSideR.clone();
        hairSideR.position.set(8, -2, 6);
        hairSideL.position.set(8, -2, -6);
        hairs.add(hairSideR);
        hairs.add(hairSideL);

        var hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
        var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
        hairBack.position.set(-1, -4, 0)
        hairs.add(hairBack);
        hairs.position.set(-5, 5, 0);

        this.mesh.add(hairs);

        var glassGeom = new THREE.BoxGeometry(5, 5, 5);
        var glassMat = new THREE.MeshLambertMaterial({color: Colors.brown});
        var glassR = new THREE.Mesh(glassGeom, glassMat);
        glassR.position.set(6, 0, 3);
        var glassL = glassR.clone();
        glassL.position.z = -glassR.position.z

        var glassAGeom = new THREE.BoxGeometry(11, 1, 11);
        var glassA = new THREE.Mesh(glassAGeom, glassMat);
        this.mesh.add(glassR);
        this.mesh.add(glassL);
        this.mesh.add(glassA);

        var earGeom = new THREE.BoxGeometry(2, 3, 2);
        var earL = new THREE.Mesh(earGeom, faceMat);
        earL.position.set(0, 0, -6);
        var earR = earL.clone();
        earR.position.set(0, 0, 6);
        this.mesh.add(earL);
        this.mesh.add(earR);
    };

    Pilot.prototype.updateHairs = function () {
        var hairs = this.hairsTop.children;

        var l = hairs.length;
        for (var i = 0; i < l; i++) {
            var h = hairs[i];
            h.scale.y = .75 + Math.cos(this.angleHairs + i / 3) * .25;
        }
        this.angleHairs += 0.16;
    };


    var AirPlane = function () {
        this.mesh = new THREE.Object3D();
        this.mesh.name = "airPlane";

        // Cockpit

        var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
        var matCockpit = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});

        geomCockpit.vertices[4].y -= 10;
        geomCockpit.vertices[4].z += 20;
        geomCockpit.vertices[5].y -= 10;
        geomCockpit.vertices[5].z -= 20;
        geomCockpit.vertices[6].y += 30;
        geomCockpit.vertices[6].z += 20;
        geomCockpit.vertices[7].y += 30;
        geomCockpit.vertices[7].z -= 20;

        var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        // Engine

        var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        var matEngine = new THREE.MeshPhongMaterial({color: Colors.white, shading: THREE.FlatShading});
        var engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 50;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // Tail Plane

        var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        var matTailPlane = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
        var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-40, 20, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // Wings

        var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
        var matSideWing = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
        var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        sideWing.position.set(0, 15, 0);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
        var matWindshield = new THREE.MeshPhongMaterial({
            color: Colors.white,
            transparent: true,
            opacity: .3,
            shading: THREE.FlatShading
        });

        var windshield = new THREE.Mesh(geomWindshield, matWindshield);
        windshield.position.set(5, 27, 0);

        windshield.castShadow = true;
        windshield.receiveShadow = true;

        this.mesh.add(windshield);

        var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        geomPropeller.vertices[4].y -= 5;
        geomPropeller.vertices[4].z += 5;
        geomPropeller.vertices[5].y -= 5;
        geomPropeller.vertices[5].z -= 5;
        geomPropeller.vertices[6].y += 5;
        geomPropeller.vertices[6].z += 5;
        geomPropeller.vertices[7].y += 5;
        geomPropeller.vertices[7].z -= 5;
        var matPropeller = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
        this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
        var matBlade = new THREE.MeshPhongMaterial({color: Colors.brownDark, shading: THREE.FlatShading});
        var blade1 = new THREE.Mesh(geomBlade, matBlade);
        blade1.position.set(8, 0, 0);

        blade1.castShadow = true;
        blade1.receiveShadow = true;

        var blade2 = blade1.clone();
        blade2.rotation.x = Math.PI / 2;

        blade2.castShadow = true;
        blade2.receiveShadow = true;

        this.propeller.add(blade1);
        this.propeller.add(blade2);
        this.propeller.position.set(60, 0, 0);
        this.mesh.add(this.propeller);

        var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
        var wheelProtecMat = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
        var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
        wheelProtecR.position.set(25, -20, 25);
        this.mesh.add(wheelProtecR);

        var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
        var wheelTireMat = new THREE.MeshPhongMaterial({color: Colors.brownDark, shading: THREE.FlatShading});
        var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
        wheelTireR.position.set(25, -28, 25);

        var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
        var wheelAxisMat = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
        var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
        wheelTireR.add(wheelAxis);

        this.mesh.add(wheelTireR);

        var wheelProtecL = wheelProtecR.clone();
        wheelProtecL.position.z = -wheelProtecR.position.z;
        this.mesh.add(wheelProtecL);

        var wheelTireL = wheelTireR.clone();
        wheelTireL.position.z = -wheelTireR.position.z;
        this.mesh.add(wheelTireL);

        var wheelTireB = wheelTireR.clone();
        wheelTireB.scale.set(.5, .5, .5);
        wheelTireB.position.set(-35, -5, 0);
        this.mesh.add(wheelTireB);

        var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
        suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
        var suspensionMat = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
        var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
        suspension.position.set(-35, -5, 0);
        suspension.rotation.z = -.3;
        this.mesh.add(suspension);

        this.pilot = new Pilot();
        this.pilot.mesh.position.set(-10, 27, 0);
        this.mesh.add(this.pilot.mesh);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    };

    Sky = function () {
        this.mesh = new THREE.Object3D();
        this.nClouds = 20;
        this.clouds = [];
        var stepAngle = Math.PI * 2 / this.nClouds;
        for (var i = 0; i < this.nClouds; i++) {
            var c = new Cloud();
            this.clouds.push(c);
            var a = stepAngle * i;
            var h = 750 + Math.random() * 200;
            c.mesh.position.y = Math.sin(a) * h;
            c.mesh.position.x = Math.cos(a) * h;
            c.mesh.position.z = -400 - Math.random() * 400;
            c.mesh.rotation.z = a + Math.PI / 2;
            var s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);
            this.mesh.add(c.mesh);
        }
    };

    Sea = function () {
        var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        geom.mergeVertices();
        var l = geom.vertices.length;

        this.waves = [];

        for (var i = 0; i < l; i++) {
            var v = geom.vertices[i];
            this.waves.push({
                y: v.y,
                x: v.x,
                z: v.z,
                ang: Math.random() * Math.PI * 2,
                amp: 5 + Math.random() * 15,
                speed: 0.016 + Math.random() * 0.032
            });
        }

        var mat = new THREE.MeshPhongMaterial({
            color: Colors.blue,
            transparent: true,
            opacity: .8,
            shading: THREE.FlatShading,

        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.receiveShadow = true;

    };

    Sea.prototype.moveWaves = function () {
        var verts = this.mesh.geometry.vertices;
        var l = verts.length;
        for (var i = 0; i < l; i++) {
            var v = verts[i];
            var vprops = this.waves[i];
            v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
            vprops.ang += vprops.speed;
        }
        this.mesh.geometry.verticesNeedUpdate = true;
        sea.mesh.rotation.z += .005;
    };

    Cloud = function () {
        this.mesh = new THREE.Object3D();
        this.mesh.name = "cloud";
        var geom = new THREE.CubeGeometry(20, 20, 20);
        var mat = new THREE.MeshPhongMaterial({
            color: Colors.white,
        });

        var nBlocs = 3 + Math.floor(Math.random() * 3);
        for (var i = 0; i < nBlocs; i++) {
            var m = new THREE.Mesh(geom.clone(), mat);
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;
            var s = .1 + Math.random() * .9;
            m.scale.set(s, s, s);
            m.castShadow = true;
            m.receiveShadow = true;
            this.mesh.add(m);
        }
    };

    // 3D Models
    var sea;
    var airplane;

    function createPlane() {
        airplane = new AirPlane();
        airplane.mesh.scale.set(.25, .25, .25);
        airplane.mesh.position.y = 100;
        scene.add(airplane.mesh);
    }

    function createSea() {
        sea = new Sea();
        sea.mesh.position.y = -600;
        scene.add(sea.mesh);
    }

    function createSky() {
        sky = new Sky();
        sky.mesh.position.y = -600;
        scene.add(sky.mesh);
    }

    function loop() {
        updatePlane();
        airplane.pilot.updateHairs();
        updateCameraFov();
        sea.moveWaves();
        sky.mesh.rotation.z += .01;
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    function updatePlane() {
        var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
        var targetX = normalize(mousePos.x, -.75, .75, -100, 100);
        airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;
        airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
        airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * 0.0064;
        airplane.propeller.rotation.x += 0.3;
    }

    function updateCameraFov() {
        camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
        camera.updateProjectionMatrix();
    }

    function normalize(v, vmin, vmax, tmin, tmax) {
        var nv = Math.max(Math.min(v, vmax), vmin);
        var dv = vmax - vmin;
        var pc = (nv - vmin) / dv;
        var dt = tmax - tmin;
        var tv = tmin + (pc * dt);
        return tv;
    }

    function init(event) {
        document.addEventListener('mousemove', handleMouseMove, false);
        createScene();
        createLights();
        createPlane();
        createSea();
        createSky();
        loop();
    }


    // HANDLE MOUSE EVENTS

    var mousePos = {x: 0, y: 0};

    function handleMouseMove(event) {
        var tx = -1 + (event.clientX / WIDTH) * 2;
        var ty = 1 - (event.clientY / HEIGHT) * 2;
        mousePos = {x: tx, y: ty};
    }

    window.addEventListener('load', init, false);
}

//-----------------------------heavenly-body--------------------------------
function heavenlyBody() {
    function getMat(color) {
        // our material is a phong material, with no shininess (highlight) and a black specular
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: .9,
            transparent: true,
            opacity: 0,
            emissive: 0x270000,
            shading: THREE.FlatShading
        });
    }

    var Colors = {
        red: 0xf85051,
        orange: 0xea8962,
        yellow: 0xdacf75,
        beige: 0xccc58f,
        grey: 0xbab7a1,
        blue: 0x4379a8,
        ocean: 0x4993a8,
        green: 0x24a99b
    };

    var colorsLength = Object.keys(Colors).length;

    function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomColor() {
        var colIndx = Math.floor(Math.random() * colorsLength);
        var colorStr = Object.keys(Colors)[colIndx];
        return Colors[colorStr];
    }

    function shiftPosition(pos, radius) {
        if (Math.abs(pos) < radius) {
            if (pos >= 0) {
                return pos + radius;
            } else {
                return pos - radius;
            }
        } else {
            return pos;
        }
    }

// Default parameters
    var parameters = {
        minRadius: 30,
        maxRadius: 50,
        minSpeed: .015,
        maxSpeed: .025,
        particles: 500,
        minSize: .1,
        maxSize: 2
    };

// For a THREEJS project we need at least
// a scene
// a renderer
// a camera
// a light (1 or many)
// a mesh (an object to display)

    var scene, renderer, camera, light;
    var stars = [];
    var nbPlanetsMax = 4;
    var planets = [];
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;


// initialise the world
    function initWorld() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, .1, 2000);
        camera.position.z = 100;

        //
        // THE RENDERER
        //
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enabled = true;

        container = document.getElementById('universe');
        container.appendChild(renderer.domElement);


        // Lights
        ambientLight = new THREE.AmbientLight(0x663344, 2);
        scene.add(ambientLight);

        light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(200, 100, 200);
        light.castShadow = true;
        light.shadow.camera.left = -400;
        light.shadow.camera.right = 400;
        light.shadow.camera.top = 400;
        light.shadow.camera.bottom = -400;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 1000;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;

        scene.add(light);


        //
        // HANDLE SCREEN RESIZE
        //
        window.addEventListener('resize', handleWindowResize, false);

        // Creating firts planets
        for (var i = 0; i < nbPlanetsMax; i++) {
            planets.push(new Planet(-2000 / nbPlanetsMax * i - 500));
        }
        addStarts();
        loop();

    }

    function animateStars(z) {

        // loop through each star
        var star;
        for (var i = 0; i < stars.length; i++) {

            star = stars[i];
            // if the particle is too close move it to the back
            if (star.position.z > z) star.position.z -= 2000;

        }

    }

    function addStarts() {

        for (var z = -2000; z < 0; z += 20) {

            var geometry = new THREE.SphereGeometry(0.5, 32, 32)
            var material = new THREE.MeshBasicMaterial({color: 0xffffff});
            var sphere = new THREE.Mesh(geometry, material)

            sphere.position.x = randomRange(-1 * Math.floor(WIDTH / 2), Math.floor(WIDTH / 2));
            sphere.position.y = randomRange(-1 * Math.floor(HEIGHT / 2), Math.floor(HEIGHT / 2));

            // Then set the z position to where it is in the loop (distance of camera)
            sphere.position.z = z;

            // scale it up a bit
            sphere.scale.x = sphere.scale.y = 2;

            //add the sphere to the scene
            scene.add(sphere);

            //finally push it to the stars array
            stars.push(sphere);
        }
    }

    var Planet = function (z) {
        // the geometry of the planet is a tetrahedron
        this.planetRadius = randomRange(12, 30);
        var planetDetail = randomRange(2, 3);
        var geomPlanet = new THREE.TetrahedronGeometry(this.planetRadius, planetDetail);

        var noise = randomRange(1, 5);
        for (var i = 0; i < geomPlanet.vertices.length; i++) {
            var v = geomPlanet.vertices[i];
            v.x += -noise / 2 + Math.random() * noise;
            v.y += -noise / 2 + Math.random() * noise;
            v.z += -noise / 2 + Math.random() * noise;
        }

        // create a new material for the planet
        var color = getRandomColor();
        var matPlanet = getMat(color);
        // create the mesh of the planet
        this.planet = new THREE.Mesh(geomPlanet, matPlanet);

        this.ring = new THREE.Mesh();
        this.nParticles = 0;

        // create the particles to populate the ring
        this.updateParticlesCount();

        // Create a global mesh to hold the planet and the ring
        this.mesh = new THREE.Object3D();
        this.mesh.add(this.planet);
        this.mesh.add(this.ring);

        this.planet.castShadow = true;
        this.planet.receiveShadow = true;

        // update the position of the particles => must be moved to the loop
        this.mesh.rotation.x = (Math.random() * 2 - 1) * 2 * Math.PI;
        this.mesh.rotation.z = (Math.random() * 2 - 1) * 2 * Math.PI;

        var posX = randomRange(-1 * Math.floor(WIDTH / 4), Math.floor(WIDTH / 4));
        var posY = randomRange(-1 * Math.floor(HEIGHT / 4), Math.floor(HEIGHT / 4));
        posX = shiftPosition(posX, this.planetRadius);
        posY = shiftPosition(posY, this.planetRadius);

        this.mesh.position.set(posX, posY, z);
        scene.add(this.mesh);
    };
    Planet.prototype.destroy = function () {
        scene.remove(this.mesh);
    };
    Planet.prototype.updateParticlesCount = function () {
        var parameters = {
            minRadius: randomRange(this.planetRadius + 10, 60),
            maxRadius: randomRange(40, 70),
            minSpeed: randomRange(0, 5) * 0.1 + randomRange(0, 9) * 0.01,
            maxSpeed: randomRange(0, 5) * 0.1 + randomRange(0, 9) * 0.01,
            particles: randomRange(0, 1) * randomRange(20, 30),
            minSize: randomRange(1, 3) + randomRange(0, 9) * 0.1,
            maxSize: randomRange(1, 3) + randomRange(0, 9) * 0.1
        };

        if (this.nParticles < parameters.particles) {
            // Remove particles
            for (var i = this.nParticles; i < parameters.particles; i++) {
                var p = new Particle();
                p.mesh.rotation.x = Math.random() * Math.PI;
                p.mesh.rotation.y = Math.random() * Math.PI;
                p.mesh.position.y = -2 + Math.random() * 4;
                this.ring.add(p.mesh);
            }
        } else {
            // add particles
            while (this.nParticles > parameters.particles) {
                var m = this.ring.children[this.nParticles - 1];
                this.ring.remove(m);
                m.userData.po = null;
                this.nParticles--;
            }
        }
        this.nParticles = parameters.particles;

        // We will give a specific angle to each particle
        // to cover the whole ring we need to
        // dispatch them regularly
        this.angleStep = Math.PI * 2 / this.nParticles;
        this.updateParticlesDefiniton();
    };

// Update particles definition
    Planet.prototype.updateParticlesDefiniton = function () {

        for (var i = 0; i < this.nParticles; i++) {
            var m = this.ring.children[i];
            var s = parameters.minSize + Math.random() * (parameters.maxSize - parameters.minSize);
            m.scale.set(s, s, s);

            // set a random distance
            m.userData.distance = parameters.minRadius + Math.random() * (parameters.maxRadius - parameters.minRadius);

            // give a unique angle to each particle
            m.userData.angle = this.angleStep * i;
            // set a speed proportionally to the distance
            m.userData.angularSpeed = rule3(m.userData.distance, parameters.minRadius, parameters.maxRadius, parameters.minSpeed, parameters.maxSpeed);
        }
    };

    var Particle = function () {
        // Size of the particle, make it random
        var s = 1;

        // geometry of the particle, choose between different shapes
        var geom,
            random = Math.random();

        if (random < .25) {
            // Cube
            geom = new THREE.BoxGeometry(s, s, s);

        } else if (random < .5) {
            // Pyramid
            geom = new THREE.CylinderGeometry(0, s, s * 2, 4, 1);

        } else if (random < .75) {
            // potato shape
            geom = new THREE.TetrahedronGeometry(s, 2);

        } else {
            // thick plane
            geom = new THREE.BoxGeometry(s / 6, s, s); // thick plane
        }
        // color of the particle, make it random and get a material
        var color = getRandomColor();
        var mat = getMat(color);

        // create the mesh of the particle
        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.mesh.userData.po = this;
    };


// Update particles position
    Planet.prototype.updateParticlesRotation = function () {

        // increase the rotation of each particle
        // and update its position

        for (var i = 0; i < this.nParticles; i++) {
            var m = this.ring.children[i];
            // increase the rotation angle around the planet
            m.userData.angle += m.userData.angularSpeed;

            // calculate the new position
            var posX = Math.cos(m.userData.angle) * m.userData.distance;
            var posZ = Math.sin(m.userData.angle) * m.userData.distance;
            m.position.x = posX;
            m.position.z = posZ;

            //*
            // add a local rotation to the particle
            m.rotation.x += Math.random() * .05;
            m.rotation.y += Math.random() * .05;
            m.rotation.z += Math.random() * .05;
            //*/
        }
    };

    function addPlanet(z) {
        planets.push(new Planet(z));
    }

    function loop() {
        var horizon = -2000 + camera.position.z;
        for (var i = 0; i < planets.length; i++) {
            if (planets[i].mesh.position.z > camera.position.z) {
                planets[i].destroy();
                planets.splice(i, 1);
            }

            // If the planet is arriving
            if (planets[i].mesh.position.z > horizon && planets[i].planet.material.opacity < 1) {
                planets[i].planet.material.opacity += 0.005;
                for (var j = 0; j < planets[i].mesh.children[1].children.length; j++) {
                    planets[i].mesh.children[1].children[j].material.opacity += 0.005;
                }
            }
        }


        // Adding stars
        animateStars(camera.position.z);

        if (planets.length < nbPlanetsMax) {
            addPlanet(camera.position.z - 2000);
        }

        for (var i = 0; i < planets.length; i++) {
            planets[i].planet.rotation.y -= 0.01;
            planets[i].updateParticlesRotation();
        }

        camera.position.z -= 3;

        //
        // RENDER !
        //
        renderer.render(scene, camera);

        //
        // REQUEST A NEW FRAME
        //
        requestAnimationFrame(loop);
    }

    function handleWindowResize() {
        // Recalculate Width and Height as they had changed
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;

        // Update the renderer and the camera
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }


    initWorld();

    function rule3(v, vmin, vmax, tmin, tmax) {
        var nv = Math.max(Math.min(v, vmax), vmin);
        var dv = vmax - vmin;
        var pc = (nv - vmin) / dv;
        var dt = tmax - tmin;
        var tv = tmin + (pc * dt);
        return tv;
    }
}
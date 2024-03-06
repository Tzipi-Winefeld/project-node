// ===========================================

const loading = document.querySelector("#loader");
const canvas = document.querySelector("canvas.webgl");
const messageC = document.querySelector(".message");
const messageTitle = document.querySelector(".messageTitle");
const messageDescription = document.querySelector(".messageDescription");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
  shadowMap: true,
});
const globalLight = "white";
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const textureLoader = new THREE.TextureLoader();
const loader = new THREE.GLTFLoader();
let minPan = new THREE.Vector3(-2, -0.5, -2);
let maxPan = new THREE.Vector3(2, 0.5, 2);
let controls,
  room,
  robot,
  sillon,
  silla,
  lampara,
  lamparaBase,
  jarron01,
  jarron02,
  jarron03,
  book;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const textureURL =
  "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/baked.jpg";
const textureNightURL =
  "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/baked-night.jpg";

// ====================================
// ====================================
function handleLoadRoom() {
  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/room.glb",
    (gltf) => {
      room = gltf.scene;
      applyTexture(room, textureURL, 0.1, 0.75);
      scene.add(room);
      loading.style.display = "none";
    }
  );

  function onDocumentTouchStart(event) {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;

    onDocumentMouseClick({ clientX: x, clientY: y });
  }

  document.addEventListener("click", onDocumentMouseClick);
  document.addEventListener("touchstart", onDocumentTouchStart);
}

function handleLoadModels() {
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.src =
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/video.mp4";
  video.play();
  video.setAttribute("crossorigin", "anonymous");

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.crossOrigin = "anonymous";
  videoTexture.format = THREE.RGBFormat;
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.maxFilter = THREE.NearestFilter;
  videoTexture.generateMipmaps = false;

  const videoMaterial = new THREE.MeshStandardMaterial({
    skinning: true,
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false,
  });

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/pantalla.glb",
    (gltf) => {
      gltf.scene.traverse((child) => {
        child.material = videoMaterial;
        child.material.metalness = 0.1;
        child.material.roughness = 0.1;
      });
      scene.add(gltf.scene);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/lampara.glb",
    (gltf) => {
      lampara = gltf.scene;
      applyTexture(lampara, textureURL, 0.1, 0.5);
      lampara.position.sub(new THREE.Vector3(1.25, -1.1, 0.25));
      scene.add(lampara);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/robot.glb",
    (gltf) => {
      robot = gltf.scene;
      applyTexture(robot, textureURL, 0, 1);
      robot.position.sub(new THREE.Vector3(0.25, 0.42, 1.25));
      scene.add(robot);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/sillon.glb",
    (gltf) => {
      sillon = gltf.scene;
      applyTexture(sillon, textureURL, 0, 1);
      sillon.position.sub(new THREE.Vector3(-1.475, 1.125, -0.78));
      scene.add(sillon);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/lamparaBase.glb",
    (gltf) => {
      lamparaBase = gltf.scene;
      applyTexture(lamparaBase, textureURL, 0, 1, true);
      lamparaBase.position.sub(new THREE.Vector3(1.675, 0.5, 1.25));
      scene.add(lamparaBase);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/book.glb",
    (gltf) => {
      book = gltf.scene;
      applyTexture(book, textureURL, 0, 1);
      book.position.sub(new THREE.Vector3(1.03, 0.53, 1.23));
      scene.add(book);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/silla.glb",
    (gltf) => {
      silla = gltf.scene;
      applyTexture(silla, textureURL, 0, 1);
      silla.position.sub(new THREE.Vector3(0.785, 0.95, 0.225));
      scene.add(silla);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron01.glb",
    (gltf) => {
      jarron01 = gltf.scene;
      applyTexture(jarron01, textureURL, 0.25, 0.5);
      jarron01.position.sub(new THREE.Vector3(-0.7, -0.15, 1.2));
      scene.add(jarron01);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron02.glb",
    (gltf) => {
      jarron02 = gltf.scene;
      applyTexture(jarron02, textureURL, 0.25, 0.5);
      jarron02.position.sub(new THREE.Vector3(1.5, -0.77, 1.1));
      scene.add(jarron02);
    }
  );

  loader.load(
    "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron03.glb",
    (gltf) => {
      jarron03 = gltf.scene;
      applyTexture(jarron03, textureURL, 0.25, 0.5);
      jarron03.position.sub(new THREE.Vector3(1.75, -0.77, 1.1));
      scene.add(jarron03);
    }
  );

  function onDocumentTouchStart(event) {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;

    onDocumentMouseMove({ clientX: x, clientY: y });
  }

  document.addEventListener("click", onDocumentMouseMove);
  document.addEventListener("touchstart", onDocumentTouchStart);
}

function handleSetControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.x = 18;
  camera.position.y = 6;
  camera.position.z = 18;
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minPolarAngle = Math.PI / 5;
  controls.maxPolarAngle = Math.PI / 1.9;
  controls.minAzimuthAngle = -Math.PI / 10;
  controls.maxAzimuthAngle = Math.PI / 1.5;
  controls.minDistance = 1;
  controls.maxDistance = 16;
}

function applyTexture(model, texturePath, metalness, roughness, basic) {
  const texture = textureLoader.load(texturePath);
  let material = basic
    ? new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    : new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
      child.material.metalness = metalness;
      child.material.roughness = roughness;
    }
  });
}

function showMessage(message, description) {
  messageTitle.innerText = message;
  messageDescription.innerText = description;
  messageC.classList.add("is-visible");
}

function onDocumentMouseClick(event) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects1 = raycaster.intersectObject(lampara, true);

  if (intersects1.length > 0) {
    if (!lampara.userData.isClicked) {
      lampara.userData.isClicked = true;
      showMessage(
        "Ceiling Light",
        " This minimalist ceiling light is a perfect choice for your living room, bedroom, kitchen, dining room, office, restaurant, hotel, bar, etc"
      );
      nightMode();
    } else {
      lampara.userData.isClicked = false;
      dayMode();
    }
  }
}

function onDocumentMouseMove(event) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const objectsToIntersect = [
    {
      object: robot,
      name: "Robot",
      description:
        "Crafted from high-quality steel and finished in a painted silver finish, this clock features a large round clockface which takes up the entire body of the robot.",
    },
    {
      object: sillon,
      name: "Puff Puff",
      description:
        "The design of the Puff Sofa Lite emphasizes its visual appeal while maintaining a soft and comfortable feel.",
    },
    {
      object: silla,
      name: "Chair",
      description:
        "A modern minimalist chair is a chair that is designed to be as simple as possible. This means that it will have few or no extra features, and it will use materials in their most basic form.",
    },
    {
      object: jarron01,
      name: "Vase No. 1 - Black Night",
      description:
        "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
    },
    {
      object: jarron02,
      name: "Vase No. 2 - Golden Aura",
      description:
        "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
    },
    {
      object: jarron03,
      name: "Vase No. 3 - Silver Vibes",
      description:
        "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
    },
    { object: book, name: "Book ?", description: "Black book, ... right?" },
    {
      object: lamparaBase,
      name: "Lamp",
      description:
        "This beautifully designed color-changing minimalist corner floor lamp fits discreetly and perfectly into corners.",
    },
  ];

  function handleIntersection(object) {
    const intersects = raycaster.intersectObject(object.object, true);
    if (intersects.length > 0) {
      if (!object.object.userData.isHovered) {
        object.object.userData.isHovered = true;
        showMessage(object.name, object.description);
      }
    } else {
      object.object.userData.isHovered = false;
    }
  }

  objectsToIntersect.forEach(handleIntersection);
}

const lightConfigurations = [
  { intensity: 1, position: new THREE.Vector3(0, 3, 0) },
  { intensity: 0.65, position: new THREE.Vector3(-4, 0, -2) },
  { intensity: 0.65, position: new THREE.Vector3(4, 1, 2) },
  { intensity: 0.5, position: new THREE.Vector3(0, 0, 3) },
  { intensity: 0.65, position: new THREE.Vector3(0, 0, -5) },
  { intensity: 0.5, position: new THREE.Vector3(0, -10, 0) },
];

const lights = [];

lightConfigurations.forEach((config) => {
  const light = new THREE.DirectionalLight(globalLight, 3);
  scene.add(light);
  light.intensity = config.intensity;
  light.position.copy(config.position);
  light.castShadow = true;
  lights.push(light);
});

function handleSetMaterial(path) {
  const objectsToTraverse = [
    lampara,
    room,
    robot,
    sillon,
    silla,
    jarron01,
    jarron02,
    jarron03,
    book,
    lamparaBase,
  ];
  const texture = textureLoader.load(path);
  texture.flipY = false;
  // lampara.traverse(child => {if (child instanceof THREE.Mesh) {child.material.map = texture}})
  objectsToTraverse.forEach((object) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });
  });
}

function handleSetLights(color) {
  for (var i = 0; i < lights.length; i++) {
    lights[i].color.set(color);
  }
}

function nightMode() {
  document.body.style.setProperty("--bg", "#15293b");
  handleSetLights("#ffffff");
  handleSetMaterial(textureNightURL);
}
function dayMode() {
  document.body.style.setProperty("--bg", "#f5e4cf");
  handleSetLights("#ffffff");
  handleSetMaterial(textureURL);
}

function animate() {
  requestAnimationFrame(animate);
  const objectsToRotate = [
    robot,
    sillon,
    silla,
    jarron01,
    jarron02,
    jarron03,
    book,
    lamparaBase,
  ];

  objectsToRotate.forEach((object) => {
    if (object && object.userData.isHovered) {
      object.rotation.y += 0.03;
    }
  });

  controls.update();
  controls.target.clamp(minPan, maxPan);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

messageC.addEventListener("click", () =>
  messageC.classList.remove("is-visible")
);

handleLoadModels();
handleLoadRoom();
handleSetControls();
animate();

// const loading = document.querySelector("#loader");
// const canvas = document.querySelector("canvas.webgl");
// const messageC = document.querySelector(".message");
// const messageTitle = document.querySelector(".messageTitle");
// const messageDescription = document.querySelector(".messageDescription");
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   15,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
//   alpha: true,
//   shadowMap: true,
// });
// const globalLight = "white";
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
// const textureLoader = new THREE.TextureLoader();
// const loader = new THREE.GLTFLoader();
// let minPan = new THREE.Vector3(-2, -0.5, -2);
// let maxPan = new THREE.Vector3(2, 0.5, 2);
// let controls,
//   room,
//   robot,
//   sillon,
//   silla,
//   lampara,
//   lamparaBase,
//   jarron01,
//   jarron02,
//   jarron03,
//   book;

// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.outputEncoding = THREE.sRGBEncoding;
// document.body.appendChild(renderer.domElement);

// const textureURL =
//   "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/baked.jpg";
// const textureNightURL =
//   "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/baked-night.jpg";

// // ====================================
// // ====================================
// function handleLoadRoom() {
//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/room.glb",
//     (gltf) => {
//       room = gltf.scene;
//       applyTexture(room, textureURL, 0.1, 0.75);
//       scene.add(room);
//       loading.style.display = "none";
//     }
//   );

//   function onDocumentTouchStart(event) {
//     const x = event.touches[0].clientX;
//     const y = event.touches[0].clientY;

//     onDocumentMouseClick({ clientX: x, clientY: y });
//   }

//   document.addEventListener("click", onDocumentMouseClick);
//   document.addEventListener("touchstart", onDocumentTouchStart);
// }

// function handleLoadModels() {
//   const video = document.createElement("video");
//   video.muted = true;
//   video.loop = true;
//   video.autoplay = true;
//   video.playsInline = true;
//   video.src =
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/video.mp4";
//   video.play();
//   video.setAttribute("crossorigin", "anonymous");

//   const videoTexture = new THREE.VideoTexture(video);
//   videoTexture.crossOrigin = "anonymous";
//   videoTexture.format = THREE.RGBFormat;
//   videoTexture.minFilter = THREE.NearestFilter;
//   videoTexture.maxFilter = THREE.NearestFilter;
//   videoTexture.generateMipmaps = false;

//   const videoMaterial = new THREE.MeshStandardMaterial({
//     skinning: true,
//     map: videoTexture,
//     side: THREE.FrontSide,
//     toneMapped: false,
//   });

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/pantalla.glb",
//     (gltf) => {
//       gltf.scene.traverse((child) => {
//         child.material = videoMaterial;
//         child.material.metalness = 0.1;
//         child.material.roughness = 0.1;
//       });
//       scene.add(gltf.scene);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/lampara.glb",
//     (gltf) => {
//       lampara = gltf.scene;
//       applyTexture(lampara, textureURL, 0.1, 0.5);
//       lampara.position.sub(new THREE.Vector3(1.25, -1.1, 0.25));
//       scene.add(lampara);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/robot.glb",
//     (gltf) => {
//       robot = gltf.scene;
//       applyTexture(robot, textureURL, 0, 1);
//       robot.position.sub(new THREE.Vector3(0.25, 0.42, 1.25));
//       scene.add(robot);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/sillon.glb",
//     (gltf) => {
//       sillon = gltf.scene;
//       applyTexture(sillon, textureURL, 0, 1);
//       sillon.position.sub(new THREE.Vector3(-1.475, 1.125, -0.78));
//       scene.add(sillon);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/lamparaBase.glb",
//     (gltf) => {
//       lamparaBase = gltf.scene;
//       applyTexture(lamparaBase, textureURL, 0, 1, true);
//       lamparaBase.position.sub(new THREE.Vector3(1.675, 0.5, 1.25));
//       scene.add(lamparaBase);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/book.glb",
//     (gltf) => {
//       book = gltf.scene;
//       applyTexture(book, textureURL, 0, 1);
//       book.position.sub(new THREE.Vector3(1.03, 0.53, 1.23));
//       scene.add(book);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/silla.glb",
//     (gltf) => {
//       silla = gltf.scene;
//       applyTexture(silla, textureURL, 0, 1);
//       silla.position.sub(new THREE.Vector3(0.785, 0.95, 0.225));
//       scene.add(silla);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron01.glb",
//     (gltf) => {
//       jarron01 = gltf.scene;
//       applyTexture(jarron01, textureURL, 0.25, 0.5);
//       jarron01.position.sub(new THREE.Vector3(-0.7, -0.15, 1.2));
//       scene.add(jarron01);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron02.glb",
//     (gltf) => {
//       jarron02 = gltf.scene;
//       applyTexture(jarron02, textureURL, 0.25, 0.5);
//       jarron02.position.sub(new THREE.Vector3(1.5, -0.77, 1.1));
//       scene.add(jarron02);
//     }
//   );

//   loader.load(
//     "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room14/a50f65020e8781fc118b6626a3bd6044482dd478/static/jarron03.glb",
//     (gltf) => {
//       jarron03 = gltf.scene;
//       applyTexture(jarron03, textureURL, 0.25, 0.5);
//       jarron03.position.sub(new THREE.Vector3(1.75, -0.77, 1.1));
//       scene.add(jarron03);
//     }
//   );

//   function onDocumentTouchStart(event) {
//     const x = event.touches[0].clientX;
//     const y = event.touches[0].clientY;

//     onDocumentMouseMove({ clientX: x, clientY: y });
//   }

//   document.addEventListener("click", onDocumentMouseMove);
//   document.addEventListener("touchstart", onDocumentTouchStart);
// }

// function handleSetControls() {
//   controls = new THREE.OrbitControls(camera, renderer.domElement);
//   camera.position.x = 18;
//   camera.position.y = 6;
//   camera.position.z = 18;
//   controls.enableDamping = true;
//   controls.enableZoom = true;
//   controls.enablePan = true;
//   controls.minPolarAngle = Math.PI / 5;
//   controls.maxPolarAngle = Math.PI / 1.9;
//   controls.minAzimuthAngle = -Math.PI / 10;
//   controls.maxAzimuthAngle = Math.PI / 1.5;
//   controls.minDistance = 1;
//   controls.maxDistance = 16;
// }

// function applyTexture(model, texturePath, metalness, roughness, basic) {
//   const texture = textureLoader.load(texturePath);
//   let material = basic
//     ? new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
//     : new THREE.MeshStandardMaterial({
//         map: texture,
//         side: THREE.DoubleSide,
//       });

//   texture.flipY = false;
//   texture.encoding = THREE.sRGBEncoding;

//   model.traverse((child) => {
//     if (child instanceof THREE.Mesh) {
//       child.material = material;
//       child.material.metalness = metalness;
//       child.material.roughness = roughness;
//     }
//   });
// }

// function showMessage(message, description) {
//   messageTitle.innerText = message;
//   messageDescription.innerText = description;
//   messageC.classList.add("is-visible");
// }

// function onDocumentMouseClick(event) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);
//   const intersects1 = raycaster.intersectObject(lampara, true);

//   if (intersects1.length > 0) {
//     if (!lampara.userData.isClicked) {
//       lampara.userData.isClicked = true;
//       showMessage(
//         "Ceiling Light",
//         " This minimalist ceiling light is a perfect choice for your living room, bedroom, kitchen, dining room, office, restaurant, hotel, bar, etc"
//       );
//       nightMode();
//     } else {
//       lampara.userData.isClicked = false;
//       dayMode();
//     }
//   }
// }

// function onDocumentMouseMove(event) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);

//   const objectsToIntersect = [
//     {
//       object: robot,
//       name: "Robot",
//       description:
//         "Crafted from high-quality steel and finished in a painted silver finish, this clock features a large round clockface which takes up the entire body of the robot.",
//     },
//     {
//       object: sillon,
//       name: "Puff Puff",
//       description:
//         "The design of the Puff Sofa Lite emphasizes its visual appeal while maintaining a soft and comfortable feel.",
//     },
//     {
//       object: silla,
//       name: "Chair",
//       description:
//         "A modern minimalist chair is a chair that is designed to be as simple as possible. This means that it will have few or no extra features, and it will use materials in their most basic form.",
//     },
//     {
//       object: jarron01,
//       name: "Vase No. 1 - Black Night",
//       description:
//         "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
//     },
//     {
//       object: jarron02,
//       name: "Vase No. 2 - Golden Aura",
//       description:
//         "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
//     },
//     {
//       object: jarron03,
//       name: "Vase No. 3 - Silver Vibes",
//       description:
//         "Our Minimal Bud Vases are simple, classy and functional. They are designed for single stem and mini bouquet arrangements.",
//     },
//     { object: book, name: "Book ?", description: "Black book, ... right?" },
//     {
//       object: lamparaBase,
//       name: "Lamp",
//       description:
//         "This beautifully designed color-changing minimalist corner floor lamp fits discreetly and perfectly into corners.",
//     },
//   ];

//   function handleIntersection(object) {
//     const intersects = raycaster.intersectObject(object.object, true);
//     if (intersects.length > 0) {
//       if (!object.object.userData.isHovered) {
//         object.object.userData.isHovered = true;
//         showMessage(object.name, object.description);
//       }
//     } else {
//       object.object.userData.isHovered = false;
//     }
//   }

//   objectsToIntersect.forEach(handleIntersection);
// }

// const lightConfigurations = [
//   { intensity: 1, position: new THREE.Vector3(0, 3, 0) },
//   { intensity: 0.65, position: new THREE.Vector3(-4, 0, -2) },
//   { intensity: 0.65, position: new THREE.Vector3(4, 1, 2) },
//   { intensity: 0.5, position: new THREE.Vector3(0, 0, 3) },
//   { intensity: 0.65, position: new THREE.Vector3(0, 0, -5) },
//   { intensity: 0.5, position: new THREE.Vector3(0, -10, 0) },
// ];

// const lights = [];

// lightConfigurations.forEach((config) => {
//   const light = new THREE.DirectionalLight(globalLight, 3);
//   scene.add(light);
//   light.intensity = config.intensity;
//   light.position.copy(config.position);
//   light.castShadow = true;
//   lights.push(light);
// });

// function handleSetMaterial(path) {
//   const objectsToTraverse = [
//     lampara,
//     room,
//     robot,
//     sillon,
//     silla,
//     jarron01,
//     jarron02,
//     jarron03,
//     book,
//     lamparaBase,
//   ];
//   const texture = textureLoader.load(path);
//   texture.flipY = false;
//   // lampara.traverse(child => {if (child instanceof THREE.Mesh) {child.material.map = texture}})
//   objectsToTraverse.forEach((object) => {
//     object.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material.map = texture;
//       }
//     });
//   });
// }

// function handleSetLights(color) {
//   for (var i = 0; i < lights.length; i++) {
//     lights[i].color.set(color);
//   }
// }

// function nightMode() {
//   document.body.style.setProperty("--bg", "#15293b");
//   handleSetLights("#ffffff");
//   handleSetMaterial(textureNightURL);
// }
// function dayMode() {
//   document.body.style.setProperty("--bg", "#f5e4cf");
//   handleSetLights("#ffffff");
//   handleSetMaterial(textureURL);
// }

// function animate() {
//   requestAnimationFrame(animate);
//   const objectsToRotate = [
//     robot,
//     sillon,
//     silla,
//     jarron01,
//     jarron02,
//     jarron03,
//     book,
//     lamparaBase,
//   ];

//   objectsToRotate.forEach((object) => {
//     if (object && object.userData.isHovered) {
//       object.rotation.y += 0.03;
//     }
//   });

//   controls.update();
//   controls.target.clamp(minPan, maxPan);
//   renderer.render(scene, camera);
// }

// window.addEventListener("resize", () => {
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// messageC.addEventListener("click", () =>
//   messageC.classList.remove("is-visible")
// );

// handleLoadModels();
// handleLoadRoom();
// handleSetControls();
// animate();
// ===============================================

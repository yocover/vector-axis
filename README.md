# vector-axis

#### Threejs based vector axis

This class provides a way to monitor the rotation of the camera in the threejs scene

### Screenshots

![vec.png](file/vec.png)

![1.png](file/1.jpg)

### Installation

```bash
npm install vector-axis
```

### Usage

Reference example

```javascript
var axis = new Axis(camera, controls);
document.body.appendChild(axis.domElement);

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    axis.update();
};

animate();
```

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Axis = factory());
}(this, (function () { 'use strict';

	/**
	 * @author yocover / https://github.com/yocover
	 */
	var Axis = function (camera, controls) {
	    var view = {
	        camera: camera,
	        controls: controls,
	    };

	    var camera = new THREE.PerspectiveCamera(50, 200 / 200, 1, 1000);
	    var renderer = new THREE.WebGLRenderer({
	        alpha: true,
	        antialias: true,
	    });
	    renderer.setSize(200, 200);
	    var scene = new THREE.Scene();

	    var container = document.createElement('div');
	    container.style.cssText =
	        'width: 200px;height: 200px;margin: 1px;padding: 0px;position: absolute;left: 0px;bottom: 0px;z-index: 100;';
	    container.appendChild(renderer.domElement);

	    var objects = [];

	    scene.add(addObject());
	    clickCenterHandler();

	    function addObject() {
	        var length = 70;

	        var dirX = new THREE.Vector3(1, 0, 0);
	        var dirY = new THREE.Vector3(0, 1, 0);
	        var dirZ = new THREE.Vector3(0, 0, 1);

	        dirX.normalize();
	        dirY.normalize();
	        dirZ.normalize();

	        var origin = new THREE.Vector3(0, 0, 0);

	        var group = new THREE.Group();

	        var arrowX = new THREE.ArrowHelper(
	            dirX,
	            origin,
	            length,
	            0xffce41,
	            20,
	            10
	        );
	        var arrowY = new THREE.ArrowHelper(
	            dirY,
	            origin,
	            length,
	            0xdd4337,
	            20,
	            10
	        );
	        var arrowZ = new THREE.ArrowHelper(
	            dirZ,
	            origin,
	            length,
	            0x109d58,
	            20,
	            10
	        );

	        // 颜色由chrome 图标颜色组成
	        var center = new THREE.Mesh(
	            new THREE.SphereBufferGeometry(10, 10, 10),
	            new THREE.MeshBasicMaterial({
	                color: 0x4385f6,
	                transparent: true,
	                opacity: 0.7,
	            })
	        );
	        objects.push(center);
	        center.position.set(0, 0, 0);
	        group.add(center);

	        var textX = createText('x', '#ffce41');
	        textX.position.x = 80;
	        var textY = createText('y', '#dd4337');
	        textY.position.y = 80;
	        var textZ = createText('z', '#109d58');
	        textZ.position.z = 80;

	        group.add(textX);
	        group.add(textY);
	        group.add(textZ);

	        group.add(arrowX);
	        group.add(arrowY);
	        group.add(arrowZ);

	        renderer.setAnimationLoop(function () {
	            textX.rotation.copy(view.camera.rotation);
	            textY.rotation.copy(view.camera.rotation);
	            textZ.rotation.copy(view.camera.rotation);
	        });

	        return group;
	    }

	    function createText(text, color) {
	        var canvas = document.createElement('canvas');
	        canvas.width = 40;
	        canvas.height = 40;

	        var ctx = canvas.getContext('2d');
	        ctx.fillStyle = color || '#ffffff';
	        ctx.font = '35px Microsoft YaHei, sans-serif, Arial';
	        ctx.textBaseline = 'top';
	        ctx.fillText(text, 0, 0);
	        var textAxes = new THREE.Mesh(
	            new THREE.PlaneBufferGeometry(20, 20),
	            new THREE.MeshBasicMaterial({
	                map: new THREE.CanvasTexture(canvas),
	                transparent: true,
	            })
	        );
	        textAxes.scale.set(1.3, 1.3, 1.3);

	        return textAxes;
	    }

	    function clickCenterHandler() {
	        var raycaster = new THREE.Raycaster();
	        var mouse = new THREE.Vector2();

	        renderer.domElement.addEventListener('mousemove', function () {
	            renderer.domElement.style.cursor = 'pointer';
	        });
	        renderer.domElement.addEventListener('click', function (e) {
	            mouse.x = (e.offsetX / 200) * 2 - 1;
	            mouse.x = -(e.offsetY / 200) * 2 + 1;
	            raycaster.setFromCamera(mouse, camera);
	            var intersects = raycaster.intersectObjects(objects);
	            if (intersects.length > 0) {
	                view.controls.target = new THREE.Vector3(0.0);
	            }
	        });
	    }

	    return {
	        domElement: container,

	        update: function () {
	            camera.position.copy(view.camera.position);
	            camera.position.sub(view.controls.target);
	            camera.position.setLength(380);
	            camera.lookAt(scene.position);
	            renderer.render(scene, camera);
	        },
	    };
	};

	return Axis;

})));

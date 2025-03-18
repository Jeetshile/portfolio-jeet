// Define classes first
class CubeDemo {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.animationId = null;
        this.materials = [];
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.rotationSpeed = 0.01;
        this.dragDamping = 0.95;
        this.autoRotateSpeed = 0.003;
        this.hovered = false;
        this.scale = 1;
        this.targetScale = 1;
        this.pulseSpeed = 0.02;
        this.pulseAmount = 0.1;
        this.colorTransitionSpeed = 0.03;
        this.currentColorIndex = 0;
        this.targetColorIndex = 0;
        this.movementThreshold = 0.01;
        this.lastRotationX = 0;
        this.lastRotationY = 0;
        this.colorPalette = [
            0xff3366, 0x00ff99, 0x3366ff, 0xffcc00, 0xff00ff, 0x00ffff,
            0xff6600, 0x00ff00, 0x6600ff, 0xffff00, 0xff0066, 0x00ffcc,
            0xff1493, 0x00bfff, 0xff4500, 0x32cd32, 0xff69b4, 0x00fa9a
        ];
        this.hoverScale = 1.2;
        this.hoverShininess = 150;
        this.lightIntensity = 1.5;
        console.log('CubeDemo instance created');
    }

    init() {
        try {
            console.log('Initializing cube demo...');
            
            // Create scene with gradient background
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000); // Black background
            
            // Create camera with better positioning
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.container.clientWidth / this.container.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 6;

            // Create renderer with enhanced quality
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(
                this.container.clientWidth,
                this.container.clientHeight
            );
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.container.innerHTML = '';
            this.container.appendChild(this.renderer.domElement);

            // Enable enhanced shadows
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.outputEncoding = THREE.sRGBEncoding;

            // Create cube with enhanced materials
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            
            // Create materials with dynamic color scheme
            this.materials = this.colorPalette.slice(0, 6).map(color => 
                new THREE.MeshPhongMaterial({ 
                    color: color,
                    shininess: 100,
                    specular: 0x888888,
                    flatShading: true,
                    emissive: 0x000000,
                    emissiveIntensity: 0
                })
            );
            
            // Create cube with materials
            this.cube = new THREE.Mesh(geometry, this.materials);
            this.cube.castShadow = true;
            this.cube.receiveShadow = true;
            this.scene.add(this.cube);

            // Enhanced lighting setup
            const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
            mainLight.position.set(1, 1, 1);
            mainLight.castShadow = true;
            mainLight.shadow.mapSize.width = 2048;
            mainLight.shadow.mapSize.height = 2048;
            mainLight.shadow.camera.near = 0.5;
            mainLight.shadow.camera.far = 50;
            mainLight.shadow.camera.left = -10;
            mainLight.shadow.camera.right = 10;
            mainLight.shadow.camera.top = 10;
            mainLight.shadow.camera.bottom = -10;
            this.scene.add(mainLight);
            
            // Add dynamic colored lights
            this.pointLights = [
                new THREE.PointLight(0xff3366, 1.0, 10),
                new THREE.PointLight(0x00ff99, 1.0, 10),
                new THREE.PointLight(0x3366ff, 1.0, 10),
                new THREE.PointLight(0xffcc00, 1.0, 10)
            ];
            
            this.pointLights.forEach((light, index) => {
                light.position.set(
                    Math.cos(index * Math.PI * 2 / 4) * 4,
                    Math.sin(index * Math.PI * 2 / 4) * 4,
                    2
                );
                this.scene.add(light);
            });
            
            // Add ambient light
            this.scene.add(new THREE.AmbientLight(0x404040, 0.8));

            // Add mouse interaction
            this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.container.addEventListener('mousedown', (event) => this.onMouseDown(event));
            this.container.addEventListener('mouseup', () => this.onMouseUp());
            this.container.addEventListener('mouseleave', () => this.onMouseUp());
            this.container.addEventListener('touchstart', (event) => this.onTouchStart(event));
            this.container.addEventListener('touchmove', (event) => this.onTouchMove(event));
            this.container.addEventListener('touchend', () => this.onMouseUp());

            // Add hover effect
            this.container.addEventListener('mouseenter', () => this.onMouseEnter());
            this.container.addEventListener('mouseleave', () => this.onMouseLeave());

            // Add click handler for color change
            this.container.addEventListener('click', () => this.changeColors());

            // Start animation
            this.animate();
            
            // Add resize handler
            window.addEventListener('resize', () => this.onResize());
            
            // Mark as loaded
            this.container.classList.add('loaded');
            console.log('Cube demo initialized successfully');
            
            // Show quotes if available
            if (typeof window.showRandomQuote === 'function') {
                window.showRandomQuote('cube-quotes');
            }
        } catch (error) {
            console.error('Error initializing cube demo:', error);
            this.container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error initializing cube demo</p>';
        }
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update target rotation based on mouse position
        this.targetRotationY = x * this.rotationSpeed;
        this.targetRotationX = y * this.rotationSpeed;

        // Update light positions based on mouse
        this.pointLights.forEach((light, index) => {
            light.position.x = Math.cos(this.time * 0.5 + index * Math.PI * 2 / 4 + x) * 4;
            light.position.y = Math.sin(this.time * 0.5 + index * Math.PI * 2 / 4 + y) * 4;
        });

        // Change color based on movement
        if (Math.abs(this.targetRotationX - this.lastRotationX) > this.movementThreshold ||
            Math.abs(this.targetRotationY - this.lastRotationY) > this.movementThreshold) {
            this.targetColorIndex = (this.targetColorIndex + 1) % this.colorPalette.length;
        }

        this.lastRotationX = this.targetRotationX;
        this.lastRotationY = this.targetRotationY;
    }

    onMouseDown(event) {
        this.isDragging = true;
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.isDragging = true;
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.container.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            this.targetRotationY = x * this.rotationSpeed;
            this.targetRotationX = y * this.rotationSpeed;

            this.previousMousePosition = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }

    onMouseEnter() {
        this.hovered = true;
        this.targetScale = this.hoverScale;
        if (this.cube) {
            this.cube.material.forEach(material => {
                material.shininess = this.hoverShininess;
                material.specular.setHex(0xaaaaaa);
                material.emissiveIntensity = 0.3;
            });
        }
    }

    onMouseLeave() {
        this.hovered = false;
        this.targetScale = 1;
        if (this.cube) {
            this.cube.material.forEach(material => {
                material.shininess = 100;
                material.specular.setHex(0x888888);
                material.emissiveIntensity = 0;
            });
        }
    }

    changeColors() {
        this.targetColorIndex = (this.targetColorIndex + 1) % this.colorPalette.length;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        if (this.cube) {
            // Enhanced rotation logic
            if (!this.isDragging) {
                this.targetRotationY += this.autoRotateSpeed;
                this.targetRotationX = Math.sin(this.time * 0.2) * 0.1;
            }
            
            // Apply smooth rotation with damping
            this.cube.rotation.x += (this.targetRotationX - this.cube.rotation.x) * this.dragDamping;
            this.cube.rotation.y += (this.targetRotationY - this.cube.rotation.y) * this.dragDamping;

            // Change color based on rotation
            if (Math.abs(this.cube.rotation.x - this.lastRotationX) > this.movementThreshold ||
                Math.abs(this.cube.rotation.y - this.lastRotationY) > this.movementThreshold) {
                this.targetColorIndex = (this.targetColorIndex + 1) % this.colorPalette.length;
            }

            this.lastRotationX = this.cube.rotation.x;
            this.lastRotationY = this.cube.rotation.y;

            // Smooth scale animation
            this.scale += (this.targetScale - this.scale) * 0.1;
            this.cube.scale.set(this.scale, this.scale, this.scale);

            // Add subtle pulse effect
            const pulseScale = 1 + Math.sin(this.time * this.pulseSpeed) * this.pulseAmount;
            this.cube.scale.multiplyScalar(pulseScale);

            // Animate point lights
            this.pointLights.forEach((light, index) => {
                light.intensity = 1.0 + Math.sin(this.time * 0.5 + index) * 0.3;
                // Change light colors based on movement
                const colorIndex = (this.targetColorIndex + index) % this.colorPalette.length;
                light.color.setHex(this.colorPalette[colorIndex]);
            });

            // Color transition with movement-based changes
            this.currentColorIndex += (this.targetColorIndex - this.currentColorIndex) * this.colorTransitionSpeed;
            this.materials.forEach((material, index) => {
                const currentColor = new THREE.Color(this.colorPalette[Math.floor(this.currentColorIndex)]);
                const nextColor = new THREE.Color(this.colorPalette[Math.ceil(this.currentColorIndex) % this.colorPalette.length]);
                const t = this.currentColorIndex % 1;
                material.color.lerpColors(currentColor, nextColor, t);
            });
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        }
    }
}

class WaveDemo {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.points = null;
        this.animationId = null;
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.rotationSpeed = 0.006;
        this.rotationDamping = 0.97;
        this.particleCount = 8000;
        this.gridSize = 80;
        this.waveSpeed = 0.015;
        this.waveAmplitude = 2.0;
        this.mouseInfluence = 0.5;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.autoRotateSpeed = 0.001;
        this.colorScheme = {
            primary: 0x00bfff,
            secondary: 0x00ff7f,
            accent: 0xff69b4,
            ocean: 0x1e90ff,
            coral: 0xff7f50,
            turquoise: 0x40e0d0
        };
        console.log('WaveDemo instance created');
    }

    init() {
        try {
            console.log('Initializing wave demo...');
            
            // Create scene with gradient background
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000); // Black background
            
            // Create camera with better positioning
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.container.clientWidth / this.container.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 20;

            // Create renderer with enhanced quality
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(
                this.container.clientWidth,
                this.container.clientHeight
            );
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.container.innerHTML = '';
            this.container.appendChild(this.renderer.domElement);

            // Enable enhanced shadows
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.outputEncoding = THREE.sRGBEncoding;

            // Create particle system
            this.createWaveParticles();

            // Add mouse interaction
            this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.container.addEventListener('mousedown', (event) => this.onMouseDown(event));
            this.container.addEventListener('mouseup', () => this.onMouseUp());
            this.container.addEventListener('mouseleave', () => this.onMouseUp());
            this.container.addEventListener('touchstart', (event) => this.onTouchStart(event));
            this.container.addEventListener('touchmove', (event) => this.onTouchMove(event));
            this.container.addEventListener('touchend', () => this.onMouseUp());

            // Start animation
            this.animate();
            
            // Add resize handler
            window.addEventListener('resize', () => this.onResize());
            
            // Mark as loaded
            this.container.classList.add('loaded');
            console.log('Wave demo initialized successfully');
            
            // Show quotes if available
            if (typeof window.showRandomQuote === 'function') {
                window.showRandomQuote('wave-quotes');
            }
        } catch (error) {
            console.error('Error initializing wave demo:', error);
            this.container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error initializing wave demo</p>';
        }
    }

    createWaveParticles() {
        const geometry = new THREE.BufferGeometry();
        
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        for (let i = 0; i < this.particleCount; i++) {
            const ix = i % this.gridSize;
            const iy = Math.floor(i / this.gridSize);
            
            const x = (ix / this.gridSize - 0.5) * 60;
            const y = 0;
            const z = (iy / this.gridSize - 0.5) * 60;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Enhanced color gradient with multiple colors
            const distance = Math.sqrt(x * x + z * z);
            const hue = (distance / 30) % 1;
            const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Smaller, more varied particle sizes
            sizes[i] = Math.random() * 0.15 + 0.05;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Enhanced shader material with sea-like waves
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mousePosition: { value: new THREE.Vector2(0, 0) },
                colorA: { value: new THREE.Color(this.colorScheme.primary) },
                colorB: { value: new THREE.Color(this.colorScheme.secondary) },
                colorC: { value: new THREE.Color(this.colorScheme.accent) }
            },
            vertexShader: `
                attribute float size;
                uniform float time;
                uniform vec2 mousePosition;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // Sea-like wave animation with multiple frequencies
                    float wave = sin(pos.x * 0.1 + time) * 2.0;
                    wave += sin(pos.z * 0.1 + time * 0.8) * 1.5;
                    wave += sin((pos.x + pos.z) * 0.05 + time * 0.4) * 1.0;
                    wave += sin(pos.x * 0.05 + pos.z * 0.05 + time * 0.2) * 0.5;
                    
                    // Improved mouse influence with ripple effect
                    float dist = length(vec2(pos.x, pos.z) - mousePosition);
                    float mouseInfluence = smoothstep(20.0, 0.0, dist);
                    wave += sin(dist * 0.1 - time * 2.0) * mouseInfluence * 0.5;
                    
                    // Add some randomness to wave height
                    wave *= (1.0 + sin(pos.x * 0.2 + pos.z * 0.2) * 0.1);
                    
                    pos.y = wave;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform vec3 colorC;
                
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
                    
                    // Enhanced color blending
                    vec3 finalColor = mix(colorA, colorB, vColor.x);
                    finalColor = mix(finalColor, colorC, vColor.y);
                    finalColor = mix(finalColor, vColor, 0.3);
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true
        });
        
        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = this.container.getBoundingClientRect();
        this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update target rotation based on mouse position
        this.targetRotationY = this.mouseX * this.mouseInfluence;
        this.targetRotationX = this.mouseY * this.mouseInfluence;
    }

    onMouseDown(event) {
        this.isDragging = true;
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.isDragging = true;
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            this.targetRotationY = this.mouseX * this.mouseInfluence;
            this.targetRotationX = this.mouseY * this.mouseInfluence;

            this.previousMousePosition = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.time += this.waveSpeed;
        
        if (this.points && this.points.material.uniforms) {
            // Update shader uniforms
            this.points.material.uniforms.time.value = this.time;
            this.points.material.uniforms.mousePosition.value.set(
                this.mouseX * 30,
                this.mouseY * 30
            );
            
            // Auto-rotation when not dragging
            if (!this.isDragging) {
                this.targetRotationY += this.autoRotateSpeed;
            }

            // Apply smooth rotation with damping
            this.points.rotation.x += (this.targetRotationX - this.points.rotation.x) * this.rotationDamping;
            this.points.rotation.y += (this.targetRotationY - this.points.rotation.y) * this.rotationDamping;
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        }
    }
}

// Initialize after classes are defined
// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded! Please check your script inclusion.');
    document.querySelectorAll('.canvas-container').forEach(container => {
        container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error: Three.js library failed to load</p>';
    });
} else {
    console.log('Three.js is loaded, initializing demos...');
    
    // Initialize demos immediately
    const cubeContainer = document.getElementById('cube-container');
    if (cubeContainer) {
        console.log('Found cube container, initializing...');
        const cubeDemo = new CubeDemo(cubeContainer);
        cubeDemo.init();
    } else {
        console.error('Cube container not found');
    }

    const waveContainer = document.getElementById('wave-container');
    if (waveContainer) {
        console.log('Found wave container, initializing...');
        const waveDemo = new WaveDemo(waveContainer);
        waveDemo.init();
    } else {
        console.error('Wave container not found');
    }
} 
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
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        console.log('CubeDemo instance created');
    }

    init() {
        try {
            console.log('Initializing cube demo...');
            
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.container.clientWidth / this.container.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;

            // Create renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(
                this.container.clientWidth,
                this.container.clientHeight
            );
            this.container.innerHTML = ''; // Clear any existing content
            this.container.appendChild(this.renderer.domElement);

            // Create colorful cube
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            
            // Create materials with different colors for each face
            this.materials = [
                new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 }), // Red (right)
                new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 }), // Green (left)
                new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 }), // Blue (top)
                new THREE.MeshPhongMaterial({ color: 0xffff00, shininess: 100 }), // Yellow (bottom)
                new THREE.MeshPhongMaterial({ color: 0xff00ff, shininess: 100 }), // Magenta (front)
                new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 100 })  // Cyan (back)
            ];
            
            // Create cube with materials
            this.cube = new THREE.Mesh(geometry, this.materials);
            this.scene.add(this.cube);

            // Add surrounding particles
            this.addParticles();

            // Add lights
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1);
            this.scene.add(light);
            
            // Add a second light from another angle
            const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
            light2.position.set(-1, -1, -1);
            this.scene.add(light2);
            
            // Add ambient light
            this.scene.add(new THREE.AmbientLight(0x404040));

            // Add mouse interaction
            this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.container.addEventListener('touchmove', (event) => this.onTouchMove(event));
            this.container.addEventListener('mouseout', () => {
                // Reset to auto-rotation when mouse leaves
                this.targetRotationX = 0;
                this.targetRotationY = 0;
            });

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

    addParticles() {
        // Create particles around the cube
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 200;
        const posArray = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position particles in a sphere around the cube
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);
            
            // Random colors for particles
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        
        this.mouseX = (relX / this.container.clientWidth) * 2 - 1;
        this.mouseY = -(relY / this.container.clientHeight) * 2 + 1;
        
        // Set target rotation based on mouse position
        this.targetRotationY = this.mouseX * 2;
        this.targetRotationX = this.mouseY * 2;
    }

    onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.container.getBoundingClientRect();
            const relX = touch.clientX - rect.left;
            const relY = touch.clientY - rect.top;
            
            this.mouseX = (relX / this.container.clientWidth) * 2 - 1;
            this.mouseY = -(relY / this.container.clientHeight) * 2 + 1;
            
            // Set target rotation based on touch position
            this.targetRotationY = this.mouseX * 2;
            this.targetRotationX = this.mouseY * 2;
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        if (this.cube) {
            // Smooth rotation towards target (mouse-controlled or auto)
            if (Math.abs(this.mouseX) < 0.01 && Math.abs(this.mouseY) < 0.01) {
                // Auto-rotation when no mouse input
                this.cube.rotation.x += 0.01;
                this.cube.rotation.y += 0.01;
            } else {
                // Mouse-controlled rotation
                this.cube.rotation.x += (this.targetRotationX - this.cube.rotation.x) * 0.05;
                this.cube.rotation.y += (this.targetRotationY - this.cube.rotation.y) * 0.05;
            }
            
            // Animate colors for extra visual appeal
            if (this.materials && this.materials.length === 6) {
                // Shift hue of each face over time
                for (let i = 0; i < this.materials.length; i++) {
                    const hue = (this.time * 0.1 + i / 6) % 1;
                    const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
                    this.materials[i].color = color;
                }
            }
        }
        
        // Animate particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const colors = this.particles.geometry.attributes.color.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Make particles orbit around the cube
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];
                
                const angle = this.time * 0.2;
                const radius = Math.sqrt(x * x + z * z);
                
                positions[i] = Math.cos(angle + i * 0.01) * radius;
                positions[i + 2] = Math.sin(angle + i * 0.01) * radius;
                
                // Pulse colors
                const colorIndex = Math.floor(i / 3);
                const hue = (this.time * 0.1 + colorIndex * 0.01) % 1;
                const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
                
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.geometry.attributes.color.needsUpdate = true;
            
            // Rotate the entire particle system
            this.particles.rotation.y += 0.002;
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
        console.log('WaveDemo instance created');
    }

    init() {
        try {
            console.log('Initializing wave demo...');
            
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.container.clientWidth / this.container.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 15;

            // Create renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(
                this.container.clientWidth,
                this.container.clientHeight
            );
            this.container.innerHTML = ''; // Clear any existing content
            this.container.appendChild(this.renderer.domElement);

            // Create enhanced particle system
            this.createWaveParticles();

            // Add mouse interaction
            this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.container.addEventListener('touchmove', (event) => this.onTouchMove(event));

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
        const particleCount = 3000;
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const width = 30;
        const height = 30;
        
        for (let i = 0; i < particleCount; i++) {
            // Position particles in a grid pattern
            const ix = i % width;
            const iy = Math.floor(i / width);
            
            const x = (ix / width - 0.5) * 20;
            const y = 0; // Will be animated
            const z = (iy / height - 0.5) * 20;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Color gradient based on position
            const hue = (x + 10) / 20; // 0 to 1 based on x position
            const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Random sizes for particles
            sizes[i] = Math.random() * 0.1 + 0.05;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create shader material for better-looking particles
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pointTexture: { value: this.createParticleTexture() }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // Calculate wave height
                    float wave = sin(pos.x * 0.3 + time) * cos(pos.z * 0.3 + time) * 2.0;
                    pos.y = wave;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform sampler2D pointTexture;
                
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                    if (gl_FragColor.a < 0.1) discard;
                }
            `,
            transparent: true,
            vertexColors: true
        });
        
        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }
    
    createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        
        this.mouseX = (relX / this.container.clientWidth) * 2 - 1;
        this.mouseY = -(relY / this.container.clientHeight) * 2 + 1;
    }

    onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.container.getBoundingClientRect();
            const relX = touch.clientX - rect.left;
            const relY = touch.clientY - rect.top;
            
            this.mouseX = (relX / this.container.clientWidth) * 2 - 1;
            this.mouseY = -(relY / this.container.clientHeight) * 2 + 1;
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.time += 0.05;
        
        if (this.points && this.points.material.uniforms) {
            // Update time uniform for wave animation
            this.points.material.uniforms.time.value = this.time;
            
            // Apply mouse influence to rotation
            this.points.rotation.x = this.mouseY * 0.2;
            this.points.rotation.y = this.mouseX * 0.2;
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
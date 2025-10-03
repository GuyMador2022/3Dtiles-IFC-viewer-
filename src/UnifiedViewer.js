import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'web-ifc-three';
import ThreeDTilesLoader from './loaders/ThreeDTilesLoader.js';

export default class UnifiedViewer {
    constructor() {
        console.log('🏗️ Building Unified Viewer...');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        
        // Canvas setup
        this.canvas = document.getElementById('renderCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.camera.position.set(50, 50, 50);
        
        // Controls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Lighting
        this.setupLighting();
        
        // IFC Loader
        this.ifcLoader = new IFCLoader();
        this.ifcModels = [];
        
        // 3D Tiles Loader
        this.tilesLoader = new ThreeDTilesLoader(this.scene);
        
        // State
        this.firstPersonMode = false;
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start animation loop
        this.animate();
        
        console.log('✅ Unified Viewer ready');
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Hemisphere light for better outdoor scenes
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
        hemiLight.position.set(0, 200, 0);
        this.scene.add(hemiLight);
    }
    
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // File input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (event) => this.handleFileUpload(event));
        }
    }
    
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        console.log('📁 Loading file:', file.name);
        
        try {
            if (file.name.endsWith('.ifc')) {
                await this.loadIFC(file);
            } else if (file.name.endsWith('.json')) {
                await this.load3DTiles(file);
            } else {
                console.warn('Unsupported file type:', file.name);
            }
        } catch (error) {
            console.error('Error loading file:', error);
        }
    }
    
    async loadIFC(file) {
        console.log('🏗️ Loading IFC file...');
        
        const url = URL.createObjectURL(file);
        
        try {
            const ifcModel = await this.ifcLoader.loadAsync(url);
            console.log('✅ IFC model loaded:', ifcModel);
            
            this.scene.add(ifcModel);
            this.ifcModels.push(ifcModel);
            
            // Center camera on model
            this.centerCameraOnModel(ifcModel);
            
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('❌ Error loading IFC:', error);
            URL.revokeObjectURL(url);
            throw error;
        }
    }
    
    async load3DTiles(file) {
        console.log('🌐 Loading 3D Tiles...');
        // Implementation would go here
        console.warn('3D Tiles loading not fully implemented yet');
    }
    
    async loadS3Tiles() {
        console.log('☁️ Loading S3 Tiles...');
        // Prompt for URL
        const url = prompt('Enter 3D Tiles tileset.json URL:');
        if (!url) return;
        
        try {
            await this.tilesLoader.load(url);
            console.log('✅ 3D Tiles loaded from S3');
        } catch (error) {
            console.error('❌ Error loading S3 tiles:', error);
        }
    }
    
    centerCameraOnModel(model) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        const distance = cameraZ * 2.5;
        
        this.camera.position.set(
            center.x + distance,
            center.y + distance,
            center.z + distance
        );
        this.camera.lookAt(center);
        this.controls.target.copy(center);
        this.controls.update();
    }
    
    // IFC Methods
    setIfcOpacity(value) {
        const opacity = parseFloat(value);
        console.log('Setting IFC opacity:', opacity);
        
        this.ifcModels.forEach(model => {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => {
                            mat.transparent = opacity < 1;
                            mat.opacity = opacity;
                        });
                    } else {
                        child.material.transparent = opacity < 1;
                        child.material.opacity = opacity;
                    }
                }
            });
        });
        
        // Update display
        const displayElement = document.getElementById('ifcOpacityValue');
        if (displayElement) {
            displayElement.textContent = `${Math.round(opacity * 100)}%`;
        }
    }
    
    setIFCColorMode(mode) {
        console.log('Setting IFC color mode:', mode);
        // Implementation would color elements by type, floor, etc.
    }
    
    toggleIfcProperties() {
        console.log('Toggle IFC properties panel');
        // Implementation would show/hide properties panel
    }
    
    ifcMeasureTool() {
        console.log('Activating IFC measure tool');
        // Implementation would enable measurement mode
    }
    
    toggleTransparencyOverlay() {
        console.log('Toggle transparency overlay');
        // Implementation would toggle x-ray mode
    }
    
    showNavigationHelp() {
        console.log('Show navigation help');
        const helpDialog = document.getElementById('fpvHelpDialog');
        if (helpDialog) {
            helpDialog.style.display = 'flex';
        }
    }
    
    clearMeasurements() {
        console.log('Clear measurements');
        // Implementation would remove measurement objects
    }
    
    ifcScreenshot() {
        console.log('Taking screenshot');
        const dataURL = this.renderer.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `screenshot-${Date.now()}.png`;
        link.href = dataURL;
        link.click();
    }
    
    ifcExportJSON() {
        console.log('Exporting JSON');
        // Implementation would export IFC data as JSON
    }
    
    ifcStoreyView() {
        console.log('IFC storey view');
        // Implementation would show floor selection
    }
    
    toggleSectionMode() {
        console.log('Toggle section mode');
        // Implementation would enable section planes
    }
    
    // 3D Tiles Methods
    setTilesOpacity(value) {
        const opacity = parseFloat(value);
        console.log('Setting tiles opacity:', opacity);
        this.tilesLoader.setOpacity(opacity);
        
        const displayElement = document.getElementById('tilesOpacityValue');
        if (displayElement) {
            displayElement.textContent = `${Math.round(opacity * 100)}%`;
        }
    }
    
    setTilesLOD(value) {
        const lod = parseInt(value);
        console.log('Setting tiles LOD:', lod);
        this.tilesLoader.setLOD(lod);
    }
    
    setTilesHeight(value) {
        const height = parseFloat(value);
        console.log('Setting tiles height:', height);
        this.tilesLoader.setHeight(height);
    }
    
    centerCameraOnTiles() {
        console.log('Center camera on tiles');
        this.tilesLoader.centerCamera(this.camera, this.controls);
    }
    
    tilesWireframe() {
        console.log('Toggle tiles wireframe');
        this.tilesLoader.toggleWireframe();
    }
    
    tilesAnalyze() {
        console.log('Analyze tiles');
        // Implementation would show statistics
    }
    
    tilesExportKML() {
        console.log('Export KML');
        // Implementation would export to KML format
    }
    
    tilesShare() {
        console.log('Share tiles');
        // Implementation would generate shareable link
    }
    
    // Camera and Navigation Methods
    resetCameraView() {
        console.log('Reset camera view');
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    toggleFirstPersonMode() {
        console.log('Toggle first person mode');
        this.firstPersonMode = !this.firstPersonMode;
        
        if (this.firstPersonMode) {
            this.canvas.classList.add('fpv-mode');
            // Implementation would enable WASD controls
        } else {
            this.canvas.classList.remove('fpv-mode');
            this.canvas.classList.remove('fpv-locked');
        }
    }
    
    // Animation loop
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Update tiles if loaded
        if (this.tilesLoader) {
            this.tilesLoader.update(this.camera);
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

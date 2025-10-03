import * as THREE from 'three';

export default class ThreeDTilesLoader {
    constructor(scene) {
        this.scene = scene;
        this.tilesGroup = new THREE.Group();
        this.tilesGroup.name = '3DTiles';
        this.scene.add(this.tilesGroup);
        
        this.tiles = [];
        this.opacity = 1.0;
        this.wireframe = false;
    }
    
    async load(url) {
        console.log('🌐 Loading 3D Tiles from:', url);
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const tileset = await response.json();
            console.log('📦 Tileset loaded:', tileset);
            
            // Parse and load the tileset
            await this.loadTileset(tileset, url);
            
            console.log('✅ 3D Tiles loaded successfully');
        } catch (error) {
            console.error('❌ Error loading 3D Tiles:', error);
            throw error;
        }
    }
    
    async loadTileset(tileset, baseUrl) {
        // Simple implementation - would need full 3D Tiles spec support
        console.log('Loading tileset structure...');
        
        if (tileset.root) {
            const baseUrlDir = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
            await this.loadTile(tileset.root, baseUrlDir);
        }
    }
    
    async loadTile(tile, baseUrl) {
        // Load tile content if available
        if (tile.content && tile.content.uri) {
            try {
                const tileUrl = baseUrl + tile.content.uri;
                console.log('Loading tile:', tileUrl);
                
                // For B3DM files, we'd need a special loader
                // This is a simplified placeholder
                const response = await fetch(tileUrl);
                const buffer = await response.arrayBuffer();
                
                // Parse B3DM or other tile formats
                // This would require full implementation
                console.log('Tile data loaded:', buffer.byteLength, 'bytes');
            } catch (error) {
                console.error('Error loading tile content:', error);
            }
        }
        
        // Load children recursively if present
        if (tile.children && Array.isArray(tile.children)) {
            for (const child of tile.children) {
                await this.loadTile(child, baseUrl);
            }
        }
    }
    
    setOpacity(opacity) {
        this.opacity = opacity;
        this.tilesGroup.traverse((child) => {
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
    }
    
    setLOD(level) {
        console.log('Setting LOD level:', level);
        // Implementation would adjust level of detail
    }
    
    setHeight(height) {
        this.tilesGroup.position.y = height;
    }
    
    centerCamera(camera, controls) {
        const box = new THREE.Box3().setFromObject(this.tilesGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        const distance = cameraZ * 2.5;
        
        camera.position.set(
            center.x + distance,
            center.y + distance,
            center.z + distance
        );
        camera.lookAt(center);
        controls.target.copy(center);
        controls.update();
    }
    
    toggleWireframe() {
        this.wireframe = !this.wireframe;
        this.tilesGroup.traverse((child) => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        mat.wireframe = this.wireframe;
                    });
                } else {
                    child.material.wireframe = this.wireframe;
                }
            }
        });
    }
    
    update(camera) {
        // Update logic for dynamic LOD, culling, etc.
        // Would be implemented based on 3D Tiles specification
    }
}

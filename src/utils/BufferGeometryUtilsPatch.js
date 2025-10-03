// Patch for BufferGeometryUtils to support web-ifc-three with modern Three.js
import * as THREE from 'three';

/**
 * Merge multiple geometries into a single geometry
 * This is a compatibility function for web-ifc-three which expects mergeGeometries
 */
export function mergeGeometries(geometries, useGroups = false) {
    console.log('⚠️ Using BufferGeometryUtils patch - mergeGeometries');
    
    if (!geometries || geometries.length === 0) {
        return null;
    }
    
    // Use Three.js BufferGeometryUtils if available (older versions)
    if (THREE.BufferGeometryUtils && THREE.BufferGeometryUtils.mergeGeometries) {
        return THREE.BufferGeometryUtils.mergeGeometries(geometries, useGroups);
    }
    
    // Fallback implementation for newer Three.js versions
    // This is a simplified version - for production use a proper implementation
    const mergedGeometry = new THREE.BufferGeometry();
    
    // Collect all attributes
    const attributes = {};
    const morphAttributes = {};
    let morphTargetsRelative = false;
    
    for (const geometry of geometries) {
        if (!geometry || !geometry.attributes) continue;
        
        // Merge attributes
        for (const name in geometry.attributes) {
            if (!attributes[name]) {
                attributes[name] = [];
            }
            attributes[name].push(geometry.attributes[name]);
        }
        
        // Merge morph attributes
        for (const name in geometry.morphAttributes) {
            if (!morphAttributes[name]) {
                morphAttributes[name] = [];
            }
            morphAttributes[name].push(geometry.morphAttributes[name]);
        }
        
        if (geometry.morphTargetsRelative) {
            morphTargetsRelative = true;
        }
    }
    
    // Set merged attributes
    for (const name in attributes) {
        const mergedAttribute = mergeAttributes(attributes[name]);
        if (mergedAttribute) {
            mergedGeometry.setAttribute(name, mergedAttribute);
        }
    }
    
    // Set morph attributes
    for (const name in morphAttributes) {
        const mergedMorphAttribute = mergeAttributes(morphAttributes[name].flat());
        if (mergedMorphAttribute) {
            mergedGeometry.morphAttributes[name] = [mergedMorphAttribute];
        }
    }
    
    mergedGeometry.morphTargetsRelative = morphTargetsRelative;
    
    return mergedGeometry;
}

function mergeAttributes(attributes) {
    if (!attributes || attributes.length === 0) return null;
    
    let arrayLength = 0;
    let itemSize = attributes[0].itemSize;
    let normalized = attributes[0].normalized;
    let arrayConstructor = attributes[0].array.constructor;
    
    // Calculate total length
    for (const attribute of attributes) {
        arrayLength += attribute.array.length;
    }
    
    const array = new arrayConstructor(arrayLength);
    let offset = 0;
    
    // Copy all attribute arrays
    for (const attribute of attributes) {
        array.set(attribute.array, offset);
        offset += attribute.array.length;
    }
    
    return new THREE.BufferAttribute(array, itemSize, normalized);
}

// Export for compatibility
export const BufferGeometryUtils = {
    mergeGeometries
};

export default BufferGeometryUtils;

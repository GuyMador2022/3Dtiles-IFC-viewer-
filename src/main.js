import './styles.css';
import UnifiedViewer from './UnifiedViewer.js';

let unifiedViewer = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Unified Viewer...');
    
    try {
        unifiedViewer = new UnifiedViewer();
        
        // חשיפה גלובלית
        window.unifiedViewer = unifiedViewer;
        window.UnifiedViewer = UnifiedViewer;
        
        console.log('✅ Unified Viewer initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Unified Viewer:', error);
    }
});

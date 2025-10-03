export default class DataLoader {
    constructor(viewer) {
        this.viewer = viewer;
    }
    
    async loadFromURL(url, type) {
        console.log(`📊 Loading ${type} data from:`, url);
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Data loaded:', data);
            
            return data;
        } catch (error) {
            console.error('❌ Error loading data:', error);
            throw error;
        }
    }
    
    async loadFile(file) {
        console.log('📁 Loading file:', file.name);
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            
            reader.readAsText(file);
        });
    }
}

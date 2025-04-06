// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize Hydra
        const hydra = new Hydra({
            detectAudio: false,
            autoLoop: true,
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Set Hydra resolution
        setResolution(window.innerWidth, window.innerHeight);

        // Create a more interesting Hydra texture for the cube
        osc(4, 0.3, 1.2)
            .modulate(noise(0, 5, 0, 5).add(gradient(1)), 5)
            .color(3.0, 0.7, 0.4)
            .saturate(4)
            .colorama(0.2)
            .kaleid(1)
            .modulateRepeatX(osc(4), 5.0, ({time}) => Math.sin(time) * 1)
            .out(o0);

        // Global variable to hold the p5 canvas and texture
        let p5canvas;
        let hydraTexture;
        
        // Create a separate container for p5
        const p5Container = document.createElement('div');
        p5Container.id = 'p5-container';
        document.body.appendChild(p5Container);
        
        // Get the Hydra canvas element for later use as a texture
        const hydraCanvas = document.querySelector('canvas');
        
        // p5 sketch definition
        const sketch = p => {
            p.setup = () => {
                // Create the p5 canvas as a child of the container
                p5canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
                p5canvas.parent('p5-container');
                p.angleMode(p.DEGREES);
                
                // Hide the Hydra canvas since we're using it as a texture
                hydraCanvas.style.display = 'none';
                
                // Make the background of p5 transparent
                p.clear();
            };
            
            p.preload = () => {
                // Create an empty graphics buffer to later receive the Hydra texture
                hydraTexture = p.createGraphics(p.windowWidth, p.windowHeight);
            };

            p.draw = () => {
                // Clear the canvas with each frame
                p.clear();
                
                // Update texture from Hydra canvas
                hydraTexture.drawingContext.drawImage(hydraCanvas, 0, 0, p.width, p.height);
                
                // Enable ambient and directional lighting for better 3D effect
                p.ambientLight(60, 60, 60);
                p.directionalLight(255, 255, 255, 0, 0, -1);
                
                // Rotate the cube
                p.rotateX(p.frameCount / 4);
                p.rotateZ(p.frameCount / 2);
                
                // Draw the cube with Hydra texture
                p.noStroke();
                p.texture(hydraTexture);
                p.box(500);
                
                // Add a wireframe on top of the textured cube for definition
                p.stroke(255);
                p.strokeWeight(1);
                p.noFill();
                p.box(402); // Slightly larger to avoid z-fighting
            };
        };

        // Create a new p5 instance with the sketch
        new p5(sketch);
        
    } catch (error) {
        console.error('Error initializing Hydra:', error);
    }
}); 
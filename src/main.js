const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#1d1d1d',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0, x: 0.1 },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: {
        preload: function () {
        },
        create: function () {
            // Calculate center coordinates
            let centerX = this.cameras.main.centerX;
            let centerY = this.cameras.main.centerY;
            let startY = this.cameras.main.height + 50;
        
            // Display the welcome text
            this.add.text(centerX, centerY / 2, 'Welcome to SkillRocket!!!', {
                fontSize: '48px',
                fontFamily: 'poppins',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5); // Center the text horizontally and vertically
        
            // Define button properties
            const buttonTextContent = 'Click Here';
            const buttonFontSize = 32;
            const buttonPaddingX = 20;
            const buttonPaddingY = 10;
            const borderRadius = 16;
            const borderWidth = 1;
            const borderColor = 0x000000; // Black
            const fillColor = 0x000000; // Black
            const fillAlpha = 0.5; // 75% opacity
            const hoverFillColor = 0x000000; // Black
            const hoverFillAlpha = 0.8; // 50% opacity
        
            // Create the button text to get its dimensions
            let tempText = this.add.text(0, 0, buttonTextContent, {
                fontSize: `${buttonFontSize}px`,
                color: '#ffffff'
            });
            let textWidth = tempText.width;
            let textHeight = tempText.height;
            tempText.destroy(); // Remove the temporary text
        
            // Calculate button dimensions
            let buttonWidth = textWidth + buttonPaddingX * 2;
            let buttonHeight = textHeight + buttonPaddingY * 2;
        
            // Create a container to hold the graphics and text
            let buttonContainer = this.add.container(centerX, startY);
        
            // Create the background rectangle
            let buttonBackground = this.add.graphics();
            buttonBackground
                .lineStyle(borderWidth, borderColor, 1)
                .fillStyle(fillColor, fillAlpha)
                .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius)
                .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
        
            // Create the button text
            let buttonText = this.add.text(0, 0, buttonTextContent, {
                fontSize: `${buttonFontSize}px`,
                fontFamily: 'poppins',
                color: '#ffffff'
            }).setOrigin(0.5);
        
            // Add background and text to the container
            buttonContainer.add([buttonBackground, buttonText]);
        
            // Make the container interactive
            buttonContainer.setSize(buttonWidth, buttonHeight);
            buttonContainer.setInteractive({ useHandCursor: true });
        
            // Handle pointer events
            buttonContainer.on('pointerdown', () => {
                buttonContainer.setScale(0.95);
            });
        
            buttonContainer.on('pointerup', () => {
                buttonContainer.setScale(1);
                // Uncomment the line below to enable navigation
                // window.location.href = 'https://ark-prod-nuxt-container.bravedune-c7e139af.eastus.azurecontainerapps.io';
            });
        
            buttonContainer.on('pointerover', () => {
                buttonBackground.clear();
                buttonBackground
                    .lineStyle(borderWidth, borderColor, 1)
                    .fillStyle(hoverFillColor, hoverFillAlpha)
                    .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius)
                    .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
                this.input.manager.canvas.style.cursor = 'pointer';
            });
        
            buttonContainer.on('pointerout', () => {
                buttonContainer.setScale(1);
                this.input.manager.canvas.style.cursor = 'default';
                buttonBackground.clear();
                buttonBackground
                    .lineStyle(borderWidth, borderColor, 1)
                    .fillStyle(fillColor, fillAlpha)
                    .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius)
                    .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            });
        
            // Add animation tween to the button
            this.tweens.add({
                targets: buttonContainer,
                y: centerY,
                ease: 'Power1',
                duration: 1000,
                delay: 2000,
                onStart: () => {
                    this.tweens.add({
                        targets: buttonContainer,
                        angle: { from: -5, to: 5 },
                        duration: 1000,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });
        },
        
    }
};

const game = new Phaser.Game(config);

// Handle window resizing
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
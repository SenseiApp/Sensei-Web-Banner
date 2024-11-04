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
            // Display the welcome text

            // Calculate center coordinates
            let centerX = this.cameras.main.centerX;
            let centerY = this.cameras.main.centerY;
            let startY = this.cameras.main.height + 50;

            this.add.text(centerX, centerY / 2, 'Welcome to SkillRocket!!!', { fontSize: '48px', color: '#ffffff' })
                .setOrigin(0.5, 0.5); // Center the text horizontally and vertically

            // Create the button text
            let buttonText = this.add.text(centerX, startY, 'Click Here', {
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#0000ff',
                padding: { x: 20, y: 10 },
                align: 'center'
            }).setOrigin(0.5).setInteractive();


            buttonText.on('pointerdown', () => {
                buttonText.setScale(0.95);
            });
            buttonText.on('pointerup', () => {
                buttonText.setScale(1);
                window.location.href = 'https://ark-prod-nuxt-container.bravedune-c7e139af.eastus.azurecontainerapps.io';
            });

            buttonText.on('pointerover', () => {
                buttonText.setStyle({ backgroundColor: '#00ff00' });
                this.input.manager.canvas.style.cursor = 'pointer';
            });

            buttonText.on('pointerout', () => {
                buttonText.setScale(1);
                buttonText.setStyle({ backgroundColor: '#0000ff' });
                this.input.manager.canvas.style.cursor = 'default';
            });


            this.tweens.add({
                targets: buttonText,
                y: centerY,
                ease: 'Power1',
                duration: 1000,
                delay: 2000,
                onStart: () => {
                    this.tweens.add({
                        targets: buttonText,
                        angle: { from: -5, to: 5 },
                        duration: 1000,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });
        },
        update: function () {
            // No updates needed for this simple scene
        }
    }
};

const game = new Phaser.Game(config);

// Handle window resizing
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
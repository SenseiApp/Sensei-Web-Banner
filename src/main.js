const bucketBaseUrl = "https://cdn.cloudcompany.ca/websrc";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#1d1d1d',
    transparent: true,
    input: {
        // Adjust input settings
        window: {
            Events: ['MOUSE_DOWN', 'MOUSE_UP'],
        },
        mouse: {
            preventDefaultDown: true,   // Keep default for clicks
            preventDefaultUp: true,     // Keep default for clicks
            preventDefaultMove: false,  // Allow move events to pass through
            preventDefaultWheel: false, // Allow wheel events to pass through (scrolling)
            preventDefaultOver: false,
            preventDefaultOut: false
        },
        touch: {
            preventDefault: false,     // Allow default touch behavior
            touchAction: 'pan-y',      // Allow vertical scrolling
        },
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0, x: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: {
        preload: function () {
            this.load.image('ship1', `${bucketBaseUrl}/General/Assets/Ships/1.png`);
            this.load.image('ship2', `${bucketBaseUrl}/General/Assets/Ships/2.png`);
            this.load.image('ship3', `${bucketBaseUrl}/General/Assets/Ships/3.png`);
            this.load.image('ship4', `${bucketBaseUrl}/General/Assets/Ships/4.png`);
            this.load.image('ship5', `${bucketBaseUrl}/General/Assets/Ships/5.png`);
            this.load.image('ship6', `${bucketBaseUrl}/General/Assets/Ships/6.png`);
            this.load.image('logo', `${bucketBaseUrl}/General/Assets/skillrocket_logo.png`);
            this.load.image('button', `${bucketBaseUrl}/General/UIElements/left_button.png`);
        },
        create: function () {
            const hrefToWeb = true;
            this.shipIndex = 6;
            let centerX = this.cameras.main.centerX;
            let centerY = this.cameras.main.centerY;
            let startY = this.cameras.main.height + 50;

            let viewportWidth = this.cameras.main.width;
            let logoScale = viewportWidth / 1920;
            logoScale = Phaser.Math.Clamp(logoScale, 0.3, 1);

            this.add.image(centerX, centerY * .5, 'logo')
                .setScale(logoScale)
                .setOrigin(0.5, 0.5);

            const button = createButton(this, centerX, startY, 'Get Started', {});

            this.ship = createShip(this, centerX, centerY);

            const paddingPercentage = 0.2;

            const shipWidth = this.ship.width * this.ship.scaleX;
            const leftButtonX = centerX - (shipWidth / 2) - (paddingPercentage * this.cameras.main.width);
            const rightButtonX = centerX + (shipWidth / 2) + (paddingPercentage * this.cameras.main.width);

            const leftButton = createSelectionButton(this, leftButtonX, centerY, {
                direction: 'left',
                alpha: 0,
                scale: 1.25
            });

            leftButton.on('pointerdown', () => {
                this.shipIndex = (this.shipIndex - 2 + 6) % 6 + 1;
                updateShipTexture(this.ship, this.shipIndex);
                console.log('shipIndex', this.shipIndex);
            });

            const rightButton = createSelectionButton(this, rightButtonX, centerY, {
                direction: 'right',
                alpha: 0,
                scale: 1.25
            });

            rightButton.on('pointerdown', () => {
                this.shipIndex = (this.shipIndex) % 6 + 1;
                updateShipTexture(this.ship, this.shipIndex);
                console.log('shipIndex', this.shipIndex);
            });

            const startButton = createButton(this, centerX, this.ship.y * 1.25, 'Start', { alpha: 0 });

            startButton.on('pointerdown', () => {
                // window.location.href = 'https://ark-prod-nuxt-container.bravedune-c7e139af.eastus.azurecontainerapps.io/';
                window.location.href = 'http://localhost:3000/?ship=' + this.shipIndex;
            });

            button.on('pointerup', () => {
                if (hrefToWeb) {
                    window.location.href = 'https://ark-prod-nuxt-container.bravedune-c7e139af.eastus.azurecontainerapps.io/';
                } else {
                    button.setScale(1);
                    this.tweens.add({
                        targets: button,
                        alpha: 0,
                        ease: 'Power1',
                        duration: 1000,
                        onComplete: () => {
                            this.tweens.add({
                                targets: [this.ship, leftButton,
                                    rightButton, startButton],
                                alpha: 1,
                            });
                            createShipTrail(this, this.ship);
                            button.destroy();
                        }
                    });
                }
            });

            this.tweens.add({
                targets: button,
                y: centerY,
                ease: 'Power1',
                duration: 1000,
                delay: 2000,
                onStart: () => {
                    this.tweens.add({
                        targets: button,
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
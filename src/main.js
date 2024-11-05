const bucketBaseUrl = "https://cdn.cloudcompany.ca/websrc";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#1d1d1d',
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
            this.load.image('ship', `${bucketBaseUrl}/General/Assets/Ships/1.png`);
        },
        create: function () {
            let centerX = this.cameras.main.centerX;
            let centerY = this.cameras.main.centerY;
            let startY = this.cameras.main.height + 50;

            this.add.text(centerX, centerY / 2, 'Welcome to SkillRocket!!!', {
                fontSize: '48px',
                fontFamily: 'Poppins',
                color: '#ffffff'
            }).setOrigin(0.5, 0.5);

            const button = createButton(this, centerX, startY, 'Click Here', {
                url: 'https://ark-prod-nuxt-container.bravedune-c7e139af.eastus.azurecontainerapps.io/'
            });

            const ship = createShip(this, centerX, centerY);

            button.on('pointerup', () => {
                button.setScale(1);
                this.tweens.add({
                    targets: button,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 1000,
                    onComplete: () => {
                        this.tweens.add({
                            targets: ship,
                            alpha: 1,
                        });
                        createShipTrail(this, ship);
                        button.destroy();
                    }
                });
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
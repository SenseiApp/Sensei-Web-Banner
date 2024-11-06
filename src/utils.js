const updateShipTexture = (ship, shipID) => {
    ship.setTexture(`${bucketBaseUrl}/General/Assets/Ships/${shipID}.png`);
};

function createButton(scene, x, y, textContent, options = {}) {
    const defaultOptions = {
        fontSize: 32,
        paddingX: 20,
        paddingY: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 0x000000,
        fillColor: 0x000000,
        fillAlpha: 0.5,
        hoverFillColor: 0x000000,
        hoverFillAlpha: 0.8,
        fontFamily: 'Poppins',
        textColor: '#ffffff',
        url: null,
        alpha: 1
    };

    const config = { ...defaultOptions, ...options };
    let tempText = scene.add.text(0, 0, textContent, {
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
        color: config.textColor
    });
    let textWidth = tempText.width;
    let textHeight = tempText.height;
    tempText.destroy();

    let buttonWidth = textWidth + config.paddingX * 2;
    let buttonHeight = textHeight + config.paddingY * 2;
    let buttonContainer = scene.add.container(x, y);

    let buttonBackground = scene.add.graphics();
    buttonBackground
        .lineStyle(config.borderWidth, config.borderColor, 1)
        .fillStyle(config.fillColor, config.fillAlpha)
        .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius)
        .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius);

    let buttonText = scene.add.text(0, 0, textContent, {
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
        color: config.textColor
    }).setOrigin(0.5);

    buttonContainer.add([buttonBackground, buttonText]);
    buttonContainer.setSize(buttonWidth, buttonHeight);
    buttonContainer.setInteractive({ useHandCursor: true });

    buttonContainer.on('pointerdown', () => {
        buttonContainer.setScale(0.95);
    });

    buttonContainer.on('pointerover', () => {
        buttonBackground.clear();
        buttonBackground
            .lineStyle(config.borderWidth, config.borderColor, 1)
            .fillStyle(config.hoverFillColor, config.hoverFillAlpha)
            .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius)
            .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius);
        scene.input.manager.canvas.style.cursor = 'pointer';
    });

    buttonContainer.on('pointerout', () => {
        buttonContainer.setScale(1);
        scene.input.manager.canvas.style.cursor = 'default';
        buttonBackground.clear();
        buttonBackground
            .lineStyle(config.borderWidth, config.borderColor, 1)
            .fillStyle(config.fillColor, config.fillAlpha)
            .strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius)
            .fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, config.borderRadius);
    });

    buttonContainer.setAlpha(config.alpha);
    return buttonContainer;
}

function createSelectionButton(scene, x, y, options = {}) {
    const defaultOptions = {
        alpha: 1,
        direction: 'left',
        scale: 1
    };
    const config = { ...defaultOptions, ...options };

    const button = scene.add.image(x, y, 'button');
    button.setAlpha(config.alpha);
    button.rotation = config.direction === 'right' ? Math.PI : 0;
    button.setScale(config.scale);
    button.setInteractive({ useHandCursor: true });

    button.on('pointerdown', () => {
        scene.tweens.add({
            targets: button,
            scale: .975,
            duration: 50,
            ease: 'Linear',
            yoyo: true
        });
    });

    return button;
}

function createShip(scene, x, y) {
    const ship = scene.add.image(x, y, 'ship');
    ship.setAlpha(0);

    const referenceWidth = 1920;
    const referenceHeight = 1080;

    const scaleFactorX = scene.cameras.main.width / referenceWidth;
    const scaleFactorY = scene.cameras.main.height / referenceHeight;
    const scaleFactor = Math.min(scaleFactorX, scaleFactorY);

    ship.setScale(scaleFactor);

    tweenShip(scene, ship);
    return ship;
}


const tweenShip = (scene, ship) => {
    const tweenDuration = 5000 + Math.random() * 1000;
    const tweenVerticalDistance = 5;

    const tween = scene.tweens.add({
        targets: ship,
        y: ship.y + tweenVerticalDistance,
        rotation: 0.05,
        duration: tweenDuration,
        ease: 'Power1.easeInOut',
        yoyo: true,
        repeat: -1,
    });

    return tween;
};

function createShipTrail(scene, ship, trailFrequency = 100) {
    function createParticle() {
        if (!ship || !ship.texture || !ship.visible) return;

        const particle = scene.add.graphics();
        particle.fillStyle(0xffffff, 0.7);
        particle.fillCircle(0, 0, 4);

        const offsetPercentage = 0.075;
        const shipWidth = ship.width * ship.scaleX;
        const trailOffsetX = shipWidth * offsetPercentage;

        particle.x = ship.x - (shipWidth / 2) + trailOffsetX;
        const randomYOffset = Math.random() * 10 - 5;
        particle.y = ship.y + randomYOffset;
        particle.setDepth(1);

        scene.tweens.add({
            targets: particle,
            x: particle.x - 50,
            alpha: 0,
            duration: 500,
            ease: 'Power1.easeOut',
            onComplete: () => {
                particle.destroy();
            }
        });
    }

    const timerEvent = scene.time.addEvent({
        delay: trailFrequency,
        callback: createParticle,
        callbackScope: null,
        loop: true
    });

    return timerEvent;
}

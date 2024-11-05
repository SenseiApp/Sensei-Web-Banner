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
        url: null
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

    buttonContainer.on('pointerup', () => {
        buttonContainer.setScale(1);
        if (config.url) {
            window.location.href = config.url;
        }
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

    return buttonContainer;
}